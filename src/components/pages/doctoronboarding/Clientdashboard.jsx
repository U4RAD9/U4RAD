// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../apiconnector";

// const STATUS_OPTIONS = [
//   { value: "pending",  label: "Pending"  },
//   { value: "approved", label: "Approved" },
//   { value: "rejected", label: "Rejected" },
//   { value: "on_hold",  label: "On Hold"  },
// ];

// const MODALITY_LABELS = {
//   XRAY:  "X-Ray",
//   CT:    "CT Scan",
//   MRI:   "MRI",
//   ECG:   "ECG",
//   MAMMO: "Mammography",
// };

// function getInitials(name) {
//   if (!name) return "?";
//   const parts = name.trim().split(" ");
//   return parts.length >= 2
//     ? (parts[0][0] + parts[1][0]).toUpperCase()
//     : parts[0][0].toUpperCase();
// }

// export default function ClientDashboard() {
//   const [clients,      setClients]      = useState([]);
//   const [allClients,   setAllClients]   = useState([]);
//   const [darkMode,     setDarkMode]     = useState(false);
//   const [selected,     setSelected]     = useState(null);
//   const [search,       setSearch]       = useState("");
//   const [messages,     setMessages]     = useState({});
//   const [isAuthorized, setIsAuthorized] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => { refreshTable(); }, []);

//   function refreshTable() {
//     fetch(`${BASE_URL}/client/list/`, { credentials: "include" })
//       .then(async (res) => {
//         if (res.status === 401 || res.status === 403) {
//           setIsAuthorized(false);
//           alert("Session expired. Please login again.");
//           navigate("/login");
//           return null;
//         }
//         if (!res.ok) throw new Error("Something went wrong");
//         return res.json();
//       })
//       .then((data) => {
//         if (!data) return;
//         if (Array.isArray(data)) {
//           setClients(data);
//           setAllClients(data);
//           setIsAuthorized(true);
//         } else {
//           setClients([]);
//           setAllClients([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch failed:", err);
//         setClients([]);
//         setAllClients([]);
//       });
//   }

//   function searchClient(value) {
//     setSearch(value);
//     if (value === "") { setClients(allClients); return; }
//     const q = value.toLowerCase();
//     setClients(
//       allClients.filter((c) =>
//         c.clientName?.toLowerCase().includes(q) ||
//         c.contactPerson?.toLowerCase().includes(q) ||
//         c.email?.toLowerCase().includes(q)
//       )
//     );
//   }

//   function handleMessageChange(clientId, value) {
//     setMessages((prev) => ({ ...prev, [clientId]: value }));
//   }

//   function updateStatus(client, newStatus) {
//     const message = messages[client.id] || "";
//     fetch(`${BASE_URL}/client/update-status/${client.id}/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ status: newStatus, message }),
//     })
//       .then((res) => res.json())
//       .then(() => refreshTable())
//       .catch((err) => console.error("Status update failed:", err));
//   }

//   function goBack() {
//     const role = localStorage.getItem("role");
//     if (role === "coordinator" || role === "Coordinator1") navigate("/coordinator-dashboard");
//     else if (role === "supercoordinator" || role === "SuperCoordinator2") navigate("/super-coordinator-dashboard");
//     else navigate("/login");
//   }

//   if (!isAuthorized) return <h2>Unauthorized. Please login.</h2>;

