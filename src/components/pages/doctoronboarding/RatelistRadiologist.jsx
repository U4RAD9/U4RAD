import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

const RateList = () => {
  const { id } = useParams();

  const [radiologist, setRadiologist] = useState(null);
  const [rateList, setRateList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);  // ✅ Light mode by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-rate-list/${id}/`);
        const data = await response.json();
        setRadiologist(data.radiologist);
        setRateList(data.rate_list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getCSRFToken = () =>
    document.cookie.split("; ").find((r) => r.startsWith("csrftoken"))?.split("=")[1];

  const updateStatus = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/update_status_rate_list/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRFToken() },
        body: JSON.stringify({ rate_list_id: rateList.id, status }),
      });
      const data = await response.json();
      if (data.success) { window.location.href = "/login"; }
      else { alert("Error updating status."); }
    } catch (e) { alert("Something went wrong."); }
  };

  const handleAgree = () => {
    if (window.confirm("Are you sure you want to agree to these rates?")) {
      alert("Thank you for your confirmation. You will be now redirected to the login page.");
      updateStatus("Radiologist Agreed to the Rates");
    }
  };

  const handleDisagree = () => {
    alert("You've disagreed to the Rate List.\nOur team will give you a call shortly.\nClick OK to go to the login page.");
    updateStatus("Radiologist Disagreed to the Rates");
  };

  // ── Theme ──────────────────────────────────────────────────────
  const t = darkMode ? {
    pageBg:      "#0f0f0f",
    cardBg:      "#1a1a1a",
    cardBorder:  "#2a2a2a",
    cardShadow:  "0 4px 28px rgba(0,0,0,0.6)",
    navBg:       "#ffffff",
    navBorder:   "#c00000",
    headerBg:    "#1a1a1a",
    headerBorderBottom: "3px solid #c00000",
    headerTitle: "#ffffff",
    headerSub:   "#c00000",
    thBg:        "#222222",
    thText:      "#aaaaaa",
    thBorder:    "#2e2e2e",
    rowEven:     "#1a1a1a",
    rowOdd:      "#161616",
    rowHover:    "#222222",
    cellText:    "#e0e0e0",
    cellBorder:  "#252525",
    labelText:   "#666666",
    rateColor:   "#e05555",
    notesBg:     "#1e1e1e",
    notesBorder: "#2a2a2a",
    notesText:   "#666",
    divider:     "#222",
    footerText:  "#444",
    accentRed:   "#c00000",
    agreeBtn:    { bg: "transparent", color: "#c00000", border: "2px solid #c00000",
                   hoverBg: "#c00000", hoverColor: "#fff" },
    disagreeBtn: { bg: "#c00000", color: "#fff", border: "2px solid #c00000",
                   hoverBg: "#a00000" },
    toggleBg:    "#222",
    toggleBorder:"#444",
    toggleColor: "#ccc",
    backBtnBg:   "#c00000",
    backBtnColor:"#fff",
  } : {
    pageBg:      "#f2f2f2",
    cardBg:      "#ffffff",
    cardBorder:  "#e2e2e2",
    cardShadow:  "0 2px 16px rgba(0,0,0,0.08)",
    navBg:       "#ffffff",
    navBorder:   "#c00000",
    headerBg:    "#ffffff",
    headerBorderBottom: "3px solid #c00000",
    headerTitle: "#111111",
    headerSub:   "#c00000",
    thBg:        "#f7f7f7",
    thText:      "#555555",
    thBorder:    "#e0e0e0",
    rowEven:     "#ffffff",
    rowOdd:      "#fafafa",
    rowHover:    "#fff5f5",
    cellText:    "#222222",
    cellBorder:  "#ebebeb",
    labelText:   "#999999",
    rateColor:   "#b00000",
    notesBg:     "#fffdf5",
    notesBorder: "#ece8d8",
    notesText:   "#888",
    divider:     "#ececec",
    footerText:  "#ccc",
    accentRed:   "#c00000",
    agreeBtn:    { bg: "transparent", color: "#c00000", border: "2px solid #c00000",
                   hoverBg: "#c00000", hoverColor: "#fff" },
    disagreeBtn: { bg: "#c00000", color: "#fff", border: "2px solid #c00000",
                   hoverBg: "#900000" },
    toggleBg:    "#333",
    toggleBorder:"#555",
    toggleColor: "#fff",
    backBtnBg:   "#c00000",
    backBtnColor:"#fff",
  };

  const rows = rateList ? [
    { label: "MRI",   type: "Head/Brain/Chest/Abdomen/Pelvis/PNS/Face",             key: "mri1"  },
    { label: "MRI",   type: "MRI Screening (per body parts)",                        key: "mri2"  },
    { label: "MRI",   type: "MSK",                                                   key: "mri3"  },
    { label: "MRI",   type: "Whole Abdomen",                                         key: "mri4"  },
    { label: "MRI",   type: "Special Cases (ex. Neurography, Defacography, Breast)", key: "mri5"  },
    { label: "MRI",   type: "MRI Angiography (per body parts)",                      key: "mri6"  },
    { label: "CT",    type: "Head/Brain/PNS/Face/Orbit",                             key: "ct1"   },
    { label: "CT",    type: "NCCT Spine",                                            key: "ct2"   },
    { label: "CT",    type: "HRCT Chest/KUB",                                        key: "ct3"   },
    { label: "CT",    type: "Abdomen/Pelvis/Neck",                                   key: "ct4"   },
    { label: "CT",    type: "Whole Abdomen",                                         key: "ct5"   },
    { label: "CT",    type: "CT Angiography (per body parts)",                       key: "ct6"   },
    { label: "CT",    type: "Cardiac Angiography",                                   key: "ct7"   },
    { label: "X-Ray", type: "Per Exposure - any body parts",                         key: "xray1" },
    { label: "X-Ray", type: "Special Procedure - Barium/IVP/HSG",                   key: "xray2" },
  ] : [];

  const showButtons = radiologist &&
    (radiologist.stage2status === "applied" || radiologist.stage2status === "under_progress");

  const cell = (extra = {}) => ({
    border: `1px solid ${t.cellBorder}`,
    padding: "10px 14px",
    color: t.cellText,
    fontSize: "13.5px",
    verticalAlign: "middle",
    backgroundColor: "inherit",
    ...extra,
  });

  // ── Loading ───────────────────────────────────────────────────
  if (loading) return (
    <div style={{
      backgroundColor: darkMode ? "#0f0f0f" : "#f2f2f2",
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "36px", height: "36px",
          border: "3px solid #c00000",
          borderTop: "3px solid transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 14px",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#c00000", fontSize: "14px", letterSpacing: "2px", margin: 0 }}>
          LOADING...
        </p>
      </div>
    </div>
  );

  if (!radiologist || !rateList) return (
    <div style={{
      backgroundColor: darkMode ? "#0f0f0f" : "#f2f2f2",
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <p style={{ color: "#999", fontSize: "15px" }}>No data found.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: t.pageBg, minHeight: "100vh", transition: "background 0.25s" }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: t.navBg,
        borderBottom: `2px solid ${t.navBorder}`,
        padding: "12px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}>

        {/* ✅ Logo image — completely unaffected by dark/light mode */}
        <img
          src="https://u4rad.com/static/media/Logo.c9920d154c922ea9e355.png"
          alt="U4RAD Logo"
          style={{
            height: "38px",
            display: "block",
            backgroundColor: darkMode ? "#ffffff" : "transparent", // unchanged — still correct
            borderRadius: "6px",
            padding: darkMode ? "4px 8px" : "0",
            transition: "background-color 0.3s, padding 0.3s",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* ✅ Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              backgroundColor: t.toggleBg,
              color: t.toggleColor,
              border: `1px solid ${t.toggleBorder}`,
              padding: "5px 14px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.3px",
              transition: "all 0.25s",
            }}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <a href="/login" style={{ textDecoration: "none" }}>
            <button style={{
              backgroundColor: t.backBtnBg,
              color: t.backBtnColor,
              border: "none",
              padding: "7px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "13px",
            }}>
              ← Back to Login
            </button>
          </a>
        </div>
      </div>

      {/* ── Page Body ──────────────────────────────────────────── */}
      <div style={{ padding: "36px 16px 60px" }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: t.cardBg,
          borderRadius: "10px",
          border: `1px solid ${t.cardBorder}`,
          overflow: "hidden",
          boxShadow: t.cardShadow,
          transition: "background 0.25s, border 0.25s",
        }}>

          {/* Card Header */}
          <div style={{
            backgroundColor: t.headerBg,
            borderBottom: t.headerBorderBottom,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <h2 style={{
                color: t.headerTitle,
                margin: 0,
                fontSize: "17px",
                fontWeight: "700",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.3px",
              }}>
                Rate List
              </h2>
              <p style={{
                color: t.headerSub,
                margin: "5px 0 0",
                fontSize: "14px",
                fontWeight: "600",
              }}>
                {radiologist.first_name} {radiologist.last_name}
              </p>
            </div>
          </div>

          {/* Table */}
          <div style={{ padding: "24px 24px 0" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
                <thead>
                  <tr style={{ backgroundColor: t.thBg }}>
                    {["#", "Modality", "Case Type", "Doctor Rate"].map((h) => (
                      <th key={h} style={{
                        border: `1px solid ${t.thBorder}`,
                        padding: "11px 14px",
                        color: t.thText,
                        fontWeight: "700",
                        textAlign: "left",
                        fontSize: "11px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        backgroundColor: t.thBg,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      style={{ backgroundColor: i % 2 === 0 ? t.rowEven : t.rowOdd, transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = t.rowHover}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? t.rowEven : t.rowOdd}
                    >
                      <td style={cell({ color: t.labelText, width: "36px" })}>{i + 1}.</td>

                      <td style={cell({ whiteSpace: "nowrap" })}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 9px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "700",
                          letterSpacing: "0.5px",
                          ...(row.label === "MRI"
                            ? { backgroundColor: darkMode ? "#2a0000" : "#fff0f0", color: "#c00000" }
                            : row.label === "CT"
                            ? { backgroundColor: darkMode ? "#001428" : "#eef4ff", color: darkMode ? "#5599ee" : "#2255bb" }
                            : { backgroundColor: darkMode ? "#0a180a" : "#f0fff0", color: darkMode ? "#55aa55" : "#226622" }),
                        }}>
                          {row.label}
                        </span>
                      </td>

                      <td style={cell()}>{row.type}</td>

                      <td style={cell({ whiteSpace: "nowrap" })}>
                        <span style={{ color: t.rateColor, fontWeight: "700", fontSize: "14px" }}>
                          ₹ {rateList[row.key]}
                        </span>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan={4} style={{
                      backgroundColor: t.notesBg,
                      border: `1px solid ${t.notesBorder}`,
                      padding: "11px 16px",
                      textAlign: "center",
                      color: t.notesText,
                      fontStyle: "italic",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}>
                      Note: One Sunday and 5 Night on a call to be performed.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ borderTop: `1px solid ${t.divider}`, margin: "24px 0 20px" }} />

            {showButtons && (
              <>
                <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginBottom: "12px" }}>
                  <button
                    onClick={handleAgree}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = t.agreeBtn.hoverBg;
                      e.currentTarget.style.color = t.agreeBtn.hoverColor;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = t.agreeBtn.bg;
                      e.currentTarget.style.color = t.agreeBtn.color;
                    }}
                    style={{
                      backgroundColor: t.agreeBtn.bg,
                      color: t.agreeBtn.color,
                      border: t.agreeBtn.border,
                      padding: "10px 30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    ✓ I Agree
                  </button>
                  <button
                    onClick={handleDisagree}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = t.disagreeBtn.hoverBg}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = t.disagreeBtn.bg}
                    style={{
                      backgroundColor: t.disagreeBtn.bg,
                      color: t.disagreeBtn.color,
                      border: t.disagreeBtn.border,
                      padding: "10px 30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    ✗ I Disagree
                  </button>
                </div>
                <p style={{ textAlign: "center", color: t.labelText, fontSize: "12px", marginBottom: "12px" }}>
                  After choosing any option you will be redirected to the login page automatically.
                </p>
              </>
            )}

            <p style={{ textAlign: "center", color: t.labelText, fontSize: "13px", marginBottom: "6px" }}>
              For any doubts regarding the Rate List, email us at{" "}
              <a href="mailto:contact@u4rad.com"
                style={{ color: t.accentRed, fontWeight: "600", textDecoration: "none" }}>
                contact@u4rad.com
              </a>
            </p>
            <p style={{
              textAlign: "center",
              color: t.accentRed,
              fontWeight: "700",
              fontSize: "14px",
              letterSpacing: "1px",
              marginBottom: "28px",
            }}>
              THANK YOU!
            </p>
          </div>
        </div>

        <p style={{
          textAlign: "center",
          color: t.footerText,
          marginTop: "24px",
          fontSize: "11px",
          letterSpacing: "1px",
        }}>
          © {new Date().getFullYear()} U4RAD · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default RateList;