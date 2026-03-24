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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const users = [
  //   { email: "coordinator@u4rad.com", password: "123", role: "coordinator" },
  //   { email: "super@u4rad.com", password: "123", role: "supercoordinator" }
  // ];

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: email,   // ⚠️ your API expects username, not email
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Store role (IMPORTANT for navigation)
      localStorage.setItem("role", data.group);

      // ✅ Optional: store user info
      localStorage.setItem("username", data.username);

      // ✅ Redirect dynamically (BEST PRACTICE)
      window.location.href = data.dashboard;

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
      <form onSubmit={handleLogin} style={{ width: "350px", padding: "30px", background: "white", borderRadius: "10px", boxShadow: "0 5px 20px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "15px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "20px" }} />
        <button style={{ width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;