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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    { email: "coordinator@u4rad.com", password: "123", role: "coordinator" },
    { email: "super@u4rad.com", password: "123", role: "supercoordinator" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("role", user.role);

    if (user.role === "coordinator") {
      window.location.href = "/coordinator-dashboard";
    } else if (user.role === "supercoordinator") {
      // Redirects to the new Super Coordinator tab/route
      window.location.href = "/super-coordinator-dashboard";
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