import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

function ServiceDashboard() {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState(null);   // null = Add mode, id = Edit mode
    const [editName, setEditName] = useState("");
    const [editActive, setEditActive] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    function fetchServices() {
        fetch(`${BASE_URL}/get-services/`)
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.id - b.id); // 🔥 reverse order
                setServices(sorted);
            })
            .catch(err => console.log(err));
    }

    function addService() {
        if (!serviceName.trim()) {
            alert("Enter service name");
            return;
        }
        fetch(`${BASE_URL}/create-service/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: serviceName, is_active: isActive })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to create service");
                return res.json();
            })
            .then(() => {
                setServiceName("");
                setIsActive(true);
                setShowForm(false);
                fetchServices();
            })
            .catch(err => console.log(err));
    }

    function openEditForm(service) {
        setEditingId(service.id);
        setEditName(service.name);
        setEditActive(service.is_active ?? true);
        setShowEditForm(true);
        setShowForm(false); // close add form if open
    }

    function saveEdit() {
        if (!editName.trim()) {
            alert("Enter service name");
            return;
        }
        fetch(`${BASE_URL}/create-service/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: editingId,          // 🔥 THIS IS THE KEY
                name: editName,
                is_active: editActive
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update service");
                return res.json();
            })
            .then(() => {
                setShowEditForm(false);
                setEditingId(null);
                fetchServices();
            })
            .catch(err => console.log(err));
    }

    function goBack(){
        const role = localStorage.getItem("role");

        if(role === "coordinator" || role === "Coordinator1"){
            navigate("/coordinator-dashboard");
        }
        else if(role === "supercoordinator" || role === "SuperCoordinator2"){
            navigate("/super-coordinator-dashboard");
        }
        else{
            navigate("/login");
        }
    }

    function closeEditForm() {
        setShowEditForm(false);
        setEditingId(null);
    }

    function deleteService(id) {
        fetch(`${BASE_URL}/delete-service/${id}/`, { method: "DELETE" })
            .then(() => fetchServices())
            .catch(err => console.log(err));
    }

    const d = darkMode;

    const t = {
        pageBg:        d ? "#0d0d0d"                     : "#f0f0f0",
        cardBg:        d ? "#161616"                     : "#ffffff",
        inputBg:       d ? "#0d0d0d"                    : "#f8f8f8",
        rowHover:      d ? "rgba(220,38,38,0.06)"        : "rgba(220,38,38,0.04)",
        theadBg:       d ? "rgba(255,255,255,0.02)"      : "rgba(0,0,0,0.03)",
        toggleRowBg:   d ? "rgba(255,255,255,0.03)"      : "rgba(0,0,0,0.03)",

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

        toggleOff:     d ? "rgba(255,255,255,0.14)"  : "rgba(0,0,0,0.14)",

        themeBtnBg:    d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.06)",
        themeBtnBorder:d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
        themeBtnColor: d ? "#b0b0b0"                 : "#555555",

        cancelBorder:  d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)",
        cancelColor:   d ? "#666666"                 : "#888888",
    };

    // Reusable form block renderer
    function renderForm({
        title, name, setName, active, setActive,
        onSave, onCancel, saveLabel, isActivePill
    }) {
        return `
        .sd-form-card {
            background: ${t.cardBg};
            border: 1px solid ${t.borderMain};
            border-radius: 14px; padding: 28px 32px;
            max-width: 520px; margin-bottom: 32px;
            animation: slideDown 0.22s ease;
            transition: background 0.25s, border-color 0.25s;
        }`;
    }

    const css = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sd-wrapper {
            min-height: 100vh;
            background: ${t.pageBg};
            font-family: 'DM Sans', sans-serif;
            color: ${t.textPrimary};
            padding: 36px 48px;
            transition: background 0.25s, color 0.25s;
        }

        /* Header */
        .sd-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 36px; padding-bottom: 22px;
            border-bottom: 1px solid ${t.borderMain};
        }
        .sd-header-left  { display: flex; align-items: center; gap: 16px; }
        .sd-header-right { display: flex; align-items: center; gap: 10px; }

        .sd-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
        .sd-title span { color: ${t.accent}; }

        .sd-title-bar {
            width: 4px; height: 26px;
            background: ${t.accent}; border-radius: 2px; flex-shrink: 0;
        }

        /* Buttons */
        .sd-back-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.backBg}; border: 1px solid ${t.backBorder};
            color: ${t.backColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .sd-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }

        .sd-theme-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.themeBtnBg}; border: 1px solid ${t.themeBtnBorder};
            color: ${t.themeBtnColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .sd-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

        .sd-add-btn {
            display: inline-flex; align-items: center; gap: 8px;
            background: ${t.accent}; border: none; color: #fff;
            padding: 10px 20px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
            cursor: pointer; transition: all 0.2s; letter-spacing: 0.1px;
        }
        .sd-add-btn:hover {
            background: ${t.accentHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 20px ${t.accentGlow};
        }

        /* Form card — shared by Add & Edit */
        .sd-form-card {
            background: ${t.cardBg}; border: 1px solid ${t.borderMain};
            border-radius: 14px; padding: 28px 32px;
            max-width: 520px; margin-bottom: 32px;
            animation: slideDown 0.22s ease;
            transition: background 0.25s, border-color 0.25s;
        }
        /* Edit form gets a subtle left accent stripe */
        .sd-form-card.edit-mode {
            border-left: 3px solid ${t.accent};
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .sd-form-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 24px;
        }
        .sd-form-title { font-size: 17px; font-weight: 600; color: ${t.textPrimary}; }
        .sd-form-badge {
            font-size: 11px; font-weight: 700; padding: 3px 10px;
            border-radius: 20px; background: rgba(220,38,38,0.12);
            color: ${t.accent}; border: 1px solid rgba(220,38,38,0.22);
        }

        .sd-close-btn {
            width: 30px; height: 30px;
            display: flex; align-items: center; justify-content: center;
            background: ${t.backBg}; border: 1px solid ${t.borderInput};
            border-radius: 6px; color: ${t.textSecondary}; font-size: 13px;
            cursor: pointer; transition: all 0.18s;
        }
        .sd-close-btn:hover {
            background: rgba(220,38,38,0.12);
            border-color: rgba(220,38,38,0.3);
            color: ${t.accent};
        }

        .sd-form-group { margin-bottom: 18px; }

        .sd-label {
            display: block; font-size: 11px; font-weight: 700;
            color: ${t.textSecondary}; text-transform: uppercase;
            letter-spacing: 0.9px; margin-bottom: 8px;
        }

        .sd-input {
            width: 100%; padding: 11px 14px;
            background: ${t.inputBg} !important;
            border: 1px solid ${t.borderInput}; border-radius: 8px;
            color: ${t.textInput} !important;
            -webkit-text-fill-color: ${t.textInput} !important;
            font-family: 'DM Sans', sans-serif; font-size: 14px;
            outline: none; caret-color: ${t.accent};
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sd-input::placeholder { color: ${t.textMuted}; }
        .sd-input:focus {
            border-color: ${t.accent};
            box-shadow: 0 0 0 3px ${t.accentGlow};
        }
        .sd-input:-webkit-autofill,
        .sd-input:-webkit-autofill:hover,
        .sd-input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px ${t.inputBg} inset !important;
            -webkit-text-fill-color: ${t.textInput} !important;
        }

        /* Toggle */
        .sd-toggle-row {
            display: flex; align-items: center; justify-content: space-between;
            background: ${t.toggleRowBg}; border: 1px solid ${t.borderRow};
            border-radius: 8px; padding: 12px 14px; margin-top: 4px;
        }
        .sd-toggle-label {
            font-size: 14px; color: ${t.textSecondary};
            font-weight: 500; display: flex; align-items: center; gap: 9px;
        }
        .sd-toggle { position: relative; width: 42px; height: 24px; flex-shrink: 0; }
        .sd-toggle input { opacity: 0; width: 0; height: 0; }
        .sd-toggle-slider {
            position: absolute; cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background: ${t.toggleOff}; border-radius: 24px; transition: 0.2s;
        }
        .sd-toggle-slider::before {
            content: ""; position: absolute;
            width: 18px; height: 18px; left: 3px; bottom: 3px;
            background: #fff; border-radius: 50%; transition: 0.2s;
        }
        .sd-toggle input:checked + .sd-toggle-slider { background: ${t.accent}; }
        .sd-toggle input:checked + .sd-toggle-slider::before { transform: translateX(18px); }

        /* Status pills — computed inline per form */
        .sd-status-pill {
            font-size: 11px; font-weight: 700; padding: 2px 9px;
            border-radius: 20px; transition: all 0.2s;
        }

        /* Form footer */
        .sd-form-footer {
            display: flex; justify-content: flex-end; gap: 10px;
            margin-top: 24px; padding-top: 20px;
            border-top: 1px solid ${t.borderRow};
        }
        .sd-cancel-btn {
            padding: 9px 18px; background: transparent;
            border: 1px solid ${t.cancelBorder}; border-radius: 7px;
            color: ${t.cancelColor};
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.18s;
        }
        .sd-cancel-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

        .sd-save-btn {
            padding: 9px 22px; background: ${t.accent}; border: none;
            border-radius: 7px; color: #fff;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sd-save-btn:hover {
            background: ${t.accentHover};
            box-shadow: 0 4px 16px ${t.accentGlow};
        }

        .sd-rate-btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 6px 13px;
            background: rgba(34,197,94,0.08);
            border: 1px solid rgba(34,197,94,0.25);
            border-radius: 6px;
            color: #22c55e;
            font-family: 'DM Sans', sans-serif;
            font-size: 12.5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s;
        }

        .sd-rate-btn:hover {
            background: rgba(34,197,94,0.18);
            box-shadow: 0 2px 12px rgba(34,197,94,0.25);
        }

        /* Table */
        .sd-table-section {
            background: ${t.cardBg}; border: 1px solid ${t.borderMain};
            border-radius: 14px; overflow: hidden;
            transition: background 0.25s, border-color 0.25s;
        }
        .sd-table-header {
            padding: 18px 24px; border-bottom: 1px solid ${t.borderMain};
            display: flex; align-items: center; justify-content: space-between;
        }
        .sd-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
        .sd-count-badge {
            background: ${t.accentBadgeBg}; color: ${t.accent};
            border: 1px solid rgba(220,38,38,0.2);
            border-radius: 20px; padding: 2px 10px;
            font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace;
        }

        table.sd-table { width: 100%; border-collapse: collapse; }
        .sd-table thead th {
            padding: 12px 24px; font-size: 10.5px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.9px;
            color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
        }
        .sd-table tbody tr {
            border-top: 1px solid ${t.borderRow}; transition: background 0.15s;
        }
        .sd-table tbody tr:hover { background: ${t.rowHover}; }
        .sd-table tbody tr.row-editing { background: rgba(220,38,38,0.04); }
        .sd-table tbody td {
            padding: 16px 24px; font-size: 14px;
            color: ${t.textSecondary}; vertical-align: middle;
        }
        .sd-id-cell {
            font-family: 'DM Mono', monospace; font-size: 12.5px;
            color: ${t.textMuted} !important;
        }
        .sd-name-cell { font-weight: 500; color: ${t.textPrimary} !important; }

        /* Action buttons cell */
        .sd-actions { display: flex; align-items: center; gap: 8px; }

        .sd-edit-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 13px;
            background: ${t.editBg}; border: 1px solid ${t.editBorder};
            border-radius: 6px; color: ${t.editColor};
            font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sd-edit-btn:hover {
            background: ${t.editHoverBg};
            color: ${t.textPrimary};
            border-color: ${d ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)"};
        }
        .sd-edit-btn.active-edit {
            background: rgba(220,38,38,0.1);
            border-color: rgba(220,38,38,0.3);
            color: ${t.accent};
        }

        .sd-delete-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 13px;
            background: ${t.deleteBg}; border: 1px solid ${t.deleteBorder};
            border-radius: 6px; color: ${t.accent};
            font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
        }
        .sd-delete-btn:hover {
            background: ${t.deleteHover};
            box-shadow: 0 2px 12px ${t.accentGlow};
        }

        .sd-empty {
            text-align: center; padding: 56px 24px;
            color: ${t.textMuted}; font-size: 14px;
        }
        .sd-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }
    `;

    // Pill style helper (inline styles since they depend on per-form state)
    const pillStyle = (active) => ({
        fontSize: "11px", fontWeight: 700, padding: "2px 9px",
        borderRadius: "20px", transition: "all 0.2s",
        background: active ? "rgba(220,38,38,0.14)" : t.toggleRowBg,
        color: active ? t.accent : t.textMuted,
        border: `1px solid ${active ? "rgba(220,38,38,0.25)" : t.borderRow}`,
    });

    return (
        <>
            <style>{css}</style>

            <div className="sd-wrapper">

                {/* ── Header ── */}
                <div className="sd-header">
                    <div className="sd-header-left">
                        <button className="sd-back-btn" onClick={goBack}>
                            ← Back
                        </button>
                        <div className="sd-title-bar" />
                        <h1 className="sd-title">Service <span>Dashboard</span></h1>
                    </div>
                    <div className="sd-header-right">
                        <button className="sd-theme-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>
                        <button className="sd-add-btn" onClick={() => { setShowForm(true); setShowEditForm(false); }}>
                            + Add Service
                        </button>
                    </div>
                </div>

                {/* ── Add Service Form ── */}
                {showForm && (
                    <div className="sd-form-card">
                        <div className="sd-form-header">
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span className="sd-form-title">Add New Service</span>
                                <span className="sd-form-badge">New</span>
                            </div>
                            <button className="sd-close-btn" onClick={() => setShowForm(false)}>✕</button>
                        </div>

                        <div className="sd-form-group">
                            <label className="sd-label">Service Name</label>
                            <input
                                type="text"
                                className="sd-input"
                                placeholder="e.g. Physiotherapy"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                        </div>

                        <div className="sd-form-group">
                            <label className="sd-label">Status</label>
                            <div className="sd-toggle-row">
                                <span className="sd-toggle-label">
                                    Is Active
                                    <span style={pillStyle(isActive)}>{isActive ? "Active" : "Inactive"}</span>
                                </span>
                                <label className="sd-toggle">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    <span className="sd-toggle-slider" />
                                </label>
                            </div>
                        </div>

                        <div className="sd-form-footer">
                            <button className="sd-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="sd-save-btn" onClick={addService}>Save Service</button>
                        </div>
                    </div>
                )}

                {/* ── Edit Service Form ── */}
                {showEditForm && (
                    <div className="sd-form-card edit-mode">
                        <div className="sd-form-header">
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span className="sd-form-title">Edit Service</span>
                                <span className="sd-form-badge">ID #{editingId}</span>
                            </div>
                            <button className="sd-close-btn" onClick={closeEditForm}>✕</button>
                        </div>

                        <div className="sd-form-group">
                            <label className="sd-label">Service Name</label>
                            <input
                                type="text"
                                className="sd-input"
                                placeholder="e.g. Physiotherapy"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>

                        <div className="sd-form-group">
                            <label className="sd-label">Status</label>
                            <div className="sd-toggle-row">
                                <span className="sd-toggle-label">
                                    Is Active
                                    <span style={pillStyle(editActive)}>{editActive ? "Active" : "Inactive"}</span>
                                </span>
                                <label className="sd-toggle">
                                    <input
                                        type="checkbox"
                                        checked={editActive}
                                        onChange={(e) => setEditActive(e.target.checked)}
                                    />
                                    <span className="sd-toggle-slider" />
                                </label>
                            </div>
                        </div>

                        <div className="sd-form-footer">
                            <button className="sd-cancel-btn" onClick={closeEditForm}>Cancel</button>
                            <button className="sd-save-btn" onClick={saveEdit}>Update Service</button>
                        </div>
                    </div>
                )}

                {/* ── Table ── */}
                <div className="sd-table-section">
                    <div className="sd-table-header">
                        <span className="sd-table-heading">All Services</span>
                        <span className="sd-count-badge">{services.length}</span>
                    </div>

                    <table className="sd-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="3">
                                        <div className="sd-empty">
                                            <div className="sd-empty-icon">🗂️</div>
                                            No services found. Add one to get started.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                services.map(service => (
                                    <tr
                                        key={service.id}
                                        className={editingId === service.id ? "row-editing" : ""}
                                    >
                                        <td className="sd-id-cell">#{service.id}</td>
                                        <td className="sd-name-cell">{service.name}</td>
                                        <td>
                                            <div className="sd-actions">
                                                <button
                                                    className={`sd-edit-btn ${editingId === service.id ? "active-edit" : ""}`}
                                                    onClick={() => openEditForm(service)}
                                                >
                                                    ✏ Edit
                                                </button>

                                                <button
                                                    className="sd-rate-btn"
                                                    onClick={() => navigate(`/services/${service.id}/rates`)}
                                                >
                                                    📊 View Rates
                                                </button>

                                                <button
                                                    className="sd-delete-btn"
                                                    onClick={() => deleteService(service.id)}
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

export default ServiceDashboard;