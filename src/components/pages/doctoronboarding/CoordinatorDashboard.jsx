

// import React, { useEffect, useState } from "react";
// import ViewFormModal from "../../components/dashboard/ViewFormModal";
// import RateListModal from "../../components/dashboard/RateListModal";
// import "./dashboard.css";

// export default function CoordinatorDashboard(){

// const [users,setUsers] = useState([]);

// const [selectedUser,setSelectedUser] = useState(null);
// const [showForm,setShowForm] = useState(false);
// const [showRate,setShowRate] = useState(false);

// const [search,setSearch] = useState("");

// useEffect(()=>{

// const stored =
// JSON.parse(localStorage.getItem("radiologists")) || [];

// setUsers(stored);

// },[]);

// function refreshTable(){

// const stored =
// JSON.parse(localStorage.getItem("radiologists")) || [];

// setUsers(stored);

// }

// function searchUser(value){

// setSearch(value);

// const stored =
// JSON.parse(localStorage.getItem("radiologists")) || [];

// const filtered = stored.filter(user =>
// user.first_name?.toLowerCase().includes(value.toLowerCase())
// );

// setUsers(filtered);

// }

// function openForm(user){

// setSelectedUser(user);
// setShowForm(true);

// }

// function openRate(user){

// setSelectedUser(user);
// setShowRate(true);

// }

// function updateStage1(user,value){

// const stored =
// JSON.parse(localStorage.getItem("radiologists")) || [];

// const updated = stored.map(u=>{

// if(u.id===user.id){

// return {...u,stage1:value};

// }

// return u;

// });

// localStorage.setItem(
// "radiologists",
// JSON.stringify(updated)
// );

// setUsers(updated);

// }

// function sendEmail(user){

// const emailContent = generateEmail(user);

// console.log(emailContent);

// alert("Email Generated. Check Console");

// }

// return(

// <div className="dashboard-wrapper">

// <h1 className="dashboard-heading">
// Radiologist's Form Dashboard
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

// <button className="btn-primary" onClick={refreshTable}>
// Refresh
// </button>

// <button className="btn-primary">
// Sort the Table
// </button>

// <select className="status-filter">

// <option>Select Status</option>
// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by Coordinator</option>
// <option>Verification Failed</option>

// </select>

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
// className="btn-blue"
// onClick={()=>openForm(user)}
// >
// View Complete Form
// </button>

// </td>

// <td>

// <button
// className="btn-blue"
// onClick={()=>openRate(user)}
// >
// Rate List Details
// </button>

// </td>

// <td>

// {user.rateList ? "Radiologist Agreed to the Rates" : "No Status Yet"}

// </td>

// <td>

// <select
// value={user.stage1 || "Applied"}
// onChange={(e)=>updateStage1(user,e.target.value)}
// >

// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by Coordinator</option>
// <option>Verification Failed</option>

// </select>

// </td>

// <td>

// <select disabled value={user.stage2 || "None"}>

// <option>None</option>
// <option>Verified by SuperCoordinator</option>

// </select>

// </td>

// <td>

// <button
// className="btn-blue"
// onClick={()=>sendEmail(user)}
// >
// Send Confirmation Mail
// </button>

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// </div>

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

// );

// }

// function generateEmail(user){

// return `Dear Dr. ${user.first_name} ${user.last_name},

// We at U4RAD would like to thank you for the interest you have shown in our organization.

// Role: Consultant Radiologist.

// You will independently report radiology cases assigned to you following U4RAD quality processes.

// Type of Engagement: Retainership.

// Timings: Monday to Saturday day 6 pm to 12 am (IST) & Sunday 9 am - 12 am

// Professional Indemnity Insurance: INR 20 Lakhs required.

// Location of Work: Work from home or U4RAD designated centre.

// Regards
// HR Team
// U4RAD Technologies Pvt Ltd.
// `;

// }






// // import React, { useEffect, useState } from "react";
// // import ViewFormModal from "../../components/dashboard/ViewFormModal";
// // import RateListModal from "../../components/dashboard/RateListModal";
// // import "./dashboard.css";

// // export default function CoordinatorDashboard(){

