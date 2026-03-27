import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RadiologistDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const firstName = localStorage.getItem("username") || "User";
  const stage2status = localStorage.getItem("stage2status") || "applied";
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToRateList = () => {
    if (!userId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }
    navigate(`/rate-list/${userId}`);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>

      {/* Navbar */}
      <div style={{ ...styles.navbar, backgroundColor: theme.navBg, borderBottom: "2px solid #dc2626" }}>
        <img
        src="https://u4rad.com/static/media/Logo.c9920d154c922ea9e355.png"
        alt="U4RAD Logo"
        style={{
            ...styles.logo,
            backgroundColor: isDark ? "#ffffff" : "transparent",
            borderRadius: "6px",
            padding: isDark ? "4px 8px" : "0",
            transition: "background-color 0.3s, padding 0.3s",
        }}
        />

        <div style={styles.navRight}>
          {/* Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            style={{ ...styles.toggleBtn, backgroundColor: theme.toggleBg, color: theme.toggleText }}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          {stage2status === "verified_by_supercoordinator"
            ? "Registration Approved"
            : stage2status === "verification_failed"
            ? "Verification Failed"
            : "Registration Pending"}
        </h1>

        <p style={{ ...styles.name, color: theme.text }}>Hello {firstName}</p>

        <p style={{ ...styles.text, color: theme.subText }}>
          Your registration status is <b style={{ color: theme.text }}>{stage2status}</b>. Please check back later.
        </p>

        <p style={{ ...styles.text, color: theme.subText }}>
          You can reach out to the Rate List Section using this link.
        </p>

        <button style={styles.button} onClick={goToRateList}>
          Rate List Page
        </button>
      </div>
    </div>
  );
};

/* ── Theme Definitions ── */
const lightTheme = {
  bg: "#f5f5f5",
  navBg: "#ffffff",
  text: "#111111",
  subText: "#444444",
  toggleBg: "#e5e7eb",
  toggleText: "#111111",
};

const darkTheme = {
  bg: "#111111",
  navBg: "#000000",
  text: "#ffffff",
  subText: "#cccccc",
  toggleBg: "#374151",
  toggleText: "#ffffff",
};

/* ── Static Styles (theme-independent) ── */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "background-color 0.3s, color 0.3s",
  },
  navbar: {
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.3s",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    height: "40px",        // fixed size; color untouched
  },
  toggleBtn: {
    border: "1px solid #dc2626",
    padding: "7px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s, color 0.3s",
  },
  logoutBtn: {
    backgroundColor: "#dc2626",
    border: "none",
    padding: "8px 16px",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "15px",
    color: "#dc2626",      // always red, unaffected by theme
  },
  name: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default RadiologistDashboard;