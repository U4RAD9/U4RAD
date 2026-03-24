import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

function CustomerDashboard() {
    const [customers, setCustomers] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    function fetchCustomers() {
        fetch(`${BASE_URL}/get-customers/`)
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(err => console.log(err));
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

    function handleUploadFile(customerId) {
        // Trigger file upload for specific customer
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("customer_id", customerId);
            fetch(`${BASE_URL}/upload-file/${customerId}/`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(() => fetchCustomers())
                .catch(err => console.log(err));
        };
        input.click();
    }

    function deleteCustomer(id) {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;
        fetch(`${BASE_URL}/delete-customer/${id}/`, { method: "DELETE" })
            .then(() => fetchCustomers())
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

        deleteBg:      d ? "rgba(220,38,38,0.08)"   : "rgba(220,38,38,0.06)",
        deleteBorder:  d ? "rgba(220,38,38,0.22)"   : "rgba(220,38,38,0.18)",
        deleteHover:   d ? "rgba(220,38,38,0.18)"   : "rgba(220,38,38,0.13)",

        actionBg:      d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.04)",
        actionBorder:  d ? "rgba(255,255,255,0.12)"  : "rgba(0,0,0,0.12)",
        actionColor:   d ? "#c0c0c0"                 : "#444444",
        actionHoverBg: d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.08)",

        uploadBg:      d ? "rgba(255,255,255,0.04)"  : "rgba(0,0,0,0.04)",
        uploadBorder:  d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)",
        uploadColor:   d ? "#a0a0a0"                 : "#555555",
        uploadHoverBg: d ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.07)",

        backBg:        d ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.05)",
        backBorder:    d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.11)",
        backColor:     d ? "#888888"                 : "#666666",
        backHoverBg:   d ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",

        themeBtnBg:    d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.06)",
        themeBtnBorder:d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
        themeBtnColor: d ? "#b0b0b0"                 : "#555555",

        orgPillBg:     d ? "rgba(255,255,255,0.06)"  : "rgba(0,0,0,0.05)",
        orgPillBorder: d ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)",
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

        /* Header */
        .cd-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 36px; padding-bottom: 22px;
            border-bottom: 1px solid ${t.borderMain};
        }
        .cd-header-left  { display: flex; align-items: center; gap: 16px; }
        .cd-header-right { display: flex; align-items: center; gap: 10px; }

        .cd-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: ${t.textPrimary}; }
        .cd-title span { color: ${t.accent}; }

        .cd-title-bar {
            width: 4px; height: 26px;
            background: ${t.accent}; border-radius: 2px; flex-shrink: 0;
        }

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

        /* Table section */
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

        /* Scrollable table wrapper for many columns */
        .cd-table-scroll { overflow-x: auto; }

        table.cd-table { width: 100%; border-collapse: collapse; min-width: 900px; }
        .cd-table thead th {
            padding: 12px 20px; font-size: 10.5px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.9px;
            color: ${t.textTh}; background: ${t.theadBg}; text-align: left;
            white-space: nowrap;
        }
        .cd-table tbody tr {
            border-top: 1px solid ${t.borderRow}; transition: background 0.15s;
        }
        .cd-table tbody tr:hover { background: ${t.rowHover}; }
        .cd-table tbody td {
            padding: 14px 20px; font-size: 14px;
            color: ${t.textSecondary}; vertical-align: middle;
        }

        /* User cell with avatar */
        .cd-user-cell { display: flex; align-items: center; gap: 10px; }
        .cd-avatar {
            width: 34px; height: 34px; border-radius: 50%;
            background: rgba(220,38,38,0.12);
            border: 1px solid rgba(220,38,38,0.22);
            display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 700; color: ${t.accent};
            flex-shrink: 0; text-transform: uppercase;
        }
        .cd-user-name { font-weight: 600; color: ${t.textPrimary}; }

        .cd-email-cell {
            font-family: 'DM Mono', monospace; font-size: 12px;
            color: ${t.textMuted} !important; white-space: nowrap;
        }

        .cd-address-cell {
            font-size: 13px; color: ${t.textSecondary} !important;
            max-width: 160px; white-space: nowrap;
            overflow: hidden; text-overflow: ellipsis;
        }

        .cd-org-pill {
            display: inline-flex; align-items: center;
            padding: 3px 10px; border-radius: 20px;
            background: ${t.orgPillBg}; border: 1px solid ${t.orgPillBorder};
            font-size: 12.5px; font-weight: 500; color: ${t.textSecondary};
            white-space: nowrap;
        }

        /* Action buttons */
        .cd-actions { display: flex; align-items: center; gap: 7px; flex-wrap: nowrap; }

        .cd-icon-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 12px;
            background: ${t.actionBg}; border: 1px solid ${t.actionBorder};
            border-radius: 6px; color: ${t.actionColor};
            font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
            cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .cd-icon-btn:hover {
            background: ${t.actionHoverBg}; color: ${t.textPrimary};
            border-color: ${d ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
        }

        .cd-upload-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 12px;
            background: ${t.uploadBg}; border: 1px solid ${t.uploadBorder};
            border-radius: 6px; color: ${t.uploadColor};
            font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
            cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .cd-upload-btn:hover {
            background: ${t.uploadHoverBg}; color: ${t.textPrimary};
            border-color: ${t.accent};
        }

        .cd-delete-btn {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 6px 12px;
            background: ${t.deleteBg}; border: 1px solid ${t.deleteBorder};
            border-radius: 6px; color: ${t.accent};
            font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
            cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .cd-delete-btn:hover {
            background: ${t.deleteHover};
            box-shadow: 0 2px 12px ${t.accentGlow};
        }

        /* Empty state */
        .cd-empty {
            text-align: center; padding: 56px 24px;
            color: ${t.textMuted}; font-size: 14px;
        }
        .cd-empty-icon { font-size: 34px; margin-bottom: 12px; opacity: 0.3; }
    `;

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

            <div className="cd-wrapper">

                {/* ── Header ── */}
                <div className="cd-header">
                    <div className="cd-header-left">
                        <button className="cd-back-btn" onClick={goBack}>
                            ← Back
                        </button>
                        <div className="cd-title-bar" />
                        <h1 className="cd-title">Customer's <span>Dashboard</span></h1>
                    </div>
                    <div className="cd-header-right">
                        <button className="cd-theme-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="cd-table-section">
                    <div className="cd-table-header">
                        <span className="cd-table-heading">All Customers</span>
                        <span className="cd-count-badge">{customers.length}</span>
                    </div>

                    <div className="cd-table-scroll">
                        <table className="cd-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Organization</th>
                                    <th>Upload File</th>
                                    <th>Invoices</th>
                                    <th>Files</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">
                                            <div className="cd-empty">
                                                <div className="cd-empty-icon">👥</div>
                                                No customers found.
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map(customer => (
                                        <tr key={customer.id}>

                                            {/* User */}
                                            <td>
                                                <div className="cd-user-cell">
                                                    <div className="cd-avatar">{getInitials(customer.user)}</div>
                                                    <span className="cd-user-name">{customer.user}</span>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="cd-email-cell">{customer.email}</td>

                                            {/* Address */}
                                            <td className="cd-address-cell" title={customer.address}>
                                                {customer.address || "—"}
                                            </td>

                                            {/* Organization */}
                                            <td>
                                                {customer.organization
                                                    ? <span className="cd-org-pill">🏢 {customer.organization}</span>
                                                    : <span style={{ color: t.textMuted }}>—</span>
                                                }
                                            </td>

                                            {/* Upload File */}
                                            <td>
                                                <button
                                                    className="cd-upload-btn"
                                                    onClick={() => handleUploadFile(customer.id)}
                                                >
                                                    📎 Upload
                                                </button>
                                            </td>

                                            {/* Invoices */}
                                            <td>
                                                <button
                                                    className="cd-icon-btn"
                                                    onClick={() => navigate(`/customer/${customer.id}/invoices`)}
                                                >
                                                    🧾 Invoices
                                                </button>
                                            </td>

                                            {/* Files */}
                                            <td>
                                                <button
                                                    className="cd-icon-btn"
                                                    onClick={() => navigate(`/customer/${customer.id}/files`)}
                                                >
                                                    📁 Files
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td>
                                                <div className="cd-actions">
                                                    <button
                                                        className="cd-icon-btn"
                                                        onClick={() => navigate(`/customer/${customer.id}/edit`)}
                                                    >
                                                        ✏ Edit
                                                    </button>
                                                    <button
                                                        className="cd-delete-btn"
                                                        onClick={() => deleteCustomer(customer.id)}
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

            </div>
        </>
    );
}

export default CustomerDashboard;