// // const [users,setUsers] = useState([]);
// // const [selectedUser,setSelectedUser] = useState(null);
// // const [showForm,setShowForm] = useState(false);
// // const [showRate,setShowRate] = useState(false);
// // const [search,setSearch] = useState("");

// // /* LOAD USERS */

// // useEffect(()=>{

// // let stored =
// // JSON.parse(localStorage.getItem("radiologists"));

// // /* IF EMPTY ADD SAMPLE DATA */

// // if(!stored || stored.length===0){

// // stored=[

// // {
// // id:1,
// // first_name:"Abhay",
// // last_name:"Jangir",
// // email:"abhay@u4rad.com",
// // contact:"9460233480",
// // stage1:"Applied",
// // stage2:"None",
// // rateList:null,
// // emailSent:false,
// // onboardingData:{
// // personal:{
// // firstName:"Abhay",
// // lastName:"Jangir",
// // email:"abhay@u4rad.com",
// // phone:"9460233480",
// // address:"Jaipur Rajasthan"
// // },
// // education:{
// // tenthname:"Central School",
// // tenthgrade:"90%",
// // twelthname:"Science School",
// // twelthgrade:"88%",
// // mbbsinstitution:"AIIMS Delhi",
// // mdinstitution:"AIIMS Delhi"
// // },
// // banking:{
// // accountHolderName:"Abhay Jangir",
// // bankName:"SBI",
// // accountNumber:"123456789012",
// // ifscCode:"SBIN0001234"
// // },
// // reporting:{
// // mriopt:["Brain","Spine"],
// // ctopt:["Chest","Abdomen"]
// // }
// // }
// // },

// // {
// // id:2,
// // first_name:"Rohit",
// // last_name:"Sharma",
// // email:"rohit@u4rad.com",
// // contact:"9998887776",
// // stage1:"Verified by Coordinator",
// // stage2:"None",
// // rateList:null,
// // emailSent:false,
// // onboardingData:{
// // personal:{
// // firstName:"Rohit",
// // lastName:"Sharma",
// // email:"rohit@u4rad.com",
// // phone:"9998887776",
// // address:"Delhi"
// // },
// // education:{
// // tenthname:"Delhi Public School",
// // tenthgrade:"91%",
// // twelthname:"Delhi Public School",
// // twelthgrade:"89%",
// // mbbsinstitution:"Maulana Azad Medical College",
// // mdinstitution:"AIIMS"
// // },
// // banking:{
// // accountHolderName:"Rohit Sharma",
// // bankName:"HDFC",
// // accountNumber:"987654321000",
// // ifscCode:"HDFC0004567"
// // },
// // reporting:{
// // mriopt:["Brain"],
// // ctopt:["Chest"]
// // }
// // }
// // }

// // ];

// // localStorage.setItem(
// // "radiologists",
// // JSON.stringify(stored)
// // );

// // }

// // setUsers(stored);

// // },[]);

// // /* REFRESH */

// // function refreshTable(){

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // setUsers(stored);

// // }

// // /* SEARCH */

// // function searchUser(value){

// // setSearch(value);

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // const filtered = stored.filter(user =>
// // user.first_name?.toLowerCase().includes(value.toLowerCase())
// // );

// // setUsers(filtered);

// // }

// // /* OPEN MODALS */

// // function openForm(user){

// // setSelectedUser(user);
// // setShowForm(true);

// // }

// // function openRate(user){

// // setSelectedUser(user);
// // setShowRate(true);

// // }

// // /* UPDATE STATUS */

// // function updateStage1(user,value){

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // const updated = stored.map(u=>{

// // if(u.id===user.id){

// // return {...u,stage1:value};

// // }

// // return u;

// // });

// // localStorage.setItem(
// // "radiologists",
// // JSON.stringify(updated)
// // );

// // setUsers(updated);

// // }

// // /* EMAIL */

// // function sendEmail(user){

// // const emailContent = generateEmail(user);

// // console.log(emailContent);

// // alert("Email Generated. Check Console");

// // }

// // return(

// // <div className="dashboard-wrapper">

// // <h1 className="dashboard-heading">
// // Radiologist's Form Dashboard
// // </h1>

// // <hr/>

// // <div className="stats-bar">

// // <div>Total Entries: {users.length}</div>

// // <div>
// // Verified by Coordinator:
// // {users.filter(u=>u.stage1==="Verified by Coordinator").length}
// // </div>

