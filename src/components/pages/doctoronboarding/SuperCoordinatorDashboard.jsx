// import React, { useEffect, useState } from "react";
// import ViewFormModal from "../../components/dashboard/ViewFormModal";
// import RateListModal from "../../components/dashboard/RateListModal";
// import "./dashboard.css";

// export default function SuperCoordinatorDashboard(){

// const [users,setUsers] = useState([]);
// const [selectedUser,setSelectedUser] = useState(null);
// const [showForm,setShowForm] = useState(false);
// const [showRate,setShowRate] = useState(false);
// const [search,setSearch] = useState("");

// const [activePage,setActivePage] = useState("radiologist");


// /* =========================
//    API CALL FOR RADIOLOGISTS
//    ========================= */

// useEffect(()=>{

// fetch("PASTE_RADIOLOGIST_API_HERE")
// .then(res=>res.json())
// .then(data=>{
// setUsers(data)
// })
// .catch(err=>console.log(err))

// },[])


// /* =========================
//    REFRESH TABLE FROM API
//    ========================= */

// function refreshTable(){

// fetch("PASTE_RADIOLOGIST_API_HERE")
// .then(res=>res.json())
// .then(data=>{
// setUsers(data)
// })

// }


// function searchUser(value){

// setSearch(value)

// const filtered = users.filter(user =>
// (`${user.first_name} ${user.last_name}`)
// .toLowerCase()
// .includes(value.toLowerCase())
// )

// setUsers(filtered)

// }


// function openForm(user){
// setSelectedUser(user)
// setShowForm(true)
// }

// function openRate(user){
// setSelectedUser(user)
// setShowRate(true)
// }


// /* =========================
//    STAGE 2 UPDATE API
//    ========================= */

// function updateStage2(user,value){

