import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

const MODALITY_LABELS = {
  XRAY:  "X-Ray",
  CT:    "CT Scan",
  MRI:   "MRI",
  ECG:   "ECG",
  MAMMO: "Mammography",
};

// --- DEFAULT RATE TEMPLATE ---
const DEFAULT_RATES = [
  { id: 1, modality: "MRI", caseType: "Head/Brain/Chest/Abdomen/Pelvis/PNS/Face", rate: "450" },
  { id: 2, modality: "MRI", caseType: "MRI Screening(per body parts)", rate: "250" },
  { id: 3, modality: "MRI", caseType: "MSK(Joint/extremity)", rate: "550" },
  { id: 4, modality: "MRI", caseType: "Whole Abdomen", rate: "600" },
  { id: 5, modality: "MRI", caseType: "Chest/Abdomen/Pelvis/FACE/MRCP", rate: "500" },
  { id: 6, modality: "MRI", caseType: "Special Cases(ex. Neurography, Defacography, Breast)", rate: "800" },
  { id: 7, modality: "MRI", caseType: "MRI Angiography(per body parts)", rate: "800" },
  { id: 8, modality: "MRI", caseType: "Cardiac Studies", rate: "1000" },
  { id: 9, modality: "CT", caseType: "Head/Brain", rate: "250" },
  { id: 10, modality: "CT", caseType: "HR CT Chest/neck/temporal bone", rate: "400" },
  { id: 11, modality: "CT", caseType: "Abdomen/Pelvis/ PNS/FACE/KUB", rate: "300" },
  { id: 12, modality: "CT", caseType: "Whole Abdomen", rate: "400" },
  { id: 13, modality: "CT", caseType: "MSK/Extremity/Joint", rate: "450" },
  { id: 14, modality: "CT", caseType: "CT Angiography, per body part)", rate: "500" },
  { id: 15, modality: "CT", caseType: "Cardiac Angiography", rate: "1000" },
  { id: 16, modality: "X-Ray", caseType: "Per Exposure – any body parts", rate: "40" },
  { id: 17, modality: "X-Ray", caseType: "Special procedure – barium/IVP/HSG", rate: "200" },
  { id: 18, modality: "X-Ray", caseType: "Mammography", rate: "300" },
];

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

