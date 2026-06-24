import React, { useEffect, useState } from "react";
import ViewFormModal from "../../../components/dashboard/ViewFormModal";
import RateListModal from "../../../components/dashboard/RateListModal";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

export default function CoordinatorDashboard(){

const [users,setUsers] = useState([]);
const [allUsers,setAllUsers] = useState([]); // 🔥 for search fix
const [selectedUser,setSelectedUser] = useState(null);
const [showForm,setShowForm] = useState(false);
const [showRate,setShowRate] = useState(false);
const [search,setSearch] = useState("");
const [isAuthorized, setIsAuthorized] = useState(true);
const [messages, setMessages] = useState({
    stage1: {},
    stage2: {}
});

const navigate = useNavigate();
const role = localStorage.getItem("role");

/* =========================
   FETCH DATA
========================= */

useEffect(()=>{
    refreshTable();
},[])

function refreshTable(){
    fetch(`${BASE_URL}/radiologists/full/`, {
        credentials: "include"
    })
    .then(async (res) => {

        if (res.status === 401 || res.status === 403) {
            setIsAuthorized(false);

            // 🔥 Optional: redirect immediately
            alert("Session expired. Please login again.");
            navigate("/login");

            return null;
        }

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        return res.json();
    })
    .then(data => {
        if (!data) return;

        if (Array.isArray(data)) {
            setUsers(data);
            setAllUsers(data);
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    })
    .catch(err => {
        console.error(err);
        setIsAuthorized(false);
    });
}
/* =========================
   SEARCH FIXED
========================= */

function searchUser(value){
    setSearch(value);

    if(value===""){
        setUsers(allUsers);
        return;
    }

    const filtered = allUsers.filter(user =>
        (`${user.first_name} ${user.last_name}`)
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setUsers(filtered);
}

/* =========================
   MODALS
========================= */

function openForm(user){
    setSelectedUser(user);
    setShowForm(true);
}

function openRate(user){
    setSelectedUser(user);
    setShowRate(true);
}

function handleMessageChange(stage, userId, value){
    setMessages(prev => ({
        ...prev,
        [stage]: {
            ...prev[stage],
            [userId]: value
        }
    }));
}

/* =========================
   STAGE 1 UPDATE
========================= */

function updateStage1(user,value){

   const message = messages.stage1[user.id] || "";

    fetch(`${BASE_URL}/update-stage1/${user.id}/`, {
         method:"POST",
         headers:{"Content-Type":"application/json"},
         credentials:"include", // 🔥 ADD THIS
         body:JSON.stringify({ 
            stage1:value,
            message: message
        })
      })
    .then(res=>res.json())
    .then(()=>{
        refreshTable();
    })
}

function updateStage2(user,value) {

    const message = messages.stage2[user.id] || "";

    fetch(`${BASE_URL}/update-stage2/${user.id}/`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include", // 🔥 ADD THIS
      body:JSON.stringify({ 
            stage2:value,
            message: message
        })
   })
    .then(res=>res.json())
    .then(()=>{
        refreshTable();
    })
}

function updateInstitution(user, value){

    fetch(
        `${BASE_URL}/update-institution/${user.id}/`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            credentials:"include",

            body:JSON.stringify({
                institution:value
            })
        }
    )
    .then(res=>res.json())
    .then(()=>{
        refreshTable();
    })
}

/* =========================
   SEND MAIL (ADDED)
========================= */

function sendConfirmationMail(user){
    fetch(`${BASE_URL}/send-confirmation-mail/${user.id}/`, {
        method:"POST"
    })
    .then(res=>res.json())
    .then(()=>{
        alert("Mail sent to " + user.email);
    })
    .catch(()=>alert("Error sending mail"));
}

/* =========================
   LOGOUT
========================= */

function logout(){
    localStorage.removeItem("role");
    navigate("/login");
}


if (!isAuthorized) {
    return <h2>Unauthorized. Please login.</h2>;
}

/* =========================
   UI
========================= */

return(

<div>

{/* ---------- NAVBAR ---------- */}

<div className="navbar-container">

<div className="navbar-left">
<h3>U4RAD | Coordinator</h3>
</div>

<div className="navbar-right">

<button className="dashboard-btn" onClick={()=>navigate("/client-dashboard")}>
Client Onboarding Dashboard
</button>

<button className="dashboard-btn" onClick={()=>navigate("/contact-dashboard")}>
Contact Us Dashboard
</button>

{/* <button className="dashboard-btn" onClick={()=>navigate("/service-dashboard")}>
Service Dashboard
</button> */}

<button className="dashboard-btn" onClick={()=>navigate("/callback-dashboard")}>
Toggle to Callback Page
</button>

{/* <button className="dashboard-btn" onClick={()=>navigate("/customer-dashboard")}>
Customer's Dashboard
</button> */}

<button className="dashboard-btn" onClick={logout}>
Logout
</button>

</div>

</div>


{/* ---------- MAIN DASHBOARD ---------- */}

<div className="dashboard-wrapper">

<h1 className="dashboard-heading">Coordinator Dashboard</h1>

<hr/>

<div className="stats-bar">

<div>Total Entries: {users.length}</div>

<div>
Verified by Coordinator: {
users.filter(u=>u.stage1 === "verified_by_coordinator").length
}
</div>

<div>
Verified by Super Coordinator: {
users.filter(u=>u.stage2 === "verified_by_supercoordinator").length
}
</div>

</div>


<div className="dashboard-controls">

<button className="dashboard-btn" onClick={refreshTable}>
Refresh
</button>

<input
className="search-box"
placeholder="Search by Name"
value={search}
onChange={(e)=>searchUser(e.target.value)}
/>

</div>


<div className="table-wrapper">

<table className="dashboard-table">

<thead>
<tr>
<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
<th>Contact No</th>
<th>Form Details</th>
<th>Rate List Details</th>
<th>Rate List Status</th>
<th>Institution</th>
<th>Stage 1 Status</th>
<th>Stage 2 Status</th>
<th>Send Mail</th>
</tr>
</thead>

<tbody>

{users.map(user=>(

<tr key={user.id}>

<td>{user.first_name}</td>
<td>{user.last_name}</td>
<td>{user.email}</td>
<td>{user.contact}</td>

<td>
<button className="dashboard-btn" onClick={()=>openForm(user)}>
View Complete Form
</button>
</td>

<td>
<button className="dashboard-btn" onClick={()=>openRate(user)}>
Rate List Details
</button>
</td>

<td>{user.rateListStatus}</td>

<td>

<select
    value={user.institution || ""}
    onChange={(e)=>
        updateInstitution(user, e.target.value)
    }
>

    <option value="">
        Select Institution
    </option>

    <option value="AIIMS">
        AIIMS
    </option>

    <option value="PGI">
        PGI
    </option>

    <option value="Premium Institution">
        Premium Institution
    </option>

    <option value="Other Institution">
        Other Institution
    </option>

</select>

</td>

<td>
    <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>

        <select
            value={user.stage1}
            onChange={(e)=>updateStage1(user,e.target.value)}
            disabled={!(role === "Coordinator1" || role === "SuperCoordinator2")}
        >
            <option value="applied">Applied</option>
            <option value="under_progress">Under Progress</option>
            <option value="verified_by_coordinator">Verified by Coordinator</option>
            <option value="verification_failed">Verification Failed</option>
        </select>

        <input
            type="text"
            placeholder="Enter message..."
            value={
               messages.stage1[user.id] !== undefined
                  ? messages.stage1[user.id]
                  : user.stage1_message || ""
            }
            onChange={(e)=>handleMessageChange("stage1", user.id, e.target.value)}
            style={{padding:"5px"}}
            disabled={!(role === "Coordinator1" || role === "SuperCoordinator2")}
         />

    </div>
</td>

<td>
    <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>

        <select
            value={user.stage2}
            onChange={(e)=>updateStage2(user,e.target.value)}
            disabled={role !== "SuperCoordinator2"}
        >
            <option value="applied">Applied</option>
            <option value="under_progress">Under Progress</option>
            <option value="verified_by_supercoordinator">Verified by Supercoordinator</option>
            <option value="verification_failed">Verification Failed</option>
        </select>

        <input
            type="text"
            placeholder="Enter message..."
            value={
               messages.stage2[user.id] !== undefined
                  ? messages.stage2[user.id]
                  : user.stage2_message || ""
            }
            onChange={(e)=>handleMessageChange("stage2", user.id, e.target.value)}
            style={{padding:"5px"}}
            disabled={role !== "SuperCoordinator2"}
         />

    </div>
</td>

<td>
<button
  className="dashboard-btn"
  onClick={()=>sendConfirmationMail(user)}
  disabled={role === "Coordinator1"}
>
  Send Mail
</button>
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>


{/* ---------- MODALS ---------- */}

{showForm && (
<ViewFormModal
user={selectedUser}
closeModal={()=>setShowForm(false)}
/>
)}

{showRate && (
<RateListModal
user={selectedUser}
closeModal={()=>setShowRate(false)}
/>
)}

</div>

)
}