// fetch(`PASTE_STAGE2_UPDATE_API/${user.id}/`,{

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({
// stage2:value
// })

// })

// .then(res=>res.json())
// .then(data=>{
// refreshTable()
// })

// }


// /* =========================
//    SEND CONFIRMATION MAIL
//    ========================= */

// function sendConfirmationMail(user){

// fetch(`PASTE_SEND_MAIL_API/${user.id}/`,{

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// }

// })

// .then(res=>res.json())
// .then(data=>{
// alert("Confirmation Mail Sent Successfully")
// })
// .catch(err=>{
// alert("Error sending mail")
// })

// }


// function logout(){
// window.location.href="/login"
// }


// function goBack(){
// setActivePage("radiologist")
// }



// return(

// <div>

// {/* ---------- NAVBAR ---------- */}

// <div className="navbar-container">

// <div className="navbar-left">
// <h3>U4RAD</h3>
// </div>

// <div className="navbar-right">

// <button
// className="dashboard-btn"
// onClick={()=>setActivePage("callback")}
// >
// Toggle to Callback Page
// </button>

// <button
// className="dashboard-btn"
// onClick={()=>setActivePage("customer")}
// >
// Customer's Dashboard
// </button>

// <button
// className="dashboard-btn"
// onClick={()=>setActivePage("services")}
// >
// Service Dashboard
// </button>

// <button
// className="dashboard-btn"
// onClick={logout}
// >
// Logout
// </button>

// </div>

// </div>



// {/* ---------- RADIOLOGIST DASHBOARD ---------- */}

// {activePage==="radiologist" && (

// <div className="dashboard-wrapper">

// <h1 className="dashboard-heading">
// Super Coordinator Dashboard
// </h1>

// <hr/>

// <div className="stats-bar">

// <div>Total Entries: {users.length}</div>

// <div>
// Verified by Coordinator: {
// users.filter(u=>u.stage1==="Verified by Coordinator").length
// }
// </div>

// <div>
// Verified by Super Coordinator: {
// users.filter(u=>u.stage2==="Verified by SuperCoordinator").length
// }
// </div>

// </div>


// <div className="dashboard-controls">

// <button className="dashboard-btn" onClick={refreshTable}>
// Refresh
// </button>

// <input
// className="search-box"
// placeholder="Search by Name"
// value={search}
// onChange={(e)=>searchUser(e.target.value)}
// />

// </div>


// <div className="table-wrapper">

// <table className="dashboard-table">

// <thead>

// <tr>
// <th>First Name</th>
// <th>Last Name</th>
// <th>Email</th>
// <th>Contact No</th>
// <th>Form Details</th>
// <th>Rate List Details</th>
// <th>Rate List Status</th>
// <th>Stage 1 Status</th>
// <th>Stage 2 Status</th>
// <th>Send Confirmation Mail</th>
// </tr>

// </thead>

// <tbody>

// {users.map(user=>(

// <tr key={user.id}>

// <td>{user.first_name}</td>
// <td>{user.last_name}</td>
// <td>{user.email}</td>
// <td>{user.contact}</td>

// <td>

// <button
// className="dashboard-btn"
// onClick={()=>openForm(user)}
// >
// View Complete Form
// </button>

// </td>

// <td>

// <button
// className="dashboard-btn"
// onClick={()=>openRate(user)}
// >
// Rate List Details
// </button>

// </td>

// <td>

// {user.rateListStatus}

// </td>


// {/* ---------- STAGE 1 ---------- */}

// <td>

// <select value={user.stage1} disabled>

// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by Coordinator</option>
// <option>Verification Failed</option>

// </select>

// </td>



// {/* ---------- STAGE 2 ---------- */}

// <td>

// <select
// value={user.stage2}
// onChange={(e)=>updateStage2(user,e.target.value)}
// >

// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by SuperCoordinator</option>
// <option>Verification Failed</option>

// </select>

// </td>



// {/* ---------- SEND MAIL ---------- */}

// <td>

// <button
// className="dashboard-btn"
// disabled={user.stage2 !== "Verified by SuperCoordinator"}
// onClick={()=>sendConfirmationMail(user)}
// >
// Send Confirmation Mail
// </button>

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// </div>

// )}



// {/* ---------- CALLBACK DASHBOARD ---------- */}

// {activePage==="callback" && (

// <div className="dashboard-wrapper">

// <button className="dashboard-btn" onClick={goBack}>
// ⬅ Back to Dashboard
// </button>

// <h1>Callback Form Dashboard</h1>

// <table className="dashboard-table">

// <thead>

// <tr>
// <th>Name</th>
// <th>Email</th>
// <th>Contact</th>
// <th>View Filled Form</th>
// </tr>

// </thead>

// <tbody>

// </tbody>

// </table>

// </div>

// )}



// {/* ---------- CUSTOMER DASHBOARD ---------- */}

// {activePage==="customer" && (

// <div className="dashboard-wrapper">

// <button className="dashboard-btn" onClick={goBack}>
// ⬅ Back to Dashboard
// </button>

// <h1>Customer's Dashboard</h1>

// <table className="dashboard-table">

// <thead>

// <tr>
// <th>User</th>
// <th>Email</th>
// <th>Address</th>
// <th>Organization</th>
// <th>Upload File</th>
// <th>Invoices</th>
// <th>Files</th>
// <th>Actions</th>
// </tr>

// </thead>

// <tbody>

// </tbody>

// </table>

// </div>

// )}



// {/* ---------- SERVICES DASHBOARD ---------- */}

// {activePage==="services" && (

// <div className="dashboard-wrapper">

// <button className="dashboard-btn" onClick={goBack}>
// ⬅ Back to Dashboard
// </button>

// <h1>Services</h1>

// <div>

// </div>

// </div>

// )}



// {showForm && (
// <ViewFormModal
// user={selectedUser}
// closeModal={()=>setShowForm(false)}
// />
// )}

// {showRate && (
// <RateListModal
// user={selectedUser}
// closeModal={()=>setShowRate(false)}
// />
// )}

// </div>

// )

// }




import React, { useEffect, useState } from "react";
import ViewFormModal from "../../../components/dashboard/ViewFormModal";
import RateListModal from "../../../components/dashboard/RateListModal";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";

export default function SuperCoordinatorDashboard(){

const [users,setUsers] = useState([]);
const [selectedUser,setSelectedUser] = useState(null);
const [showForm,setShowForm] = useState(false);
const [showRate,setShowRate] = useState(false);
const [search,setSearch] = useState("");
const [allUsers, setAllUsers] = useState([]); // 🔥 IMPORTANT
const [isAuthorized, setIsAuthorized] = useState(true);
const [messages, setMessages] = useState({
    stage1: {},
    stage2: {}
});

const navigate = useNavigate();

useEffect(()=>{
    refreshTable();
},[])

function refreshTable() {
    fetch(`${BASE_URL}/radiologists/full/`, {
        credentials: "include"
    })
    .then(async (res) => {

        // 🔥 HANDLE AUTH FAILURE
        if (res.status === 401 || res.status === 403) {
            setIsAuthorized(false);
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

        // 🔥 CRITICAL FIX
        if (Array.isArray(data)) {
            setUsers(data);
            setAllUsers(data); // for search
            setIsAuthorized(true);
        } else {
            console.error("Not array:", data);
            setUsers([]);
            setAllUsers([]);
            setIsAuthorized(false);
        }
    })
    .catch(err => {
        console.error("Fetch failed:", err);
        setUsers([]);
        setAllUsers([]);
        setIsAuthorized(false);
    });
}


function searchUser(value){
    setSearch(value);

    if (value === "") {
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

function openForm(user){
    setSelectedUser(user)
    setShowForm(true)
}

function openRate(user){
    setSelectedUser(user)
    setShowRate(true)
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

function updateStage1(user,value){
    const message = messages.stage1[user.id] || "";

    fetch(`${BASE_URL}/update-stage1/${user.id}/`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include", // 🔥 REQUIRED
        body:JSON.stringify({ 
            stage1:value,
            message: message
        })
    })
    .then(res=>res.json())
    .then(()=>{
        refreshTable()
    })
}

function updateStage2(user,value){
    const message = messages.stage2[user.id] || "";

    fetch(`${BASE_URL}/update-stage2/${user.id}/`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include", // 🔥 CRITICAL
        body:JSON.stringify({ 
            stage2:value,
            message: message
        })
    })
    .then(res=>res.json())
    .then(()=>{
        refreshTable()
    })
}

function sendConfirmationMail(user){
    fetch(`PASTE_EMAIL_API_HERE/${user.id}/`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(() => {
        alert("Confirmation email sent successfully to " + user.email);
    })
    .catch(() => alert("Error sending mail"));
}

function logout(){
    localStorage.removeItem("role");
    navigate("/login");
}

if (!isAuthorized) {
    return <h2>Unauthorized. Please login.</h2>;
}

return(
<div>

    {/* ---------- NAVBAR ---------- */}
    <div className="navbar-container">
        <div className="navbar-left">
            <h3>U4RAD | Super Coordinator</h3>
        </div>
        <div className="navbar-right">

            <button className="dashboard-btn" onClick={()=>navigate("/service-dashboard")}>
                Service Dashboard
            </button>

            <button className="dashboard-btn" onClick={()=>navigate("/callback-dashboard")}>
                Toggle to Callback Page
            </button>

            <button className="dashboard-btn" onClick={()=>navigate("/customer-dashboard")}>
                Customer's Dashboard
            </button>

            <button className="dashboard-btn" onClick={logout}>
                Logout
            </button>

        </div>
    </div>

    {/* ---------- MAIN DASHBOARD (DEFAULT PAGE) ---------- */}
    <div className="dashboard-wrapper">
        <h1 className="dashboard-heading">Super Coordinator Dashboard</h1>
        <hr/>

        <div className="stats-bar">
            <div>Total Entries: {users.length}</div>
            <div>Verified by Coordinator: {users.filter(u=>u.stage1==="verified_by_coordinator").length}</div>
            <div>Verified by Super Coordinator: {users.filter(u=>u.stage2==="verified_by_supercoordinator").length}</div>
        </div>

        <div className="dashboard-controls">
            <button className="dashboard-btn" onClick={refreshTable}>Refresh</button>
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
                        <th>Stage 1 Status</th>
                        <th>Stage 2 Status</th>
                        <th>Send Confirmation Mail</th>
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
                                <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>

                                    <select 
                                        value={user.stage1}
                                        onChange={(e)=>updateStage1(user, e.target.value)}
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="under_progress">Under Progress</option>
                                        <option value="verified_by_coordinator">Verified by Coordinator</option>
                                        <option value="verification_failed">Verification Failed</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Stage 1 message..."
                                        value={
                                            messages.stage1[user.id] 
                                            ?? user.stage1_message 
                                            ?? ""
                                        }
                                        onChange={(e)=>handleMessageChange("stage1", user.id, e.target.value)}
                                        style={{padding:"5px"}}
                                    />

                                </div>
                            </td>

                            <td>
                                <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>

                                    <select 
                                        value={user.stage2} 
                                        onChange={(e)=>updateStage2(user, e.target.value)}
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="under_progress">Under Progress</option>
                                        <option value="verified_by_supercoordinator">Verified by SuperCoordinator</option>
                                        <option value="verification_failed">Verification Failed</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Stage 2 message..."
                                        value={
                                            messages.stage2[user.id] 
                                            ?? user.stage2_message 
                                            ?? ""
                                        }
                                        onChange={(e)=>handleMessageChange("stage2", user.id, e.target.value)}
                                        style={{padding:"5px"}}
                                    />

                                </div>
                            </td>

                            <td>
                                <button 
                                    className="dashboard-btn" 
                                    onClick={() => sendConfirmationMail(user)}
                                >
                                    Send Confirmation Mail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    {showForm && <ViewFormModal user={selectedUser} closeModal={()=>setShowForm(false)}/>}
    {showRate && <RateListModal user={selectedUser} closeModal={()=>setShowRate(false)}/>}

</div>
)}