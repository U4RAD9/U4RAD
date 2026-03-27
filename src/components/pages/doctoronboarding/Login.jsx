// import React, { useState } from "react";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const users = [
//     {
//       email: "coordinator@u4rad.com",
//       password: "123",
//       role: "coordinator"
//     },
//     {
//       email: "super@u4rad.com",
//       password: "123",
//       role: "supercoordinator"
//     }
//   ];

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       alert("Invalid credentials");
//       return;
//     }

//     localStorage.setItem("role", user.role);

//     if (user.role === "coordinator") {
//       window.location.href = "/coordinator-dashboard";
//     } else {
//       alert("Supercoordinator dashboard coming later");
//     }
//   };

//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "#f5f5f5"
//     }}>

//       <form
//         onSubmit={handleLogin}
//         style={{
//           width: "350px",
//           padding: "30px",
//           background: "white",
//           borderRadius: "10px",
//           boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
//         }}
//       >

//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           Coordinator Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px"
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "20px"
//           }}
//         />

//         <button
//           style={{
//             width: "100%",
//             padding: "12px",
//             background: "#2563eb",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             fontWeight: "bold"
//           }}
//         >
//           Login
//         </button>

//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { BASE_URL } from "../../apiconnector";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // STEP 1: Normal login
      let res = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: email, password }),
      });

      let data = await res.json();

      if (res.ok) {
        localStorage.setItem("role", data.group);
        localStorage.setItem("username", data.username);
        navigate(data.dashboard);
        return;
      }

      // STEP 2: Radiologist login
      res = await fetch(`${BASE_URL}/radiologist/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("role", "radiologist");
      localStorage.setItem("username", data.first_name);
      localStorage.setItem("stage2status", data.stage2status);
      localStorage.setItem("user_id", data.user_id);
      navigate("/doctor-dashboard");

    } catch (err) {
      console.log(err);
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  // ── Theme ──────────────────────────────────────────────────────
  const t = isDark ? {
    pageBg:       "#0f0f0f",
    cardBg:       "#1a1a1a",
    cardBorder:   "#2a2a2a",
    cardShadow:   "0 4px 28px rgba(0,0,0,0.6)",
    navBg:        "#111111",
    titleColor:   "#ffffff",
    subtitleColor:"#888888",
    inputBg:      "#222222",
    inputBorder:  "#333333",
    inputText:    "#e0e0e0",
    inputPlaceholder: "#555555",
    labelColor:   "#aaaaaa",
    errorBg:      "rgba(192,0,0,0.12)",
    errorBorder:  "rgba(192,0,0,0.3)",
    errorText:    "#ff6b6b",
    toggleBg:     "#222222",
    toggleBorder: "#444444",
    toggleColor:  "#cccccc",
    eyeColor:     "#666666",
    footerText:   "#444444",
  } : {
    pageBg:       "#f2f2f2",
    cardBg:       "#ffffff",
    cardBorder:   "#e2e2e2",
    cardShadow:   "0 2px 16px rgba(0,0,0,0.08)",
    navBg:        "#ffffff",
    titleColor:   "#111111",
    subtitleColor:"#888888",
    inputBg:      "#fafafa",
    inputBorder:  "#e0e0e0",
    inputText:    "#111111",
    inputPlaceholder: "#aaaaaa",
    labelColor:   "#555555",
    errorBg:      "rgba(192,0,0,0.06)",
    errorBorder:  "rgba(192,0,0,0.2)",
    errorText:    "#c00000",
    toggleBg:     "#333333",
    toggleBorder: "#555555",
    toggleColor:  "#ffffff",
    eyeColor:     "#999999",
    footerText:   "#cccccc",
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    backgroundColor: t.inputBg,
    border: `1px solid ${t.inputBorder}`,
    borderRadius: "7px",
    color: t.inputText,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: t.pageBg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
      padding: "20px",
    }}>

      {/* Theme Toggle — top right */}
      <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            backgroundColor: t.toggleBg,
            color: t.toggleColor,
            border: `1px solid ${t.toggleBorder}`,
            padding: "6px 16px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
            transition: "all 0.25s",
          }}
        >
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: "12px",
        boxShadow: t.cardShadow,
        overflow: "hidden",
        transition: "background-color 0.3s, border 0.3s",
      }}>

        {/* Card Top Accent */}
        <div style={{ height: "4px", backgroundColor: "#c00000" }} />

        <div style={{ padding: "36px 32px 32px" }}>

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <img
              src="https://u4rad.com/static/media/Logo.c9920d154c922ea9e355.png"
              alt="U4RAD Logo"
              style={{
                height: "44px",
                backgroundColor: isDark ? "#ffffff" : "transparent",
                borderRadius: "6px",
                padding: isDark ? "4px 10px" : "0",
                transition: "background-color 0.3s, padding 0.3s",
              }}
            />
          </div>

          {/* Title */}
          <h2 style={{
            textAlign: "center",
            color: t.titleColor,
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 6px",
            fontFamily: "Georgia, serif",
          }}>
            Dashboard Login
          </h2>
          <p style={{
            textAlign: "center",
            color: t.subtitleColor,
            fontSize: "13px",
            margin: "0 0 28px",
          }}>
            Secure Access to Radiology Reporting
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", color: t.labelColor, fontSize: "12px", fontWeight: "600", marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Email / Medical ID
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#c00000"}
                onBlur={e => e.target.style.borderColor = t.inputBorder}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", color: t.labelColor, fontSize: "12px", fontWeight: "600", marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: "42px" }}
                  onFocus={e => e.target.style.borderColor = "#c00000"}
                  onBlur={e => e.target.style.borderColor = t.inputBorder}
                />
                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: t.eyeColor,
                    padding: "0",
                    fontSize: "16px",
                    lineHeight: 1,
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                backgroundColor: t.errorBg,
                border: `1px solid ${t.errorBorder}`,
                borderRadius: "7px",
                padding: "10px 14px",
                color: t.errorText,
                fontSize: "13px",
                textAlign: "center",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: loading ? "#999" : "#c00000",
                color: "#ffffff",
                border: "none",
                borderRadius: "7px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.5px",
                marginTop: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = "#a00000"; }}
              onMouseLeave={e => { if (!loading) e.target.style.backgroundColor = "#c00000"; }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: "24px",
        color: t.footerText,
        fontSize: "11px",
        letterSpacing: "1px",
      }}>
        © {new Date().getFullYear()} U4RAD · All rights reserved
      </p>

    </div>
  );
};

export default Login;