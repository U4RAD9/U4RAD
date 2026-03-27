import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

function CallbackDashboard() {
    const [callbacks, setCallbacks] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCallback, setSelectedCallback] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCallbacks();
    }, []);

    async function fetchCallbackDetail(id) {
        try {
            const res = await fetch(`${BASE_URL}/callback/${id}/`);
            const data = await res.json();

            if (res.ok) {
                setSelectedCallback(data); // ✅ store selected form
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error(err);
        }
        }

    function goBack() {
        const role = localStorage.getItem("role");

        if (role === "coordinator" || role === "Coordinator1") {
            navigate("/coordinator-dashboard");
        }
        else if (role === "supercoordinator" || role === "SuperCoordinator2") {
            navigate("/super-coordinator-dashboard");
        }
        else {
            navigate("/login");
        }
    }

    function fetchCallbacks() {
        fetch(`${BASE_URL}/get-callbacks/`)
            .then(res => res.json())
            .then(data => setCallbacks(data))
            .catch(err => console.log(err));
    }

    const d = darkMode;

    const t = {
        pageBg:        d ? "#0d0d0d"                     : "#f0f0f0",
        cardBg:        d ? "#161616"                     : "#ffffff",
        rowHover:      d ? "rgba(220,38,38,0.06)"        : "rgba(220,38,38,0.04)",
        theadBg:       d ? "rgba(255,255,255,0.02)"      : "rgba(0,0,0,0.03)",

        borderMain:    d ? "rgba(255,255,255,0.07)"      : "rgba(0,0,0,0.1)",
        borderRow:     d ? "rgba(255,255,255,0.04)"      : "rgba(0,0,0,0.06)",

        textPrimary:   d ? "#f0f0f0"  : "#111111",
        textSecondary: d ? "#999999"  : "#555555",
        textMuted:     d ? "#444444"  : "#bbbbbb",
        textTh:        d ? "#484848"  : "#aaaaaa",

        accent:        "#dc2626",
        accentHover:   "#ef4444",
        accentGlow:    "rgba(220,38,38,0.28)",
        accentBadgeBg: d ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.09)",

        viewBg:        d ? "rgba(220,38,38,0.08)"   : "rgba(220,38,38,0.06)",
        viewBorder:    d ? "rgba(220,38,38,0.22)"   : "rgba(220,38,38,0.18)",
        viewHover:     d ? "rgba(220,38,38,0.18)"   : "rgba(220,38,38,0.13)",

        backBg:        d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.05)",
        backBorder:    d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.11)",
        backColor:     d ? "#888888"                 : "#666666",
        backHoverBg:   d ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",

        themeBtnBg:    d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.06)",
        themeBtnBorder:d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
        themeBtnColor: d ? "#b0b0b0"                 : "#555555",

        emailColor:    d ? "#888888" : "#777777",
        contactColor:  d ? "#c0c0c0" : "#333333",
    };

    const css = `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cb-wrapper {
            min-height: 100vh;
            background: ${t.pageBg};
            font-family: 'DM Sans', sans-serif;
            color: ${t.textPrimary};
            padding: 36px 48px;
            transition: background 0.25s, color 0.25s;
        }

        /* Header */
        .cb-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 36px; padding-bottom: 22px;
            border-bottom: 1px solid ${t.borderMain};
        }
        .cb-header-left  { display: flex; align-items: center; gap: 16px; }
        .cb-header-right { display: flex; align-items: center; gap: 10px; }

        .cb-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
        .cb-title span { color: ${t.accent}; }

        .cb-title-bar {
            width: 4px; height: 26px;
            background: ${t.accent}; border-radius: 2px; flex-shrink: 0;
        }

        .cb-back-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.backBg}; border: 1px solid ${t.backBorder};
            color: ${t.backColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .cb-back-btn:hover { background: ${t.backHoverBg}; color: ${t.textPrimary}; }

        .cb-theme-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: ${t.themeBtnBg}; border: 1px solid ${t.themeBtnBorder};
            color: ${t.themeBtnColor}; padding: 8px 15px; border-radius: 8px;
            font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
            cursor: pointer; transition: all 0.2s;
        }
        .cb-theme-btn:hover { border-color: ${t.accent}; color: ${t.accent}; }

        /* Table */
        .cb-table-section {
            background: ${t.cardBg}; border: 1px solid ${t.borderMain};
            border-radius: 14px; overflow: hidden;
            transition: background 0.25s, border-color 0.25s;
        }
        .cb-table-header {
            padding: 18px 24px; border-bottom: 1px solid ${t.borderMain};
            display: flex; align-items: center; justify-content: space-between;
        }
        .cb-table-heading { font-size: 14px; font-weight: 600; color: ${t.textSecondary}; }
        .cb-count-badge {
            background: ${t.accentBadgeBg}; color: ${t.accent};
            border: 1px solid rgba(220,38,38,0.2);
            border-radius: 20px; padding: 2px 10px;
            font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace;
        }

        table.cb-table { width: 100%; border-collapse: collapse; }
        .cb-table thead th {
            padding: 12px 24px; font-size: 10.5px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.9px;
            color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
        }
        .cb-table tbody tr {
            border-top: 1px solid ${t.borderRow}; transition: background 0.15s;
        }
        .cb-table tbody tr:hover { background: ${t.rowHover}; }
        .cb-table tbody td {
            padding: 16px 24px; font-size: 14px;
            color: ${t.textSecondary}; vertical-align: middle;
        }

        /* Cell types */
        .cb-name-cell {
            font-weight: 600; color: ${t.textPrimary} !important;
            display: flex; align-items: center; gap: 10px;
        }
        .cb-avatar {
            width: 34px; height: 34px; border-radius: 50%;
            background: rgba(220,38,38,0.12);
            border: 1px solid rgba(220,38,38,0.22);
            display: flex; align-items: center; justify-content: center;
            font-size: 13px; font-weight: 700; color: ${t.accent};
            flex-shrink: 0; text-transform: uppercase;
        }
        .cb-email-cell {
            font-family: 'DM Mono', monospace; font-size: 12.5px;
            color: ${t.emailColor} !important;
        }
        .cb-contact-cell {
            font-family: 'DM Mono', monospace; font-size: 13px;
            font-weight: 500; color: ${t.contactColor} !important;
        }

        /* View button */
        .cb-view-btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 14px;
            background: ${t.viewBg}; border: 1px solid ${t.viewBorder};
            border-radius: 6px; color: ${t.accent};
            font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
            cursor: pointer; transition: all 0.18s; text-decoration: none;
        }
        .cb-view-btn:hover {
            background: ${t.viewHover};
            box-shadow: 0 2px 12px ${t.accentGlow};
        }

        /* ── Modal Overlay ── */
        .cb-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.55);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        /* ── Modal Box ── */
        .cb-modal {
            width: 520px;
            max-width: 90%;
            background: ${t.cardBg};
            border: 1px solid ${t.borderMain};
            border-radius: 14px;
            padding: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
            animation: fadeIn 0.2s ease;
        }

        /* Header */
        .cb-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .cb-modal-title {
            font-size: 18px;
            font-weight: 700;
            color: ${t.textPrimary};
        }

        /* Close button */
        .cb-close-btn {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: ${t.textSecondary};
        }
        .cb-close-btn:hover {
            color: ${t.accent};
        }

        /* Content */
        .cb-modal-content p {
            font-size: 14px;
            color: ${t.textSecondary};
            margin-bottom: 8px;
        }

        .cb-modal-content strong {
            color: ${t.textPrimary};
        }

        /* Modalities */
        .cb-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 6px;
        }

        .cb-tag {
            padding: 4px 10px;
            font-size: 12px;
            border-radius: 20px;
            background: ${t.accentBadgeBg};
            color: ${t.accent};
            border: 1px solid rgba(220,38,38,0.25);
        }

        /* Footer */
        .cb-modal-footer {
            margin-top: 18px;
            text-align: right;
        }

        .cb-close-main-btn {
            padding: 8px 16px;
            background: ${t.accent};
            border: none;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
        }
        .cb-close-main-btn:hover {
            background: ${t.accentHover};
        }

        /* Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Empty state */
        .cb-empty {
            text-align: center; padding: 56px 24px;
            color: ${t.textMuted}; font-size: 14px;
        }
        .cb-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }
    `;

    // Helper: get initials from name
    function getInitials(name) {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        return parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
    }

    return (
        <>
            <style>{css}</style>

            <div className="cb-wrapper">

                {/* ── Header ── */}
                <div className="cb-header">
                    <div className="cb-header-left">
                        <button className="cb-back-btn" onClick={goBack}>
                            ← Back
                        </button>
                        <div className="cb-title-bar" />
                        <h1 className="cb-title">Callback <span>Dashboard</span></h1>
                    </div>
                    <div className="cb-header-right">
                        <button className="cb-theme-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="cb-table-section">
                    <div className="cb-table-header">
                        <span className="cb-table-heading">All Callback Requests</span>
                        <span className="cb-count-badge">{callbacks.length}</span>
                    </div>

                    <table className="cb-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>View Filled Form</th>
                            </tr>
                        </thead>
                        <tbody>
                            {callbacks.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        <div className="cb-empty">
                                            <div className="cb-empty-icon">📞</div>
                                            No callback requests found.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                callbacks.map(cb => (
                                    <tr key={cb.id}>
                                        <td>
                                            <div className="cb-name-cell">
                                                <div className="cb-avatar">{getInitials(cb.name)}</div>
                                                {cb.name}
                                            </div>
                                        </td>
                                        <td className="cb-email-cell">{cb.email}</td>
                                        <td className="cb-contact-cell">{cb.contact}</td>
                                        <td>
                                            <button
                                                className="cb-view-btn"
                                                onClick={() => fetchCallbackDetail(cb.id)}
                                            >
                                                👁 View Form
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {selectedCallback && (
    <div className="cb-modal-overlay">
        <div className="cb-modal">

            {/* Header */}
            <div className="cb-modal-header">
                <div className="cb-modal-title">Callback Details</div>
                <button
                    className="cb-close-btn"
                    onClick={() => setSelectedCallback(null)}
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="cb-modal-content">
                <p><strong>Name:</strong> {selectedCallback.name}</p>
                <p><strong>Email:</strong> {selectedCallback.email}</p>
                <p><strong>Phone:</strong> {selectedCallback.phone_number}</p>
                <p><strong>Qualification:</strong> {selectedCallback.qualification}</p>
                <p><strong>Experience:</strong> {selectedCallback.experience} years</p>

                <p><strong>Modalities:</strong></p>
                <div className="cb-tags">
                    {selectedCallback.ct && <span className="cb-tag">CT</span>}
                    {selectedCallback.mri && <span className="cb-tag">MRI</span>}
                    {selectedCallback.xray && <span className="cb-tag">X-Ray</span>}
                    {selectedCallback.mammography && <span className="cb-tag">Mammography</span>}
                </div>
            </div>

            {/* Footer */}
            <div className="cb-modal-footer">
                <button
                    className="cb-close-main-btn"
                    onClick={() => setSelectedCallback(null)}
                >
                    Close
                </button>
            </div>

        </div>
    </div>
)}

            </div>
        </>
    );
}

export default CallbackDashboard;