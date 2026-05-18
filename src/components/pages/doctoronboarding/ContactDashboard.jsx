import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

export default function ContactDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [allInquiries, setAllInquiries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  const navigate = useNavigate();

  useEffect(() => { 
    refreshTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

  function refreshTable() {
    fetch(`${BASE_URL}/contact/list/`, { credentials: "include" })
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
          setInquiries(data);
          setAllInquiries(data);
          setIsAuthorized(true);
        } else {
          setInquiries([]);
          setAllInquiries([]);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setInquiries([]);
        setAllInquiries([]);
      });
  }

  function searchInquiry(value) {
    setSearch(value);
    if (value === "") { setInquiries(allInquiries); return; }
    const q = value.toLowerCase();
    setInquiries(
      allInquiries.filter((i) =>
        i.name?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.phone?.toLowerCase().includes(q)
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
    inputBg:        d ? "rgba(255,255,255,0.05)"   : "#f9f9f9",
    inputBorder:    d ? "rgba(255,255,255,0.1)"    : "rgba(0,0,0,0.12)",
    inputColor:     d ? "#e0e0e0"                  : "#111111",
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .cd-wrapper {
      min-height: 100vh;
      background: ${t.pageBg};
      font-family: 'DM Sans', sans-serif;
      color: ${t.textPrimary};
      padding: 36px 48px;
      transition: background 0.25s, color 0.25s;
    }

    .cd-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 28px; padding-bottom: 22px;
      border-bottom: 1px solid ${t.borderMain};
    }
    .cd-header-left  { display: flex; align-items: center; gap: 16px; }
    .cd-header-right { display: flex; align-items: center; gap: 10px; }
    .cd-title-bar { width: 4px; height: 26px; background: ${t.accent}; border-radius: 2px; flex-shrink: 0; }
    .cd-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
    .cd-title span { color: ${t.accent}; }

    .cd-back-btn {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${t.backBg}; border: 1px solid ${t.backBorder};
      color: ${t.backColor}; padding: 8px 15px; border-radius: 8px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.2s;
    }
    .cd-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }

    .cd-theme-btn {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${t.themeBtnBg}; border: 1px solid ${t.themeBtnBorder};
      color: ${t.themeBtnColor}; padding: 8px 15px; border-radius: 8px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.2s;
    }
    .cd-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

    .cd-controls {
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
    }
    .cd-search {
      flex: 1; min-width: 220px; max-width: 360px;
      background: ${t.inputBg}; border: 1px solid ${t.inputBorder};
      color: ${t.inputColor}; border-radius: 8px;
      padding: 8px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px;
      outline: none; transition: border-color 0.2s;
    }
    .cd-search::placeholder { color: ${t.textMuted}; }
    .cd-search:focus { border-color: ${t.accent}; }

    .cd-refresh-btn {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
      color: ${t.accent}; padding: 8px 15px; border-radius: 8px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.18s;
    }
    .cd-refresh-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

    .cd-table-section {
      background: ${t.cardBg}; border: 1px solid ${t.borderMain};
      border-radius: 14px; overflow: hidden;
      transition: background 0.25s, border-color 0.25s;
    }
    .cd-table-header {
      padding: 18px 24px; border-bottom: 1px solid ${t.borderMain};
      display: flex; align-items: center; justify-content: space-between;
    }
    .cd-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
    .cd-count-badge {
      background: ${t.accentBadgeBg}; color: ${t.accent};
      border: 1px solid rgba(220,38,38,0.2);
      border-radius: 20px; padding: 2px 10px;
      font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace;
    }

    table.cd-table { width: 100%; border-collapse: collapse; }
    .cd-table thead th {
      padding: 12px 20px; font-size: 10.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.9px;
      color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
      white-space: nowrap;
    }
    .cd-table tbody tr { border-top: 1px solid ${t.borderRow}; transition: background 0.15s; }
    .cd-table tbody tr:hover { background: ${t.rowHover}; }
    .cd-table tbody td { padding: 14px 20px; font-size: 13.5px; color: ${t.textSecondary}; vertical-align: middle; }

    .cd-name-cell {
      font-weight: 600; color: ${t.textPrimary} !important;
      display: flex; align-items: center; gap: 10px;
    }
    .cd-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.22);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: ${t.accent};
      flex-shrink: 0; text-transform: uppercase;
    }

    .cd-view-btn {
      display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
      background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
      border-radius: 6px; color: ${t.accent};
      font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
      cursor: pointer; transition: all 0.18s; white-space: nowrap;
    }
    .cd-view-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

    /* ── Modal ── */
    .cd-modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.55);
      display: flex; justify-content: center; align-items: center; z-index: 1000;
    }
    .cd-modal {
      width: 540px; max-width: 92%;
      background: ${t.cardBg}; border: 1px solid ${t.borderMain};
      border-radius: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.28);
      animation: cdFadeIn 0.2s ease; max-height: 88vh; overflow-y: auto;
    }
    @keyframes cdFadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
    .cd-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px; border-bottom: 1px solid ${t.borderMain};
      position: sticky; top: 0; background: ${t.cardBg}; z-index: 5;
    }
    .cd-modal-header-left { display: flex; align-items: center; gap: 12px; }
    .cd-modal-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.22);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 700; color: ${t.accent};
    }
    .cd-modal-title     { font-size: 17px; font-weight: 700; color: ${t.textPrimary}; }
    .cd-modal-subtitle { font-size: 12px; color: ${t.textSecondary}; margin-top: 2px; }
    
    .cd-modal-body { padding: 0 24px 8px; }
    .cd-modal-section {
      font-size: 10.5px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.8px; color: ${t.textTh};
      margin: 18px 0 10px; padding-bottom: 6px;
      border-bottom: 1px solid ${t.borderRow};
    }
    .cd-modal-row {
      display: flex; align-items: flex-start; gap: 8px;
      padding: 8px 0; border-bottom: 1px solid ${t.borderRow}; font-size: 13.5px;
    }
    .cd-modal-key  { width: 155px; flex-shrink: 0; color: ${t.textSecondary}; font-size: 13px; }
    .cd-modal-val  { color: ${t.textPrimary}; font-weight: 500; word-break: break-word; }
    .cd-modal-message-box {
      margin-top: 10px; padding: 15px; background: ${t.theadBg}; 
      border-radius: 8px; border: 1px solid ${t.borderRow}; 
      font-size: 13px; line-height: 1.6; color: ${t.textSecondary};
    }

    .cd-modal-footer {
      padding: 14px 24px; border-top: 1px solid ${t.borderMain};
      display: flex; justify-content: flex-end;
      position: sticky; bottom: 0; background: ${t.cardBg};
    }
    .cd-modal-close-btn {
      padding: 8px 20px; background: ${t.accent}; border: none;
      color: #fff; border-radius: 7px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
      transition: background 0.18s;
    }
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
            <h1 className="cd-title">Contact Us <span>Dashboard</span></h1>
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
          <input
            className="cd-search"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => searchInquiry(e.target.value)}
          />
        </div>

        {/* ── Table ── */}
        <div className="cd-table-section">
          <div className="cd-table-header">
            <span className="cd-table-heading">All Contact Submissions</span>
            <span className="cd-count-badge">{inquiries.length}</span>
          </div>

          <table className="cd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Role</th>
                <th>View Message</th>
                <th>Date</th> 
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "50px", color: t.textMuted }}>
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq, idx) => (
                  <tr key={inq.id}>
                    <td style={{ color: d ? "#555" : "#bbb", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td>
                      <div className="cd-name-cell">
                        <div className="cd-avatar">{getInitials(inq.name)}</div>
                        {inq.name}
                      </div>
                    </td>
                    <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>{inq.email}</td>
                    <td style={{ fontWeight: 500 }}>{inq.phone}</td>
                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {inq.street_address}, {inq.address} - {inq.pincode}
                    </td>
                    <td style={{ fontWeight: 500 }}>
                        {inq.role}
                    </td>

                    <td>
                      <button className="cd-view-btn" onClick={() => setSelected(inq)}>
                        👁 View Inquiry
                      </button>
                    </td>
                      <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                      {new Date(inq.created_at + " UTC").toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short"
                        })}
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Modal ── */}
        {selected && (
          <div className="cd-modal-overlay" onClick={() => setSelected(null)}>
            <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
              <div className="cd-modal-header">
                <div className="cd-modal-header-left">
                  <div className="cd-modal-avatar">{getInitials(selected.name)}</div>
                  <div>
                    <div className="cd-modal-title">{selected.name}</div>
                    <div className="cd-modal-subtitle">Contact Form Submission</div>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.textSecondary }} onClick={() => setSelected(null)}>✕</button>
              </div>

              <div className="cd-modal-body">
                <div className="cd-modal-section">User Details</div>
                <div className="cd-modal-row">
                  <span className="cd-modal-key">Email Address</span>
                  <span className="cd-modal-val">{selected.email}</span>
                </div>
                <div className="cd-modal-row">
                  <span className="cd-modal-key">Phone Number</span>
                  <span className="cd-modal-val">{selected.phone}</span>
                </div>
                  <div className="cd-modal-row">
                  <span className="cd-modal-key">Street Address</span>
                  <span className="cd-modal-val">{selected.street_address}</span>
                  </div>

                  <div className="cd-modal-row">
                  <span className="cd-modal-key">Full Address</span>
                  <span className="cd-modal-val">{selected.address}</span>
                  </div>

                  <div className="cd-modal-row">
                  <span className="cd-modal-key">PIN Code</span>
                  <span className="cd-modal-val">{selected.pincode}</span>
                  </div>

                  <div className="cd-modal-row">
                  <span className="cd-modal-key">Role</span>
                  <span className="cd-modal-val">{selected.role}</span>
                  </div>

                <div className="cd-modal-section">Message Content</div>
                <div className="cd-modal-message-box">
                  {selected.message}
                </div>
                <div className="cd-modal-row">
                <span className="cd-modal-key">Submitted At</span>
                <span className="cd-modal-val">
                  {new Date(selected.created_at + " UTC").toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </span>
                </div>
               </div>

              <div className="cd-modal-footer">
                <button className="cd-modal-close-btn" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}