//   const d = darkMode;
//   const t = {
//     pageBg:         d ? "#0d0d0d"                  : "#f0f0f0",
//     cardBg:         d ? "#161616"                  : "#ffffff",
//     rowHover:       d ? "rgba(220,38,38,0.06)"     : "rgba(220,38,38,0.04)",
//     theadBg:        d ? "rgba(255,255,255,0.02)"   : "rgba(0,0,0,0.03)",
//     borderMain:     d ? "rgba(255,255,255,0.07)"   : "rgba(0,0,0,0.1)",
//     borderRow:      d ? "rgba(255,255,255,0.04)"   : "rgba(0,0,0,0.06)",
//     textPrimary:    d ? "#f0f0f0"                  : "#111111",
//     textSecondary:  d ? "#999999"                  : "#555555",
//     textMuted:      d ? "#444444"                  : "#bbbbbb",
//     textTh:         d ? "#484848"                  : "#aaaaaa",
//     accent:         "#dc2626",
//     accentHover:    "#ef4444",
//     accentGlow:     "rgba(220,38,38,0.28)",
//     accentBadgeBg:  d ? "rgba(220,38,38,0.14)"    : "rgba(220,38,38,0.09)",
//     viewBg:         d ? "rgba(220,38,38,0.08)"    : "rgba(220,38,38,0.06)",
//     viewBorder:     d ? "rgba(220,38,38,0.22)"    : "rgba(220,38,38,0.18)",
//     viewHover:      d ? "rgba(220,38,38,0.18)"    : "rgba(220,38,38,0.13)",
//     backBg:         d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.05)",
//     backBorder:     d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.11)",
//     backColor:      d ? "#888888"                 : "#666666",
//     backHoverBg:    d ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.08)",
//     themeBtnBg:     d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.06)",
//     themeBtnBorder: d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
//     themeBtnColor:  d ? "#b0b0b0"                 : "#555555",
//     emailColor:     d ? "#888888"                 : "#777777",
//     contactColor:   d ? "#c0c0c0"                 : "#333333",
//     inputBg:        d ? "rgba(255,255,255,0.05)"  : "#f9f9f9",
//     inputBorder:    d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)",
//     inputColor:     d ? "#e0e0e0"                 : "#111111",
//     selectBg:       d ? "#1e1e1e"                 : "#ffffff",
//   };

