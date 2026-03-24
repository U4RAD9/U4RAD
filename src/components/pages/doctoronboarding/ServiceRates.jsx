import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

function ServiceRates() {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const [rates, setRates] = useState([]);
    const [services, setServices] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    // Add form state
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState(serviceId || "");
    const [minQty, setMinQty] = useState("");
    const [maxQty, setMaxQty] = useState("");
    const [rate, setRate] = useState("");

    // Edit form state
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editMinQty, setEditMinQty] = useState("");
    const [editMaxQty, setEditMaxQty] = useState("");
    const [editRate, setEditRate] = useState("");

    useEffect(() => {
        fetchRates();
        fetchServices();
    }, []);

    function fetchRates() {
        fetch(`${BASE_URL}/get-rates/${serviceId}/`)
            .then(res => res.json())
            .then(data => setRates(data))
            .catch(err => console.log(err));
    }

    function fetchServices() {
        fetch(`${BASE_URL}/get-services/`)
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err));
    }

    function addRate() {
        if (!selectedService || !minQty.toString().trim() || !maxQty.toString().trim() || !rate.toString().trim()) {
            alert("Please fill all fields");
            return;
        }
        fetch(`${BASE_URL}/create-rate/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service: selectedService,
                min_qty: minQty,
                max_qty: maxQty,
                rate: rate
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to create rate");
                return res.json();
            })
            .then(() => {
                setMinQty(""); setMaxQty(""); setRate("");
                setSelectedService(serviceId || "");
                setShowForm(false);
                fetchRates();
            })
            .catch(err => console.log(err));
    }

    function openEditForm(r) {
        setEditingId(r.id);
        setEditMinQty(r.min_qty);
        setEditMaxQty(r.max_qty);
        setEditRate(r.rate);
        setShowEditForm(true);
        setShowForm(false);
    }

    function saveEdit() {
        if (!editMinQty.toString().trim() || !editMaxQty.toString().trim() || !editRate.toString().trim()) {
            alert("Please fill all fields");
            return;
        }
        fetch(`${BASE_URL}/update-rate/${editingId}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ min_qty: editMinQty, max_qty: editMaxQty, rate: editRate })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update rate");
                return res.json();
            })
            .then(() => {
                setShowEditForm(false);
                setEditingId(null);
                fetchRates();
            })
            .catch(err => console.log(err));
    }

    function closeEditForm() {
        setShowEditForm(false);
        setEditingId(null);
    }

    function deleteRate(id) {
        fetch(`${BASE_URL}/delete-rate/${id}/`, { method: "DELETE" })
            .then(() => fetchRates())
            .catch(err => console.log(err));
    }

    const d = darkMode;

    const t = {
        pageBg:        d ? "#0d0d0d"                     : "#f0f0f0",
        cardBg:        d ? "#161616"                     : "#ffffff",
        inputBg:       d ? "#0d0d0d"                    : "#f8f8f8",
        rowHover:      d ? "rgba(220,38,38,0.06)"        : "rgba(220,38,38,0.04)",
        theadBg:       d ? "rgba(255,255,255,0.02)"      : "rgba(0,0,0,0.03)",

        borderMain:    d ? "rgba(255,255,255,0.07)"      : "rgba(0,0,0,0.1)",
        borderInput:   d ? "rgba(255,255,255,0.1)"       : "rgba(0,0,0,0.13)",
        borderRow:     d ? "rgba(255,255,255,0.04)"      : "rgba(0,0,0,0.06)",

        textPrimary:   d ? "#f0f0f0"  : "#111111",
        textSecondary: d ? "#999999"  : "#555555",
        textMuted:     d ? "#444444"  : "#bbbbbb",
        textInput:     d ? "#f0f0f0"  : "#111111",
        textTh:        d ? "#484848"  : "#aaaaaa",

        accent:        "#dc2626",
        accentHover:   "#ef4444",
        accentGlow:    "rgba(220,38,38,0.28)",
        accentBadgeBg: d ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.09)",

        editBg:        d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.04)",
        editBorder:    d ? "rgba(255,255,255,0.14)"  : "rgba(0,0,0,0.14)",
        editColor:     d ? "#c0c0c0"                 : "#444444",
        editHoverBg:   d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.08)",

        deleteBg:      d ? "rgba(220,38,38,0.08)"   : "rgba(220,38,38,0.06)",
        deleteBorder:  d ? "rgba(220,38,38,0.22)"   : "rgba(220,38,38,0.18)",
        deleteHover:   d ? "rgba(220,38,38,0.18)"   : "rgba(220,38,38,0.13)",

        backBg:        d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.05)",
        backBorder:    d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.11)",
        backColor:     d ? "#888888"                 : "#666666",
        backHoverBg:   d ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",

        themeBtnBg:    d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.06)",
        themeBtnBorder:d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
        themeBtnColor: d ? "#b0b0b0"                 : "#555555",

        cancelBorder:  d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)",
        cancelColor:   d ? "#666666"                 : "#888888",

        selectBg:      d ? "#0d0d0d"                 : "#f8f8f8",
        selectArrow:   d ? "%23999999"               : "%23555555",
    };

    const css = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sr-wrapper {
            min-height: 100vh;
            background: ${t.pageBg};
            font-family: 'DM Sans', sans-serif;
            color: ${t.textPrimary};
            padding: 36px 48px;
            transition: background 0.25s, color 0.25s;
        }

        /* Header */
        .sr-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 36px; padding-bottom: 22px;
            border-bottom: 1px solid ${t.borderMain};
        }
        .sr-header-left  { display: flex; align-items: center; gap: 16px; }
        .sr-header-right { display: flex; align-items: center; gap: 10px; }

        .sr-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
        .sr-title span { color: ${t.accent}; }

        .sr-title-bar {
            width: 4px; height: 26px;
            background: ${t.accent}; border-radius: 2px; flex-shrink: 0;
        }

        .sr-back-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.backBg}; border: 1px solid ${t.backBorder};
            color: ${t.backColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .sr-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }

        .sr-theme-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.themeBtnBg}; border: 1px solid ${t.themeBtnBorder};
            color: ${t.themeBtnColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .sr-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

        .sr-add-btn {
            display: inline-flex; align-items: center; gap: 8px;
            background: ${t.accent}; border: none; color: #fff;
            padding: 10px 20px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
            cursor: pointer; transition: all 0.2s;
        }
        .sr-add-btn:hover {
            background: ${t.accentHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 20px ${t.accentGlow};
        }

        /* ── Form Card ── */
        .sr-form-card {
            background: ${t.cardBg}; border: 1px solid ${t.borderMain};
            border-radius: 14px; padding: 32px 36px;
            max-width: 560px; margin-bottom: 32px;
            animation: slideDown 0.22s ease;
            transition: background 0.25s, border-color 0.25s;
        }
        .sr-form-card.edit-mode { border-left: 3px solid ${t.accent}; }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .sr-form-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 28px;
            padding-bottom: 18px;
            border-bottom: 1px solid ${t.borderRow};
        }
        .sr-form-title-wrap { display: flex; align-items: center; gap: 10px; }
        .sr-form-title { font-size: 20px; font-weight: 700; color: ${t.textPrimary}; letter-spacing: -0.3px; }
        .sr-form-badge {
            font-size: 11px; font-weight: 700; padding: 3px 10px;
            border-radius: 20px; background: rgba(220,38,38,0.12);
            color: ${t.accent}; border: 1px solid rgba(220,38,38,0.22);
        }

        .sr-close-btn {
            width: 30px; height: 30px;
            display: flex; align-items: center; justify-content: center;
            background: ${t.backBg}; border: 1px solid ${t.borderInput};
            border-radius: 6px; color: ${t.textSecondary}; font-size: 13px;
            cursor: pointer; transition: all 0.18s;
        }
        .sr-close-btn:hover {
            background: rgba(220,38,38,0.12);
            border-color: rgba(220,38,38,0.3);
            color: ${t.accent};
        }

        /* Each field stacked vertically like the screenshot */
        .sr-form-group {
            margin-bottom: 20px;
        }

        .sr-label {
            display: block; font-size: 13px; font-weight: 600;
            color: ${t.textPrimary};
            margin-bottom: 8px;
        }

        .sr-input {
            width: 100%; padding: 12px 14px;
            background: ${t.inputBg} !important;
            border: 1px solid ${t.borderInput}; border-radius: 8px;
            color: ${t.textInput} !important;
            -webkit-text-fill-color: ${t.textInput} !important;
            font-family: 'DM Sans', sans-serif; font-size: 14px;
            outline: none; caret-color: ${t.accent};
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sr-input::placeholder { color: ${t.textMuted}; }
        .sr-input:focus {
            border-color: ${t.accent};
            box-shadow: 0 0 0 3px ${t.accentGlow};
        }
        .sr-input:-webkit-autofill,
        .sr-input:-webkit-autofill:hover,
        .sr-input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px ${t.inputBg} inset !important;
            -webkit-text-fill-color: ${t.textInput} !important;
        }

        /* Select dropdown styled to match inputs */
        .sr-select {
            width: 100%; padding: 12px 38px 12px 14px;
            background: ${t.selectBg} !important;
            border: 1px solid ${t.borderInput}; border-radius: 8px;
            color: ${t.textInput} !important;
            font-family: 'DM Sans', sans-serif; font-size: 14px;
            outline: none; cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${t.selectArrow}' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 14px center !important;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sr-select:focus {
            border-color: ${t.accent};
            box-shadow: 0 0 0 3px ${t.accentGlow};
        }
        .sr-select option {
            background: ${t.cardBg};
            color: ${t.textInput};
        }

        /* Full-width Save button like screenshot */
        .sr-save-full-btn {
            width: 100%; padding: 14px;
            background: ${t.accent}; border: none;
            border-radius: 8px; color: #fff;
            font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
            cursor: pointer; transition: all 0.18s;
            margin-top: 8px; letter-spacing: 0.2px;
        }
        .sr-save-full-btn:hover {
            background: ${t.accentHover};
            box-shadow: 0 4px 20px ${t.accentGlow};
        }

        /* Edit form footer (2 buttons) */
        .sr-form-footer {
            display: flex; justify-content: flex-end; gap: 10px;
            margin-top: 24px; padding-top: 20px;
            border-top: 1px solid ${t.borderRow};
        }
        .sr-cancel-btn {
            padding: 10px 20px; background: transparent;
            border: 1px solid ${t.cancelBorder}; border-radius: 7px;
            color: ${t.cancelColor};
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.18s;
        }
        .sr-cancel-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

        .sr-save-btn {
            padding: 10px 24px; background: ${t.accent}; border: none;
            border-radius: 7px; color: #fff;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sr-save-btn:hover {
            background: ${t.accentHover};
            box-shadow: 0 4px 16px ${t.accentGlow};
        }

        /* Table */
        .sr-table-section {
            background: ${t.cardBg}; border: 1px solid ${t.borderMain};
            border-radius: 14px; overflow: hidden;
            transition: background 0.25s, border-color 0.25s;
        }
        .sr-table-header {
            padding: 18px 24px; border-bottom: 1px solid ${t.borderMain};
            display: flex; align-items: center; justify-content: space-between;
        }
        .sr-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
        .sr-count-badge {
            background: ${t.accentBadgeBg}; color: ${t.accent};
            border: 1px solid rgba(220,38,38,0.2);
            border-radius: 20px; padding: 2px 10px;
            font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace;
        }

        table.sr-table { width: 100%; border-collapse: collapse; }
        .sr-table thead th {
            padding: 12px 24px; font-size: 10.5px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.9px;
            color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
        }
        .sr-table tbody tr {
            border-top: 1px solid ${t.borderRow}; transition: background 0.15s;
        }
        .sr-table tbody tr:hover { background: ${t.rowHover}; }
        .sr-table tbody tr.row-editing { background: rgba(220,38,38,0.04); }
        .sr-table tbody td {
            padding: 16px 24px; font-size: 14px;
            color: ${t.textSecondary}; vertical-align: middle;
        }
        .sr-id-cell {
            font-family: 'DM Mono', monospace; font-size: 12.5px;
            color: ${t.textMuted} !important;
        }
        .sr-val-cell {
            font-family: 'DM Mono', monospace; font-size: 13px;
            font-weight: 500; color: ${t.textPrimary} !important;
        }

        .sr-actions { display: flex; align-items: center; gap: 8px; }

        .sr-edit-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 13px;
            background: ${t.editBg}; border: 1px solid ${t.editBorder};
            border-radius: 6px; color: ${t.editColor};
            font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sr-edit-btn:hover {
            background: ${t.editHoverBg}; color: ${t.textPrimary};
            border-color: ${d ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)"};
        }
        .sr-edit-btn.active-edit {
            background: rgba(220,38,38,0.1);
            border-color: rgba(220,38,38,0.3);
            color: ${t.accent};
        }

        .sr-delete-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 13px;
            background: ${t.deleteBg}; border: 1px solid ${t.deleteBorder};
            border-radius: 6px; color: ${t.accent};
            font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sr-delete-btn:hover {
            background: ${t.deleteHover};
            box-shadow: 0 2px 12px ${t.accentGlow};
        }

        .sr-empty {
            text-align: center; padding: 56px 24px;
            color: ${t.textMuted}; font-size: 14px;
        }
        .sr-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }
    `;

    // Get service name for the form title
    const currentService = services.find(s => s.id === parseInt(serviceId));
    const serviceName = currentService ? currentService.name : `#${serviceId}`;

    return (
        <>
            <style>{css}</style>

            <div className="sr-wrapper">

                {/* ── Header ── */}
                <div className="sr-header">
                    <div className="sr-header-left">
                        <button className="sr-back-btn" onClick={() => navigate("/service-dashboard")}>
                            ← Back
                        </button>
                        <div className="sr-title-bar" />
                        <h1 className="sr-title">Service <span>Rates</span></h1>
                    </div>
                    <div className="sr-header-right">
                        <button className="sr-theme-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>
                        <button className="sr-add-btn" onClick={() => { setShowForm(true); setShowEditForm(false); }}>
                            + Add Rate
                        </button>
                    </div>
                </div>

                {/* ── Add Rate Form (matches screenshot layout) ── */}
                {showForm && (
                    <div className="sr-form-card">
                        <div className="sr-form-header">
                            <div className="sr-form-title-wrap">
                                <span className="sr-form-title">Add Service Rate for {serviceName}</span>
                            </div>
                            <button className="sr-close-btn" onClick={() => setShowForm(false)}>✕</button>
                        </div>

                        {/* Service dropdown */}
                        <div className="sr-form-group">
                            <label className="sr-label">Service:</label>
                            <select
                                className="sr-select"
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                            >
                                <option value="">----------</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Min quantity */}
                        <div className="sr-form-group">
                            <label className="sr-label">Min quantity:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={minQty}
                                onChange={(e) => setMinQty(e.target.value)}
                            />
                        </div>

                        {/* Max quantity */}
                        <div className="sr-form-group">
                            <label className="sr-label">Max quantity:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={maxQty}
                                onChange={(e) => setMaxQty(e.target.value)}
                            />
                        </div>

                        {/* Rate */}
                        <div className="sr-form-group">
                            <label className="sr-label">Rate:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </div>

                        {/* Full-width Save button */}
                        <button className="sr-save-full-btn" onClick={addRate}>
                            Save
                        </button>
                    </div>
                )}

                {/* ── Edit Rate Form ── */}
                {showEditForm && (
                    <div className="sr-form-card edit-mode">
                        <div className="sr-form-header">
                            <div className="sr-form-title-wrap">
                                <span className="sr-form-title">Edit Rate</span>
                                <span className="sr-form-badge">ID #{editingId}</span>
                            </div>
                            <button className="sr-close-btn" onClick={closeEditForm}>✕</button>
                        </div>

                        <div className="sr-form-group">
                            <label className="sr-label">Min quantity:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={editMinQty}
                                onChange={(e) => setEditMinQty(e.target.value)}
                            />
                        </div>

                        <div className="sr-form-group">
                            <label className="sr-label">Max quantity:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={editMaxQty}
                                onChange={(e) => setEditMaxQty(e.target.value)}
                            />
                        </div>

                        <div className="sr-form-group">
                            <label className="sr-label">Rate:</label>
                            <input
                                type="number"
                                className="sr-input"
                                value={editRate}
                                onChange={(e) => setEditRate(e.target.value)}
                            />
                        </div>

                        <div className="sr-form-footer">
                            <button className="sr-cancel-btn" onClick={closeEditForm}>Cancel</button>
                            <button className="sr-save-btn" onClick={saveEdit}>Update Rate</button>
                        </div>
                    </div>
                )}

                {/* ── Table ── */}
                <div className="sr-table-section">
                    <div className="sr-table-header">
                        <span className="sr-table-heading">All Rates</span>
                        <span className="sr-count-badge">{rates.length}</span>
                    </div>

                    <table className="sr-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Min Qty</th>
                                <th>Max Qty</th>
                                <th>Rate</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rates.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        <div className="sr-empty">
                                            <div className="sr-empty-icon">📋</div>
                                            No rates found. Add one to get started.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                rates.map(r => (
                                    <tr key={r.id} className={editingId === r.id ? "row-editing" : ""}>
                                        <td className="sr-id-cell">#{r.id}</td>
                                        <td className="sr-val-cell">{r.min_qty}</td>
                                        <td className="sr-val-cell">{r.max_qty}</td>
                                        <td className="sr-val-cell">{r.rate}</td>
                                        <td>
                                            <div className="sr-actions">
                                                <button
                                                    className={`sr-edit-btn ${editingId === r.id ? "active-edit" : ""}`}
                                                    onClick={() => openEditForm(r)}
                                                >
                                                    ✏ Edit
                                                </button>
                                                <button
                                                    className="sr-delete-btn"
                                                    onClick={() => deleteRate(r.id)}
                                                >
                                                    🗑 Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default ServiceRates;