export default function ClientDashboard() {
  const [clients,       setClients]       = useState([]);
  const [allClients,    setAllClients]    = useState([]);
  const [darkMode,      setDarkMode]      = useState(false);
  const [selected,      setSelected]      = useState(null);
  const [search,        setSearch]        = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  // --- RATE LIST STATES ---
  const [rateModalClient, setRateModalClient] = useState(null);
  const [rateList, setRateList] = useState([]); 
  const [isSavingRates, setIsSavingRates] = useState(false);
  const [isSendingRates, setIsSendingRates] = useState(false);

  // --- CALLBACK LIST STATES ---
  const [callbacks, setCallbacks] = useState([]);
  const [showCallbacksModal, setShowCallbacksModal] = useState(false);
  const [isLoadingCallbacks, setIsLoadingCallbacks] = useState(false);

  const navigate = useNavigate();

  useEffect(() => { 
    refreshTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshTable() {
    fetch(`${BASE_URL}/client/list/`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          setIsAuthorized(false);
          alert("Session expired. Please login again.");
          navigate("/login");
          return null;
        }
        if (!res.ok) throw new Error("Something went wrong");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (Array.isArray(data)) {
          setClients(data);
          setAllClients(data);
          setIsAuthorized(true);
        } else {
          setClients([]);
          setAllClients([]);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setClients([]);
        setAllClients([]);
      });
  }

  // --- FETCH CALLBACKS ---
  function fetchCallbacks() {
    setIsLoadingCallbacks(true);
    fetch(`${BASE_URL}/callback-request/list/`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch callbacks");
        return res.json();
      })
      .then((data) => {
        setCallbacks(data || []);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        alert("Failed to load callback requests.");
      })
      .finally(() => {
        setIsLoadingCallbacks(false);
      });
  }

  function triggerMessage(client, type) {
    fetch(`${BASE_URL}/send-message/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: client.id,
        type: type
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert(`${type.toUpperCase()} sent successfully`);
        } else {
          alert(data.detail || data.message || `${type.toUpperCase()} failed`);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to send ${type.toUpperCase()}`);
      });
  }

  // --- RATE LIST FUNCTIONS ---
  function openRateModal(client) {
    setRateModalClient(client);
    if (client.rate_list) {
      try {
        setRateList(JSON.parse(client.rate_list));
      } catch (e) {
        setRateList(JSON.parse(JSON.stringify(DEFAULT_RATES)));
      }
    } else {
      setRateList(JSON.parse(JSON.stringify(DEFAULT_RATES)));
    }
  }

  function handleRateChange(index, field, newValue) {
    const updatedRates = [...rateList];
    updatedRates[index][field] = newValue;
    setRateList(updatedRates);
  }

  function handleAddRateRow() {
    const newId = rateList.length > 0 ? Math.max(...rateList.map(r => r.id || 0)) + 1 : 1;
    const newRow = { id: newId, modality: "", caseType: "", rate: "" };
    setRateList([...rateList, newRow]);
  }

  function handleRemoveRateRow(index) {
    const updatedRates = rateList.filter((_, i) => i !== index);
    setRateList(updatedRates);
  }

  function saveRates() {
    setIsSavingRates(true);

    fetch(`${BASE_URL}/client/rates/save/`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: rateModalClient.id,
        rate_list: JSON.stringify(rateList)
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert("Rate list saved successfully!");
          refreshTable();
        } else {
          alert(data.error || "Failed to save rates.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Network error while saving rates.");
      })
      .finally(() => {
        setIsSavingRates(false);
      });
  }

  function sendAgreementEmail() {
    setIsSendingRates(true);

    fetch(`${BASE_URL}/client/rates/send-agreement/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: rateModalClient.id,
        rate_list: JSON.stringify(rateList)
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert("Agreement link sent to the client!");
          setRateModalClient(null);
          refreshTable();
        } else {
          alert(data.error || "Failed to send rate agreement.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Network error while sending rates.");
      })
      .finally(() => {
        setIsSendingRates(false);
      });
  }

  function searchClient(value) {
    setSearch(value);
    if (value === "") { setClients(allClients); return; }
    const q = value.toLowerCase();
    setClients(
      allClients.filter((c) =>
        c.client_name?.toLowerCase().includes(q) ||
        c.contact_person?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      )
    );
  }

  function goBack() {
    const role = localStorage.getItem("role");
    if (role === "coordinator" || role === "Coordinator1") navigate("/coordinator-dashboard");
    else if (role === "supercoordinator" || role === "SuperCoordinator2") navigate("/super-coordinator-dashboard");
    else navigate("/login");
  }

  if (!isAuthorized) return <h2>Unauthorized. Please login.</h2>;

  const d = darkMode;
  const t = {
    pageBg:         d ? "#0d0d0d"                  : "#f0f0f0",
    cardBg:         d ? "#161616"                  : "#ffffff",
    rowHover:       d ? "rgba(220,38,38,0.06)"     : "rgba(220,38,38,0.04)",
    theadBg:        d ? "rgba(255,255,255,0.02)"   : "rgba(0,0,0,0.03)",
    borderMain:     d ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.1)",
    borderRow:      d ? "rgba(255,255,255,0.04)"   : "rgba(0,0,0,0.06)",
    textPrimary:    d ? "#f0f0f0"                  : "#111111",
    textSecondary:  d ? "#999999"                  : "#555555",
    textMuted:      d ? "#444444"                  : "#bbbbbb",
    textTh:         d ? "#484848"                  : "#aaaaaa",
    accent:         "#dc2626",
    accentHover:    "#ef4444",
    accentGlow:     "rgba(220,38,38,0.28)",
    accentBadgeBg:  d ? "rgba(220,38,38,0.14)"     : "rgba(220,38,38,0.09)",
    viewBg:         d ? "rgba(220,38,38,0.08)"     : "rgba(220,38,38,0.06)",
    viewBorder:     d ? "rgba(220,38,38,0.22)"     : "rgba(220,38,38,0.18)",
    viewHover:      d ? "rgba(220,38,38,0.18)"     : "rgba(220,38,38,0.13)",
    backBg:         d ? "rgba(255,255,255,0.05)"   : "rgba(0,0,0,0.05)",
    backBorder:     d ? "rgba(255,255,255,0.1)"    : "rgba(0,0,0,0.11)",
    backColor:      d ? "#888888"                  : "#666666",
    backHoverBg:    d ? "rgba(255,255,255,0.09)"   : "rgba(0,0,0,0.08)",
    themeBtnBg:     d ? "rgba(255,255,255,0.06)"   : "rgba(0,0,0,0.06)",
    themeBtnBorder: d ? "rgba(255,255,255,0.1)"    : "rgba(0,0,0,0.1)",
    themeBtnColor:  d ? "#b0b0b0"                  : "#555555",
    emailColor:     d ? "#888888"                  : "#777777",
    contactColor:   d ? "#c0c0c0"                  : "#333333",
    inputBg:        d ? "rgba(255,255,255,0.05)"   : "#ffffff",
    inputBorder:    d ? "rgba(255,255,255,0.1)"    : "#cccccc",
    inputColor:     d ? "#e0e0e0"                  : "#111111",
    selectBg:       d ? "#1e1e1e"                  : "#ffffff",
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .cd-wrapper { min-height: 100vh; background: ${t.pageBg}; font-family: 'DM Sans', sans-serif; color: ${t.textPrimary}; padding: 36px 48px; transition: background 0.25s, color 0.25s; }
    .cd-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; padding-bottom: 22px; border-bottom: 1px solid ${t.borderMain}; }
    .cd-header-left  { display: flex; align-items: center; gap: 16px; }
    .cd-header-right { display: flex; align-items: center; gap: 10px; }
    .cd-title-bar { width: 4px; height: 26px; background: ${t.accent}; border-radius: 2px; flex-shrink: 0; }
    .cd-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
    .cd-title span { color: ${t.accent}; }

    .cd-back-btn, .cd-theme-btn, .cd-refresh-btn, .cd-view-btn { display: inline-flex; align-items: center; gap: 7px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
    .cd-back-btn, .cd-theme-btn { background: ${t.backBg}; border: 1px solid ${t.backBorder}; color: ${t.backColor}; padding: 8px 15px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .cd-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }
    .cd-theme-btn { background: ${t.themeBtnBg}; border-color: ${t.themeBtnBorder}; color: ${t.themeBtnColor}; }
    .cd-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

    .cd-controls { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    .cd-search { flex: 1; min-width: 220px; max-width: 360px; background: ${t.inputBg}; border: 1px solid ${t.inputBorder}; color: ${t.inputColor}; border-radius: 8px; padding: 8px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; }
    .cd-search::placeholder { color: ${t.textMuted}; }
    .cd-search:focus { border-color: ${t.accent}; }

    .cd-refresh-btn { background: ${t.viewBg}; border: 1px solid ${t.viewBorder}; color: ${t.accent}; padding: 8px 15px; border-radius: 8px; font-size: 13px; font-weight: 600; }
    .cd-refresh-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

    .cd-table-section { background: ${t.cardBg}; border: 1px solid ${t.borderMain}; border-radius: 14px; overflow: hidden; transition: background 0.25s, border-color 0.25s; }
    .cd-table-header { padding: 18px 24px; border-bottom: 1px solid ${t.borderMain}; display: flex; align-items: center; justify-content: space-between; }
    .cd-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
    .cd-count-badge { background: ${t.accentBadgeBg}; color: ${t.accent}; border: 1px solid rgba(220,38,38,0.2); border-radius: 20px; padding: 2px 10px; font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; }

    table.cd-table { width: 100%; border-collapse: collapse; }
    .cd-table thead th { padding: 12px 20px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.9px; color: ${t.textTh}; background: ${t.theadBg}; text-align: left; white-space: nowrap; }
    .cd-table tbody tr { border-top: 1px solid ${t.borderRow}; transition: background 0.15s; }
    .cd-table tbody tr:hover { background: ${t.rowHover}; }
    .cd-table tbody td { padding: 14px 20px; font-size: 13.5px; color: ${t.textSecondary}; vertical-align: middle; }

    .cd-name-cell { font-weight: 600; color: ${t.textPrimary} !important; display: flex; align-items: center; gap: 10px; }
    .cd-avatar { width: 34px; height: 34px; border-radius: 50%; background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.22); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: ${t.accent}; flex-shrink: 0; text-transform: uppercase; }
    .cd-email-cell { font-family: 'DM Mono', monospace; font-size: 12px; color: ${t.emailColor} !important; }
    .cd-mono-cell  { font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500; color: ${t.contactColor} !important; }

    .cd-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .cd-tag { padding: 3px 9px; font-size: 11px; border-radius: 20px; white-space: nowrap; background: ${t.accentBadgeBg}; color: ${t.accent}; border: 1px solid rgba(220,38,38,0.25); }

    .cd-view-btn { padding: 6px 14px; background: ${t.viewBg}; border: 1px solid ${t.viewBorder}; border-radius: 6px; color: ${t.accent}; font-size: 12.5px; font-weight: 600; white-space: nowrap; }
    .cd-view-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

    .cd-empty { text-align: center; padding: 56px 24px; color: ${t.textMuted}; font-size: 14px; }
    .cd-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }

    /* ── Modal Common ── */
    .cd-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .cd-modal { width: 540px; max-width: 92%; background: ${t.cardBg}; border: 1px solid ${t.borderMain}; border-radius: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.28); animation: cdFadeIn 0.2s ease; max-height: 88vh; overflow-y: auto; }
    
    /* Extra width for the Rate Table Modal */
    .cd-modal-wide { width: 850px; }

    @keyframes cdFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    
    .cd-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 16px; border-bottom: 1px solid ${t.borderMain}; position: sticky; top: 0; background: ${t.cardBg}; z-index: 5; }
    .cd-modal-header-left { display: flex; align-items: center; gap: 12px; }
    .cd-modal-title     { font-size: 17px; font-weight: 700; color: ${t.textPrimary}; }
    .cd-modal-subtitle { font-size: 12px; color: ${t.textSecondary}; margin-top: 2px; }
    .cd-modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: ${t.textSecondary}; padding: 4px 8px; border-radius: 6px; transition: color 0.15s; }
    .cd-modal-close:hover { color: ${t.accent}; }

    .cd-modal-body { padding: 20px 24px; }
    
    /* ── Inside View Details Modal ── */
    .cd-modal-section { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: ${t.textTh}; margin: 18px 0 10px; padding-bottom: 6px; border-bottom: 1px solid ${t.borderRow}; }
    .cd-modal-row { display: flex; align-items: flex-start; gap: 8px; padding: 8px 0; border-bottom: 1px solid ${t.borderRow}; font-size: 13.5px; }
    .cd-modal-row:last-of-type { border-bottom: none; }
    .cd-modal-key  { width: 155px; flex-shrink: 0; color: ${t.textSecondary}; font-size: 13px; }
    .cd-modal-val  { color: ${t.textPrimary}; font-weight: 500; word-break: break-word; }
    .cd-modal-val.mono  { font-family: 'DM Mono', monospace; font-size: 12.5px; letter-spacing: 0.06em; }
    .cd-modal-val.link  { color: ${t.accent}; text-decoration: none; }
    .cd-modal-val.link:hover { text-decoration: underline; }
    .cd-modal-val.muted { color: ${t.textMuted}; font-weight: 400; }

    /* ── Rate Table Styles ── */
    .cd-rate-table { width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 13px; }
    .cd-rate-table th, .cd-rate-table td { border: 1px solid ${t.borderRow}; padding: 8px; text-align: center; color: ${t.textPrimary}; }
    .cd-rate-table th { background: ${t.theadBg}; color: ${t.textTh}; font-weight: 700; }
    
    /* Editable Text Inputs for Modality and Case Type */
    .cd-rate-text-input { 
      width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid transparent; 
      background: transparent; color: ${t.textPrimary}; font-family: 'DM Sans', sans-serif; 
      font-size: 13px; outline: none; transition: all 0.2s; 
    }
    .cd-rate-text-input:focus, .cd-rate-text-input:hover { border-color: ${t.borderMain}; background: ${t.inputBg}; }
    
    /* Dedicated Rate Number Input */
    .cd-rate-input {
      width: 80px; padding: 6px; border-radius: 4px; border: 1px solid ${t.accent};
      background: #111111; color: #ffffff; text-align: center; font-weight: 700; font-family: 'DM Mono', monospace;
    }
    .cd-rate-input:focus { outline: 2px solid ${t.accentHover}; border-color: transparent; }
    
    /* Add / Delete Buttons */
    .cd-add-row-btn {
      margin-top: 15px; padding: 8px 16px; background: transparent; border: 1px dashed ${t.accent}; 
      color: ${t.accent}; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s; display: inline-block;
    }
    .cd-add-row-btn:hover { background: ${t.accentBadgeBg}; }
    
    .cd-delete-btn {
      background: none; border: none; color: #ef4444; font-size: 16px; cursor: pointer;
      padding: 4px; border-radius: 4px; transition: background 0.2s;
    }
    .cd-delete-btn:hover { background: rgba(239, 68, 68, 0.1); }

    .cd-rate-note { font-size: 13px; font-weight: 700; text-align: center; margin-top: 20px; color: ${t.textPrimary}; }

    .cd-modal-footer { padding: 14px 24px; border-top: 1px solid ${t.borderMain}; display: flex; justify-content: flex-end; gap: 10px; position: sticky; bottom: 0; background: ${t.cardBg}; z-index: 5; }
    
    /* SEPARATED BUTTON STYLES */
    .cd-modal-close-btn { padding: 8px 18px; background: #6b7280; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
    .cd-modal-close-btn:hover { background: #4b5563; }
    
    .cd-modal-save-btn { padding: 8px 18px; background: #3b82f6; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
    .cd-modal-save-btn:hover { background: #2563eb; }
    .cd-modal-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .cd-modal-email-btn { padding: 8px 18px; background: #10b981; border: none; color: #fff; border-radius: 4px; cursor: pointer; font-weight: 600; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
    .cd-modal-email-btn:hover { background: #059669; }
    .cd-modal-email-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="cd-wrapper">

        {/* ── Header ── */}
        <div className="cd-header">
          <div className="cd-header-left">
            <button className="cd-back-btn" onClick={goBack}>← Back</button>
            <div className="cd-title-bar" />
            <h1 className="cd-title">Client <span>Dashboard</span></h1>
          </div>
          <div className="cd-header-right">
            <button className="cd-theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="cd-controls">
          <button className="cd-refresh-btn" onClick={refreshTable}>↻ Refresh</button>

          {/* 👇 NEW BUTTON TO OPEN CALLBACK MODAL 👇 */}
          <button 
            className="cd-refresh-btn" 
            style={{ backgroundColor: "rgba(220,38,38,0.1)", borderColor: "rgba(220,38,38,0.3)" }}
            onClick={() => {
              setShowCallbacksModal(true);
              fetchCallbacks();
            }}
          >
            📞 View Callback Requests
          </button>

          <input
            className="cd-search"
            placeholder="Search by name, contact person or email…"
            value={search}
            onChange={(e) => searchClient(e.target.value)}
          />
        </div>

        {/* ── Table ── */}
        <div className="cd-table-section">
          <div className="cd-table-header">
            <span className="cd-table-heading">All Client Registrations</span>
            <span className="cd-count-badge">{clients.length}</span>
          </div>

          <table className="cd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Modalities</th>
                <th>Rate List</th>
                <th>View Form</th>
                <th>Send SMS</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="cd-empty">
                      <div className="cd-empty-icon">🏥</div>
                      No client registrations found.
                    </div>
                  </td>
                </tr>
              ) : (
                clients.map((client, idx) => {
                  const modalities = Array.isArray(client.modalities)
                    ? client.modalities.map((m) => MODALITY_LABELS[m] || m)
                    : [];
                  return (
                    <tr key={client.id}>
                      <td style={{ color: d ? "#555" : "#bbb", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="cd-name-cell">
                          <div className="cd-avatar">{getInitials(client.client_name)}</div>
                          {client.client_name}
                        </div>
                      </td>
                      <td className="cd-email-cell">{client.email}</td>
                      <td className="cd-mono-cell">{client.phone}</td>
                      <td>
                        <div className="cd-tags">
                          {modalities.map((m) => <span key={m} className="cd-tag">{m}</span>)}
                        </div>
                      </td>

                      {/* 💰 MANAGE RATES BUTTON */}
                      <td>
                        <button 
                          className="cd-view-btn" 
                          style={{ 
                            color: client.rates_agreed ? "#25D366" : "#f59e0b", 
                            borderColor: client.rates_agreed ? "rgba(37,211,102,0.4)" : "rgba(245,158,11,0.3)",
                            backgroundColor: client.rates_agreed ? "rgba(37,211,102,0.1)" : "transparent"
                          }} 
                          onClick={() => openRateModal(client)}
                        >
                          {client.rates_agreed ? "✅ Rates Agreed" : "💰 Manage Rates"}
                        </button>
                      </td>

                      <td>
                        <button className="cd-view-btn" onClick={() => setSelected(client)}>
                          👁 View Details
                        </button>
                      </td>
                      <td>
                        <button
                          className="cd-view-btn" style={{ color: "#25D366" }}
                          onClick={() => triggerMessage(client, "whatsapp")}
                        >
                          💬 SMS
                        </button>
                      </td>
                      <td>
                        <button
                          className="cd-view-btn" style={{ color: "#3b82f6" }}
                          onClick={() => triggerMessage(client, "email")}
                        >
                          📧 Email
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Rate Editor Modal ── */}
        {rateModalClient && (
          <div className="cd-modal-overlay" onClick={() => setRateModalClient(null)}>
            <div className="cd-modal cd-modal-wide" onClick={(e) => e.stopPropagation()}>
              <div className="cd-modal-header">
                <div className="cd-modal-header-left">
                  <div className="cd-modal-avatar">{getInitials(rateModalClient.client_name)}</div>
                  <div>
                    <div className="cd-modal-title">Update Rate List</div>
                    <div className="cd-modal-subtitle">For {rateModalClient.client_name}</div>
                  </div>
                </div>
                <button className="cd-modal-close" onClick={() => setRateModalClient(null)}>✕</button>
              </div>

              <div className="cd-modal-body">
                <table className="cd-rate-table">
                  <thead>
                    <tr>
                      <th style={{width: "60px"}}>S.No</th>
                      <th style={{width: "20%"}}>Modality</th>
                      <th style={{width: "45%"}}>Case Type</th>
                      <th style={{width: "15%"}}>Doctor Rate</th>
                      <th style={{width: "5%"}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rateList.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>
                          <input 
                            type="text" 
                            className="cd-rate-text-input"
                            value={row.modality}
                            onChange={(e) => handleRateChange(index, "modality", e.target.value)}
                            placeholder="e.g. MRI"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="cd-rate-text-input"
                            value={row.caseType}
                            onChange={(e) => handleRateChange(index, "caseType", e.target.value)}
                            placeholder="Description..."
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="cd-rate-input"
                            value={row.rate}
                            onChange={(e) => handleRateChange(index, "rate", e.target.value)}
                          />
                        </td>
                        <td>
                          <button 
                            className="cd-delete-btn" 
                            onClick={() => handleRemoveRateRow(index)}
                            title="Remove Row"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div style={{ textAlign: "left" }}>
                  <button className="cd-add-row-btn" onClick={handleAddRateRow}>
                    + Add New Rate
                  </button>
                </div>

                <p className="cd-rate-note"></p>
              </div>

              <div className="cd-modal-footer">
                <button className="cd-modal-close-btn" onClick={() => setRateModalClient(null)}>Close</button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="cd-modal-save-btn" 
                    onClick={saveRates}
                    disabled={isSavingRates || isSendingRates}
                  >
                    {isSavingRates ? "Saving..." : "Save Rates"}
                  </button>
                  <button 
                    className="cd-modal-email-btn" 
                    onClick={sendAgreementEmail}
                    disabled={isSendingRates || isSavingRates}
                  >
                    {isSendingRates ? "Sending..." : "Send Email"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── View Details Modal ── */}
        {selected && (() => {
          const modalities = Array.isArray(selected.modalities)
            ? selected.modalities.map((m) => MODALITY_LABELS[m] || m)
            : [];
          const panCardUrl = selected.pan_card
            ? (selected.pan_card.startsWith("http") ? selected.pan_card : `${BASE_URL}${selected.pan_card}`)
            : null;

          return (
            <div className="cd-modal-overlay" onClick={() => setSelected(null)}>
              <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cd-modal-header">
                  <div className="cd-modal-header-left">
                    <div className="cd-modal-avatar">{getInitials(selected.client_name)}</div>
                    <div>
                      <div className="cd-modal-title">{selected.client_name}</div>
                      <div className="cd-modal-subtitle">Client Registration Details</div>
                    </div>
                  </div>
                  <button className="cd-modal-close" onClick={() => setSelected(null)}>✕</button>
                </div>

                <div className="cd-modal-body">
                  <div className="cd-modal-section">01 · Organization Details</div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Hospital / Center</span>
                    <span className="cd-modal-val">{selected.client_name}</span>
                  </div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Full Address</span>
                    <span className="cd-modal-val">{selected.address || <span className="muted">—</span>}</span>
                  </div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">PIN Code</span>
                    <span className="cd-modal-val mono">{selected.pincode}</span>
                  </div>

                  <div className="cd-modal-section">02 · Contact Information</div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Contact Person</span>
                    <span className="cd-modal-val">{selected.contact_person}</span>
                  </div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Phone</span>
                    <span className="cd-modal-val mono">+91 {selected.phone}</span>
                  </div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Email</span>
                    <span className="cd-modal-val mono">{selected.email}</span>
                  </div>

                  <div className="cd-modal-section">03 · Modalities Offered</div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">Selected</span>
                    <div className="cd-tags" style={{ paddingTop: "2px" }}>
                      {modalities.length > 0
                        ? modalities.map((m) => <span key={m} className="cd-tag">{m}</span>)
                        : <span className="cd-modal-val muted">None selected</span>
                      }
                    </div>
                  </div>

                  <div className="cd-modal-section">04 · KYC / Tax Details</div>
                  <div className="cd-modal-row">
                    <span className="cd-modal-key">PAN Number</span>
                    <span className="cd-modal-val mono">{selected.pan}</span>
                  </div>
                  <div className="cd-modal-row" style={{ marginBottom: "8px" }}>
                    <span className="cd-modal-key">PAN Card</span>
                    {panCardUrl
                      ? <a className="cd-modal-val link" href={panCardUrl} target="_blank" rel="noreferrer">📄 View / Download</a>
                      : <span className="cd-modal-val muted">Not uploaded</span>
                    }
                  </div>
                </div>

                <div className="cd-modal-footer">
                  <button className="cd-modal-close-btn" style={{background: "#dc2626", color: "#fff", border: "none"}} onClick={() => setSelected(null)}>Close</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 👇 NEW: CALLBACK REQUESTS MODAL 👇 */}
        {showCallbacksModal && (
          <div className="cd-modal-overlay" onClick={() => setShowCallbacksModal(false)}>
            <div className="cd-modal cd-modal-wide" onClick={(e) => e.stopPropagation()}>
              <div className="cd-modal-header">
                <div className="cd-modal-header-left">
                  <div className="cd-modal-avatar" style={{backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)"}}>📞</div>
                  <div>
                    <div className="cd-modal-title">Callback Requests</div>
                    <div className="cd-modal-subtitle">Clients who requested to be contacted</div>
                  </div>
                </div>
                <button className="cd-modal-close" onClick={() => setShowCallbacksModal(false)}>✕</button>
              </div>

              <div className="cd-modal-body">
                {isLoadingCallbacks ? (
                  <div className="cd-empty">Loading requests...</div>
                ) : (
                  <table className="cd-rate-table">
                    <thead>
                      <tr>
                        <th style={{width: "20%"}}>Date</th>
                        <th style={{width: "25%"}}>Hospital Name</th>
                        <th style={{width: "20%"}}>Contact Person</th>
                        <th style={{width: "15%"}}>Phone</th>
                        <th style={{width: "20%"}}>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callbacks.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="cd-empty">No callback requests found.</td>
                        </tr>
                      ) : (
                        callbacks.map((cb) => (
                          <tr key={cb.id}>
                            <td style={{ fontSize: "12px", color: t.textSecondary }}>{cb.date}</td>
                            <td style={{ fontWeight: "600", color: t.textPrimary }}>{cb.hospital_name}</td>
                            <td>{cb.contact_person}</td>
                            <td className="cd-mono-cell">{cb.phone}</td>
                            <td style={{ fontSize: "12px", color: t.textSecondary, textAlign: "left" }}>
                              {cb.message || <span style={{opacity: 0.5}}>No message</span>}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="cd-modal-footer">
                <button className="cd-modal-close-btn" onClick={() => setShowCallbacksModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}