//   const statusColors = {
//     approved: { bg: d ? "rgba(34,197,94,0.14)"   : "rgba(34,197,94,0.1)",  color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
//     rejected: { bg: d ? "rgba(220,38,38,0.14)"   : "rgba(220,38,38,0.09)", color: "#dc2626", border: "rgba(220,38,38,0.25)"  },
//     pending:  { bg: d ? "rgba(234,179,8,0.14)"   : "rgba(234,179,8,0.09)", color: "#ca8a04", border: "rgba(234,179,8,0.3)"   },
//     on_hold:  { bg: d ? "rgba(139,92,246,0.14)"  : "rgba(139,92,246,0.09)",color: "#7c3aed", border: "rgba(139,92,246,0.3)"  },
//   };

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     .cd-wrapper {
//       min-height: 100vh;
//       background: ${t.pageBg};
//       font-family: 'DM Sans', sans-serif;
//       color: ${t.textPrimary};
//       padding: 36px 48px;
//       transition: background 0.25s, color 0.25s;
//     }

//     .cd-header {
//       display: flex; align-items: center; justify-content: space-between;
//       margin-bottom: 28px; padding-bottom: 22px;
//       border-bottom: 1px solid ${t.borderMain};
//     }
//     .cd-header-left  { display: flex; align-items: center; gap: 16px; }
//     .cd-header-right { display: flex; align-items: center; gap: 10px; }
//     .cd-title-bar { width: 4px; height: 26px; background: ${t.accent}; border-radius: 2px; flex-shrink: 0; }
//     .cd-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
//     .cd-title span { color: ${t.accent}; }

//     .cd-back-btn {
//       display: inline-flex; align-items: center; gap: 7px;
//       background: ${t.backBg}; border: 1px solid ${t.backBorder};
//       color: ${t.backColor}; padding: 8px 15px; border-radius: 8px;
//       font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
//       cursor: pointer; transition: all 0.2s;
//     }
//     .cd-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }

//     .cd-theme-btn {
//       display: inline-flex; align-items: center; gap: 7px;
//       background: ${t.themeBtnBg}; border: 1px solid ${t.themeBtnBorder};
//       color: ${t.themeBtnColor}; padding: 8px 15px; border-radius: 8px;
//       font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
//       cursor: pointer; transition: all 0.2s;
//     }
//     .cd-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

//     .cd-stats {
//       display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
//     }
//     .cd-stat-card {
//       background: ${t.cardBg}; border: 1px solid ${t.borderMain};
//       border-radius: 10px; padding: 14px 20px; min-width: 120px;
//       transition: background 0.25s;
//     }
//     .cd-stat-label { font-size: 11px; color: ${t.textMuted}; text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 4px; }
//     .cd-stat-value { font-size: 22px; font-weight: 700; color: ${t.textPrimary}; }
//     .cd-stat-value.red { color: ${t.accent}; }

//     .cd-controls {
//       display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
//     }
//     .cd-search {
//       flex: 1; min-width: 220px; max-width: 360px;
//       background: ${t.inputBg}; border: 1px solid ${t.inputBorder};
//       color: ${t.inputColor}; border-radius: 8px;
//       padding: 8px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px;
//       outline: none; transition: border-color 0.2s;
//     }
//     .cd-search::placeholder { color: ${t.textMuted}; }
//     .cd-search:focus { border-color: ${t.accent}; }

//     .cd-refresh-btn {
//       display: inline-flex; align-items: center; gap: 7px;
//       background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
//       color: ${t.accent}; padding: 8px 15px; border-radius: 8px;
//       font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
//       cursor: pointer; transition: all 0.18s;
//     }
//     .cd-refresh-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

//     .cd-table-section {
//       background: ${t.cardBg}; border: 1px solid ${t.borderMain};
//       border-radius: 14px; overflow: hidden;
//       transition: background 0.25s, border-color 0.25s;
//     }
//     .cd-table-header {
//       padding: 18px 24px; border-bottom: 1px solid ${t.borderMain};
//       display: flex; align-items: center; justify-content: space-between;
//     }
//     .cd-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
//     .cd-count-badge {
//       background: ${t.accentBadgeBg}; color: ${t.accent};
//       border: 1px solid rgba(220,38,38,0.2);
//       border-radius: 20px; padding: 2px 10px;
//       font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace;
//     }

//     table.cd-table { width: 100%; border-collapse: collapse; }
//     .cd-table thead th {
//       padding: 12px 20px; font-size: 10.5px; font-weight: 700;
//       text-transform: uppercase; letter-spacing: 0.9px;
//       color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
//       white-space: nowrap;
//     }
//     .cd-table tbody tr { border-top: 1px solid ${t.borderRow}; transition: background 0.15s; }
//     .cd-table tbody tr:hover { background: ${t.rowHover}; }
//     .cd-table tbody td { padding: 14px 20px; font-size: 13.5px; color: ${t.textSecondary}; vertical-align: middle; }

//     .cd-name-cell {
//       font-weight: 600; color: ${t.textPrimary} !important;
//       display: flex; align-items: center; gap: 10px;
//     }
//     .cd-avatar {
//       width: 34px; height: 34px; border-radius: 50%;
//       background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.22);
//       display: flex; align-items: center; justify-content: center;
//       font-size: 13px; font-weight: 700; color: ${t.accent};
//       flex-shrink: 0; text-transform: uppercase;
//     }
//     .cd-email-cell { font-family: 'DM Mono', monospace; font-size: 12px; color: ${t.emailColor} !important; }
//     .cd-mono-cell  { font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500; color: ${t.contactColor} !important; }

//     .cd-tags { display: flex; flex-wrap: wrap; gap: 5px; }
//     .cd-tag {
//       padding: 3px 9px; font-size: 11px; border-radius: 20px; white-space: nowrap;
//       background: ${t.accentBadgeBg}; color: ${t.accent};
//       border: 1px solid rgba(220,38,38,0.25);
//     }

//     .cd-select {
//       background: ${t.selectBg}; border: 1px solid ${t.inputBorder};
//       color: ${t.inputColor}; border-radius: 6px;
//       padding: 6px 10px; font-family: 'DM Sans', sans-serif; font-size: 12.5px;
//       cursor: pointer; outline: none; width: 100%; min-width: 130px;
//     }
//     .cd-select:focus { border-color: ${t.accent}; }

//     .cd-remark-input {
//       background: ${t.inputBg}; border: 1px solid ${t.inputBorder};
//       color: ${t.inputColor}; border-radius: 6px;
//       padding: 6px 10px; font-family: 'DM Sans', sans-serif; font-size: 12px;
//       outline: none; width: 100%; min-width: 140px; transition: border-color 0.2s;
//     }
//     .cd-remark-input::placeholder { color: ${t.textMuted}; }
//     .cd-remark-input:focus { border-color: ${t.accent}; }

//     .cd-view-btn {
//       display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
//       background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
//       border-radius: 6px; color: ${t.accent};
//       font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
//       cursor: pointer; transition: all 0.18s; white-space: nowrap;
//     }
//     .cd-view-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

//     .cd-empty { text-align: center; padding: 56px 24px; color: ${t.textMuted}; font-size: 14px; }
//     .cd-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }

//     /* ── Modal ── */
//     .cd-modal-overlay {
//       position: fixed; inset: 0; background: rgba(0,0,0,0.55);
//       display: flex; justify-content: center; align-items: center; z-index: 1000;
//     }
//     .cd-modal {
//       width: 540px; max-width: 92%;
//       background: ${t.cardBg}; border: 1px solid ${t.borderMain};
//       border-radius: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.28);
//       animation: cdFadeIn 0.2s ease; max-height: 88vh; overflow-y: auto;
//     }
//     @keyframes cdFadeIn {
//       from { opacity: 0; transform: scale(0.95); }
//       to   { opacity: 1; transform: scale(1); }
//     }
//     .cd-modal-header {
//       display: flex; align-items: center; justify-content: space-between;
//       padding: 20px 24px 16px; border-bottom: 1px solid ${t.borderMain};
//       position: sticky; top: 0; background: ${t.cardBg}; z-index: 5;
//     }
//     .cd-modal-header-left { display: flex; align-items: center; gap: 12px; }
//     .cd-modal-avatar {
//       width: 42px; height: 42px; border-radius: 50%;
//       background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.22);
//       display: flex; align-items: center; justify-content: center;
//       font-size: 16px; font-weight: 700; color: ${t.accent};
//     }
//     .cd-modal-title    { font-size: 17px; font-weight: 700; color: ${t.textPrimary}; }
//     .cd-modal-subtitle { font-size: 12px; color: ${t.textSecondary}; margin-top: 2px; }
//     .cd-modal-close {
//       background: none; border: none; font-size: 18px;
//       cursor: pointer; color: ${t.textSecondary}; padding: 4px 8px; border-radius: 6px;
//       transition: color 0.15s;
//     }
//     .cd-modal-close:hover { color: ${t.accent}; }

//     .cd-modal-body { padding: 0 24px 8px; }
//     .cd-modal-section {
//       font-size: 10.5px; font-weight: 700; text-transform: uppercase;
//       letter-spacing: 0.8px; color: ${t.textTh};
//       margin: 18px 0 10px; padding-bottom: 6px;
//       border-bottom: 1px solid ${t.borderRow};
//     }
//     .cd-modal-row {
//       display: flex; align-items: flex-start; gap: 8px;
//       padding: 8px 0; border-bottom: 1px solid ${t.borderRow}; font-size: 13.5px;
//     }
//     .cd-modal-row:last-of-type { border-bottom: none; }
//     .cd-modal-key  { width: 155px; flex-shrink: 0; color: ${t.textSecondary}; font-size: 13px; }
//     .cd-modal-val  { color: ${t.textPrimary}; font-weight: 500; word-break: break-word; }
//     .cd-modal-val.mono  { font-family: 'DM Mono', monospace; font-size: 12.5px; letter-spacing: 0.06em; }
//     .cd-modal-val.link  { color: ${t.accent}; text-decoration: none; }
//     .cd-modal-val.link:hover { text-decoration: underline; }
//     .cd-modal-val.muted { color: ${t.textMuted}; font-weight: 400; }

//     .cd-status-badge {
//       display: inline-block; padding: 3px 11px; border-radius: 20px;
//       font-size: 11.5px; font-weight: 700; text-transform: capitalize;
//     }
//     .cd-modal-footer {
//       padding: 14px 24px; border-top: 1px solid ${t.borderMain};
//       display: flex; justify-content: flex-end;
//       position: sticky; bottom: 0; background: ${t.cardBg};
//     }
//     .cd-modal-close-btn {
//       padding: 8px 20px; background: ${t.accent}; border: none;
//       color: #fff; border-radius: 7px; cursor: pointer;
//       font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
//       transition: background 0.18s;
//     }
//     .cd-modal-close-btn:hover { background: ${t.accentHover}; }
//   `;

//   const total    = clients.length;
//   const approved = clients.filter((c) => c.status === "approved").length;
//   const pending  = clients.filter((c) => !c.status || c.status === "pending").length;
//   const rejected = clients.filter((c) => c.status === "rejected").length;

//   return (
//     <>
//       <style>{css}</style>
//       <div className="cd-wrapper">

//         {/* ── Header ── */}
//         <div className="cd-header">
//           <div className="cd-header-left">
//             <button className="cd-back-btn" onClick={goBack}>← Back</button>
//             <div className="cd-title-bar" />
//             <h1 className="cd-title">Client <span>Dashboard</span></h1>
//           </div>
//           <div className="cd-header-right">
//             <button className="cd-theme-btn" onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? "☀ Light" : "🌙 Dark"}
//             </button>
//           </div>
//         </div>

//         {/* ── Stats ── */}
//         <div className="cd-stats">
//           <div className="cd-stat-card">
//             <div className="cd-stat-label">Total</div>
//             <div className="cd-stat-value red">{total}</div>
//           </div>
//           <div className="cd-stat-card">
//             <div className="cd-stat-label">Approved</div>
//             <div className="cd-stat-value">{approved}</div>
//           </div>
//           <div className="cd-stat-card">
//             <div className="cd-stat-label">Pending</div>
//             <div className="cd-stat-value">{pending}</div>
//           </div>
//           <div className="cd-stat-card">
//             <div className="cd-stat-label">Rejected</div>
//             <div className="cd-stat-value">{rejected}</div>
//           </div>
//         </div>

//         {/* ── Controls ── */}
//         <div className="cd-controls">
//           <button className="cd-refresh-btn" onClick={refreshTable}>↻ Refresh</button>
//           <input
//             className="cd-search"
//             placeholder="Search by name, contact person or email…"
//             value={search}
//             onChange={(e) => searchClient(e.target.value)}
//           />
//         </div>

//         {/* ── Table ── */}
//         <div className="cd-table-section">
//           <div className="cd-table-header">
//             <span className="cd-table-heading">All Client Registrations</span>
//             <span className="cd-count-badge">{clients.length}</span>
//           </div>

//           <table className="cd-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Client Name</th>
//                 <th>Contact Person</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Modalities</th>
//                 <th>PAN</th>
//                 <th>Status</th>
//                 <th>Remark</th>
//                 <th>View Form</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.length === 0 ? (
//                 <tr>
//                   <td colSpan={10}>
//                     <div className="cd-empty">
//                       <div className="cd-empty-icon">🏥</div>
//                       No client registrations found.
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 clients.map((client, idx) => {
//                   const modalities = Array.isArray(client.modalities)
//                     ? client.modalities.map((m) => MODALITY_LABELS[m] || m)
//                     : [];
//                   return (
//                     <tr key={client.id}>
//                       <td style={{ color: d ? "#555" : "#bbb", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
//                         {String(idx + 1).padStart(2, "0")}
//                       </td>
//                       <td>
//                         <div className="cd-name-cell">
//                           <div className="cd-avatar">{getInitials(client.clientName)}</div>
//                           {client.clientName}
//                         </div>
//                       </td>
//                       <td>{client.contactPerson}</td>
//                       <td className="cd-email-cell">{client.email}</td>
//                       <td className="cd-mono-cell">{client.phone}</td>
//                       <td>
//                         <div className="cd-tags">
//                           {modalities.map((m) => <span key={m} className="cd-tag">{m}</span>)}
//                         </div>
//                       </td>
//                       <td className="cd-mono-cell">{client.pan}</td>
//                       <td>
//                         <select
//                           className="cd-select"
//                           value={client.status || "pending"}
//                           onChange={(e) => updateStatus(client, e.target.value)}
//                         >
//                           {STATUS_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>{opt.label}</option>
//                           ))}
//                         </select>
//                       </td>
//                       <td>
//                         <input
//                           className="cd-remark-input"
//                           type="text"
//                           placeholder="Add remark…"
//                           value={messages[client.id] ?? client.statusMessage ?? ""}
//                           onChange={(e) => handleMessageChange(client.id, e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <button className="cd-view-btn" onClick={() => setSelected(client)}>
//                           👁 View Form
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ── Modal ── */}
//         {selected && (() => {
//           const modalities = Array.isArray(selected.modalities)
//             ? selected.modalities.map((m) => MODALITY_LABELS[m] || m)
//             : [];
//           const sc = statusColors[selected.status] || statusColors.pending;
//           const panCardUrl = selected.panCard
//             ? (selected.panCard.startsWith("http") ? selected.panCard : `${BASE_URL}${selected.panCard}`)
//             : null;

//           return (
//             <div className="cd-modal-overlay" onClick={() => setSelected(null)}>
//               <div className="cd-modal" onClick={(e) => e.stopPropagation()}>

//                 <div className="cd-modal-header">
//                   <div className="cd-modal-header-left">
//                     <div className="cd-modal-avatar">{getInitials(selected.clientName)}</div>
//                     <div>
//                       <div className="cd-modal-title">{selected.clientName}</div>
//                       <div className="cd-modal-subtitle">Client Registration Details</div>
//                     </div>
//                   </div>
//                   <button className="cd-modal-close" onClick={() => setSelected(null)}>✕</button>
//                 </div>

//                 <div className="cd-modal-body">

//                   <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
//                     <span
//                       className="cd-status-badge"
//                       style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}
//                     >
//                       {selected.status
//                         ? selected.status.charAt(0).toUpperCase() + selected.status.slice(1).replace("_", " ")
//                         : "Pending"}
//                     </span>
//                     {selected.statusMessage && (
//                       <span style={{ fontSize: "12px", color: d ? "#888" : "#777", fontStyle: "italic" }}>
//                         Remark: {selected.statusMessage}
//                       </span>
//                     )}
//                   </div>

//                   <div className="cd-modal-section">01 · Organization Details</div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Hospital / Center</span>
//                     <span className="cd-modal-val">{selected.clientName}</span>
//                   </div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Full Address</span>
//                     <span className="cd-modal-val">{selected.address || <span className="muted">—</span>}</span>
//                   </div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">PIN Code</span>
//                     <span className="cd-modal-val mono">{selected.pincode}</span>
//                   </div>

//                   <div className="cd-modal-section">02 · Contact Information</div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Contact Person</span>
//                     <span className="cd-modal-val">{selected.contactPerson}</span>
//                   </div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Phone</span>
//                     <span className="cd-modal-val mono">+91 {selected.phone}</span>
//                   </div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Email</span>
//                     <span className="cd-modal-val mono">{selected.email}</span>
//                   </div>

//                   <div className="cd-modal-section">03 · Modalities Offered</div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">Selected</span>
//                     <div className="cd-tags" style={{ paddingTop: "2px" }}>
//                       {modalities.length > 0
//                         ? modalities.map((m) => <span key={m} className="cd-tag">{m}</span>)
//                         : <span className="cd-modal-val muted">None selected</span>
//                       }
//                     </div>
//                   </div>

//                   <div className="cd-modal-section">04 · KYC / Tax Details</div>
//                   <div className="cd-modal-row">
//                     <span className="cd-modal-key">PAN Number</span>
//                     <span className="cd-modal-val mono">{selected.pan}</span>
//                   </div>
//                   <div className="cd-modal-row" style={{ marginBottom: "8px" }}>
//                     <span className="cd-modal-key">PAN Card</span>
//                     {panCardUrl
//                       ? <a className="cd-modal-val link" href={panCardUrl} target="_blank" rel="noreferrer">📄 View / Download</a>
//                       : <span className="cd-modal-val muted">Not uploaded</span>
//                     }
//                   </div>

//                   {(selected.createdAt || selected.submittedAt) && (
//                     <>
//                       <div className="cd-modal-section">Submission Info</div>
//                       <div className="cd-modal-row" style={{ marginBottom: "8px" }}>
//                         <span className="cd-modal-key">Submitted On</span>
//                         <span className="cd-modal-val">
//                           {new Date(selected.createdAt || selected.submittedAt).toLocaleString()}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 <div className="cd-modal-footer">
//                   <button className="cd-modal-close-btn" onClick={() => setSelected(null)}>Close</button>
//                 </div>

//               </div>
//             </div>
//           );
//         })()}

//       </div>
//     </>
//   );
// }


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

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

export default function ClientDashboard() {
  const [clients,      setClients]      = useState([]);
  const [allClients,   setAllClients]   = useState([]);
  const [darkMode,     setDarkMode]     = useState(false);
  const [selected,     setSelected]     = useState(null);
  const [search,       setSearch]       = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

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

  function triggerMessage(client) {

    fetch(`${BASE_URL}/send-message/`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        client_id: client.id,
      }),
    })
      .then(async (res) => {

        const data = await res.json();

        console.log(data);

        if (res.ok) {
          alert("SMS sent successfully");
        } else {
          alert(data.detail || data.message || "SMS failed");
        }
      })
      .catch((err) => {

        console.error(err);

        alert("Failed to send SMS");
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
    inputBg:        d ? "rgba(255,255,255,0.05)"   : "#f9f9f9",
    inputBorder:    d ? "rgba(255,255,255,0.1)"    : "rgba(0,0,0,0.12)",
    inputColor:     d ? "#e0e0e0"                  : "#111111",
    selectBg:       d ? "#1e1e1e"                  : "#ffffff",
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
    .cd-email-cell { font-family: 'DM Mono', monospace; font-size: 12px; color: ${t.emailColor} !important; }
    .cd-mono-cell  { font-family: 'DM Mono', monospace; font-size: 12.5px; font-weight: 500; color: ${t.contactColor} !important; }

    .cd-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .cd-tag {
      padding: 3px 9px; font-size: 11px; border-radius: 20px; white-space: nowrap;
      background: ${t.accentBadgeBg}; color: ${t.accent};
      border: 1px solid rgba(220,38,38,0.25);
    }

    .cd-view-btn {
      display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
      background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
      border-radius: 6px; color: ${t.accent};
      font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
      cursor: pointer; transition: all 0.18s; white-space: nowrap;
    }
    .cd-view-btn:hover { background: ${t.viewHover}; box-shadow: 0 2px 12px ${t.accentGlow}; }

    .cd-empty { text-align: center; padding: 56px 24px; color: ${t.textMuted}; font-size: 14px; }
    .cd-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }

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
    .cd-modal-close {
      background: none; border: none; font-size: 18px;
      cursor: pointer; color: ${t.textSecondary}; padding: 4px 8px; border-radius: 6px;
      transition: color 0.15s;
    }
    .cd-modal-close:hover { color: ${t.accent}; }

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
    .cd-modal-row:last-of-type { border-bottom: none; }
    .cd-modal-key  { width: 155px; flex-shrink: 0; color: ${t.textSecondary}; font-size: 13px; }
    .cd-modal-val  { color: ${t.textPrimary}; font-weight: 500; word-break: break-word; }
    .cd-modal-val.mono  { font-family: 'DM Mono', monospace; font-size: 12.5px; letter-spacing: 0.06em; }
    .cd-modal-val.link  { color: ${t.accent}; text-decoration: none; }
    .cd-modal-val.link:hover { text-decoration: underline; }
    .cd-modal-val.muted { color: ${t.textMuted}; font-weight: 400; }

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
    .cd-modal-close-btn:hover { background: ${t.accentHover}; }
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
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Modalities</th>
                <th>PAN</th>
                <th>View Form</th>
                <th>Send SMS</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={10}>
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
                      <td>{client.contact_person}</td>
                      <td className="cd-email-cell">{client.email}</td>
                      <td className="cd-mono-cell">{client.phone}</td>
                      <td>
                        <div className="cd-tags">
                          {modalities.map((m) => <span key={m} className="cd-tag">{m}</span>)}
                        </div>
                      </td>
                      <td className="cd-mono-cell">{client.pan}</td>
                      <td>
                        <button className="cd-view-btn" onClick={() => setSelected(client)}>
                          👁 View Details
                        </button>
                      </td>

<td>
  <button
    className="cd-view-btn"
    style={{ color: "#25D366" }}
    onClick={() => triggerMessage(client, "whatsapp")}
  >
    💬 SMS
  </button>
</td>

<td>
  <button
    className="cd-view-btn"
    style={{ color: "#3b82f6" }}
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

        {/* ── Modal ── */}
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
                  <button className="cd-modal-close-btn" onClick={() => setSelected(null)}>Close</button>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </>
  );
}