// // <div>
// // Verified by Super Coordinator:
// // {users.filter(u=>u.stage2==="Verified by SuperCoordinator").length}
// // </div>

// // </div>

// // <div className="dashboard-controls">

// // <button className="btn-primary" onClick={refreshTable}>
// // Refresh
// // </button>

// // <button className="btn-primary">
// // Sort the Table
// // </button>

// // <select className="status-filter">

// // <option>Select Status</option>
// // <option>Applied</option>
// // <option>Under Progress</option>
// // <option>Verified by Coordinator</option>
// // <option>Verification Failed</option>

// // </select>

// // <input
// // className="search-box"
// // placeholder="Search by Name"
// // value={search}
// // onChange={(e)=>searchUser(e.target.value)}
// // />

// // </div>

// // <div className="table-wrapper">

// // <table className="dashboard-table">

// // <thead>

// // <tr>

// // <th>First Name</th>
// // <th>Last Name</th>
// // <th>Email</th>
// // <th>Contact No</th>
// // <th>Form Details</th>
// // <th>Rate List Details</th>
// // <th>Rate List Status</th>
// // <th>Stage 1 Status</th>
// // <th>Stage 2 Status</th>
// // <th>Send Confirmation Mail</th>

// // </tr>

// // </thead>

// // <tbody>

// // {users.map(user=>(

// // <tr key={user.id}>

// // <td>{user.first_name}</td>
// // <td>{user.last_name}</td>
// // <td>{user.email}</td>
// // <td>{user.contact}</td>

// // <td>

// // <button
// // className="btn-blue"
// // onClick={()=>openForm(user)}
// // >
// // View Complete Form
// // </button>

// // </td>

// // <td>

// // <button
// // className="btn-blue"
// // onClick={()=>openRate(user)}
// // >
// // Rate List Details
// // </button>

// // </td>

// // <td>

// // {user.rateList
// // ? "Radiologist Agreed to the Rates"
// // : "No Status Yet"}

// // </td>

// // <td>

// // <select
// // value={user.stage1}
// // onChange={(e)=>updateStage1(user,e.target.value)}
// // >

// // <option>Applied</option>
// // <option>Under Progress</option>
// // <option>Verified by Coordinator</option>
// // <option>Verification Failed</option>

// // </select>

// // </td>

// // <td>

// // <select disabled value={user.stage2}>

// // <option>None</option>
// // <option>Under Progress</option>
// // <option>Verified by SuperCoordinator</option>
// // <option>Verification Failed</option>

// // </select>

// // </td>

// // <td>

// // <button
// // className="btn-blue"
// // onClick={()=>sendEmail(user)}
// // >
// // Send Confirmation Mail
// // </button>

// // </td>

// // </tr>

// // ))}

// // </tbody>

// // </table>

// // </div>

// // {showForm && (

// // <ViewFormModal
// // user={selectedUser}
// // closeModal={()=>setShowForm(false)}
// // />

// // )}

// // {showRate && (

// // <RateListModal
// // user={selectedUser}
// // closeModal={()=>setShowRate(false)}
// // />

// // )}

// // </div>

// // );

// // }

// // /* EMAIL TEMPLATE */

// // function generateEmail(user){

// // return `Dear Dr. ${user.first_name} ${user.last_name},

// // We at U4RAD would like to thank you for the interest you have shown in our organization.

// // Role: Consultant Radiologist.

// // You will independently report radiology cases assigned to you following U4RAD quality processes.

// // Type of Engagement: Retainership.

// // Timings: Monday to Saturday day 6 pm to 12 am (IST) & Sunday 9 am - 12 am.

// // Professional Indemnity Insurance: INR 20 Lakhs required.

// // Location of Work: Work from home or U4RAD designated centre.

// // Regards
// // HR Team
// // U4RAD Technologies Pvt Ltd.
// // `;

// // }




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
        credentials: "include" // 🔥 IMPORTANT if using session auth
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) {
            setUsers(data);
            setAllUsers(data);
            setIsAuthorized(true);
        } else {
            console.error("Invalid response:", data);
            setUsers([]); // fallback
            setAllUsers([]);
            setIsAuthorized(false);
        }
    })
    .catch(err => console.log(err))
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