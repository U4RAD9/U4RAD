

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

// // useEffect(()=>{

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // setUsers(stored);

// // },[]);

// // function refreshTable(){

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // setUsers(stored);

// // }

// // function searchUser(value){

// // setSearch(value);

// // const stored =
// // JSON.parse(localStorage.getItem("radiologists")) || [];

// // const filtered = stored.filter(user =>
// // user.first_name?.toLowerCase().includes(value.toLowerCase())
// // );

// // setUsers(filtered);

// // }

// // function openForm(user){

// // setSelectedUser(user);
// // setShowForm(true);

// // }

// // function openRate(user){

// // setSelectedUser(user);
// // setShowRate(true);

// // }

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
// // Verified by Coordinator: {
// // users.filter(u=>u.stage1==="Verified by Coordinator").length
// // }
// // </div>

// // <div>
// // Verified by Super Coordinator: {
// // users.filter(u=>u.stage2==="Verified by SuperCoordinator").length
// // }
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

// // {user.rateList ? "Radiologist Agreed to the Rates" : "No Status Yet"}

// // </td>

// // <td>

// // <select
// // value={user.stage1 || "Applied"}
// // onChange={(e)=>updateStage1(user,e.target.value)}
// // >

// // <option>Applied</option>
// // <option>Under Progress</option>
// // <option>Verified by Coordinator</option>
// // <option>Verification Failed</option>

// // </select>

// // </td>

// // <td>

// // <select disabled value={user.stage2 || "None"}>

// // <option>None</option>
// // <option>Verified by SuperCoordinator</option>

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

// // function generateEmail(user){

// // return `Dear Dr. ${user.first_name} ${user.last_name},

// // We at U4RAD would like to thank you for the interest you have shown in our organization.

// // Role: Consultant Radiologist.

// // You will independently report radiology cases assigned to you following U4RAD quality processes.

// // Type of Engagement: Retainership.

// // Timings: Monday to Saturday day 6 pm to 12 am (IST) & Sunday 9 am - 12 am

// // Professional Indemnity Insurance: INR 20 Lakhs required.

// // Location of Work: Work from home or U4RAD designated centre.

// // Regards
// // HR Team
// // U4RAD Technologies Pvt Ltd.
// // `;

// // }






// // // import React, { useEffect, useState } from "react";
// // // import ViewFormModal from "../../components/dashboard/ViewFormModal";
// // // import RateListModal from "../../components/dashboard/RateListModal";
// // // import "./dashboard.css";

// // // export default function CoordinatorDashboard(){

// // // const [users,setUsers] = useState([]);
// // // const [selectedUser,setSelectedUser] = useState(null);
// // // const [showForm,setShowForm] = useState(false);
// // // const [showRate,setShowRate] = useState(false);
// // // const [search,setSearch] = useState("");

// // // /* LOAD USERS */

// // // useEffect(()=>{

// // // let stored =
// // // JSON.parse(localStorage.getItem("radiologists"));

// // // /* IF EMPTY ADD SAMPLE DATA */

// // // if(!stored || stored.length===0){

// // // stored=[

// // // {
// // // id:1,
// // // first_name:"Abhay",
// // // last_name:"Jangir",
// // // email:"abhay@u4rad.com",
// // // contact:"9460233480",
// // // stage1:"Applied",
// // // stage2:"None",
// // // rateList:null,
// // // emailSent:false,
// // // onboardingData:{
// // // personal:{
// // // firstName:"Abhay",
// // // lastName:"Jangir",
// // // email:"abhay@u4rad.com",
// // // phone:"9460233480",
// // // address:"Jaipur Rajasthan"
// // // },
// // // education:{
// // // tenthname:"Central School",
// // // tenthgrade:"90%",
// // // twelthname:"Science School",
// // // twelthgrade:"88%",
// // // mbbsinstitution:"AIIMS Delhi",
// // // mdinstitution:"AIIMS Delhi"
// // // },
// // // banking:{
// // // accountHolderName:"Abhay Jangir",
// // // bankName:"SBI",
// // // accountNumber:"123456789012",
// // // ifscCode:"SBIN0001234"
// // // },
// // // reporting:{
// // // mriopt:["Brain","Spine"],
// // // ctopt:["Chest","Abdomen"]
// // // }
// // // }
// // // },

// // // {
// // // id:2,
// // // first_name:"Rohit",
// // // last_name:"Sharma",
// // // email:"rohit@u4rad.com",
// // // contact:"9998887776",
// // // stage1:"Verified by Coordinator",
// // // stage2:"None",
// // // rateList:null,
// // // emailSent:false,
// // // onboardingData:{
// // // personal:{
// // // firstName:"Rohit",
// // // lastName:"Sharma",
// // // email:"rohit@u4rad.com",
// // // phone:"9998887776",
// // // address:"Delhi"
// // // },
// // // education:{
// // // tenthname:"Delhi Public School",
// // // tenthgrade:"91%",
// // // twelthname:"Delhi Public School",
// // // twelthgrade:"89%",
// // // mbbsinstitution:"Maulana Azad Medical College",
// // // mdinstitution:"AIIMS"
// // // },
// // // banking:{
// // // accountHolderName:"Rohit Sharma",
// // // bankName:"HDFC",
// // // accountNumber:"987654321000",
// // // ifscCode:"HDFC0004567"
// // // },
// // // reporting:{
// // // mriopt:["Brain"],
// // // ctopt:["Chest"]
// // // }
// // // }
// // // }

// // // ];

// // // localStorage.setItem(
// // // "radiologists",
// // // JSON.stringify(stored)
// // // );

// // // }

// // // setUsers(stored);

// // // },[]);

// // // /* REFRESH */

// // // function refreshTable(){

// // // const stored =
// // // JSON.parse(localStorage.getItem("radiologists")) || [];

// // // setUsers(stored);

// // // }

// // // /* SEARCH */

// // // function searchUser(value){

// // // setSearch(value);

// // // const stored =
// // // JSON.parse(localStorage.getItem("radiologists")) || [];

// // // const filtered = stored.filter(user =>
// // // user.first_name?.toLowerCase().includes(value.toLowerCase())
// // // );

// // // setUsers(filtered);

// // // }

// // // /* OPEN MODALS */

// // // function openForm(user){

// // // setSelectedUser(user);
// // // setShowForm(true);

// // // }

// // // function openRate(user){

// // // setSelectedUser(user);
// // // setShowRate(true);

// // // }

// // // /* UPDATE STATUS */

// // // function updateStage1(user,value){

// // // const stored =
// // // JSON.parse(localStorage.getItem("radiologists")) || [];

// // // const updated = stored.map(u=>{

// // // if(u.id===user.id){

// // // return {...u,stage1:value};

// // // }

// // // return u;

// // // });

// // // localStorage.setItem(
// // // "radiologists",
// // // JSON.stringify(updated)
// // // );

// // // setUsers(updated);

// // // }

// // // /* EMAIL */

// // // function sendEmail(user){

// // // const emailContent = generateEmail(user);

// // // console.log(emailContent);

// // // alert("Email Generated. Check Console");

// // // }

// // // return(

// // // <div className="dashboard-wrapper">

// // // <h1 className="dashboard-heading">
// // // Radiologist's Form Dashboard
// // // </h1>

// // // <hr/>

// // // <div className="stats-bar">

// // // <div>Total Entries: {users.length}</div>

// // // <div>
// // // Verified by Coordinator:
// // // {users.filter(u=>u.stage1==="Verified by Coordinator").length}
// // // </div>

// // // <div>
// // // Verified by Super Coordinator:
// // // {users.filter(u=>u.stage2==="Verified by SuperCoordinator").length}
// // // </div>

// // // </div>

// // // <div className="dashboard-controls">

// // // <button className="btn-primary" onClick={refreshTable}>
// // // Refresh
// // // </button>

// // // <button className="btn-primary">
// // // Sort the Table
// // // </button>

// // // <select className="status-filter">

// // // <option>Select Status</option>
// // // <option>Applied</option>
// // // <option>Under Progress</option>
// // // <option>Verified by Coordinator</option>
// // // <option>Verification Failed</option>

// // // </select>

// // // <input
// // // className="search-box"
// // // placeholder="Search by Name"
// // // value={search}
// // // onChange={(e)=>searchUser(e.target.value)}
// // // />

// // // </div>

// // // <div className="table-wrapper">

// // // <table className="dashboard-table">

// // // <thead>

// // // <tr>

// // // <th>First Name</th>
// // // <th>Last Name</th>
// // // <th>Email</th>
// // // <th>Contact No</th>
// // // <th>Form Details</th>
// // // <th>Rate List Details</th>
// // // <th>Rate List Status</th>
// // // <th>Stage 1 Status</th>
// // // <th>Stage 2 Status</th>
// // // <th>Send Confirmation Mail</th>

// // // </tr>

// // // </thead>

// // // <tbody>

// // // {users.map(user=>(

// // // <tr key={user.id}>

// // // <td>{user.first_name}</td>
// // // <td>{user.last_name}</td>
// // // <td>{user.email}</td>
// // // <td>{user.contact}</td>

// // // <td>

// // // <button
// // // className="btn-blue"
// // // onClick={()=>openForm(user)}
// // // >
// // // View Complete Form
// // // </button>

// // // </td>

// // // <td>

// // // <button
// // // className="btn-blue"
// // // onClick={()=>openRate(user)}
// // // >
// // // Rate List Details
// // // </button>

// // // </td>

// // // <td>

// // // {user.rateList
// // // ? "Radiologist Agreed to the Rates"
// // // : "No Status Yet"}

// // // </td>

// // // <td>

// // // <select
// // // value={user.stage1}
// // // onChange={(e)=>updateStage1(user,e.target.value)}
// // // >

// // // <option>Applied</option>
// // // <option>Under Progress</option>
// // // <option>Verified by Coordinator</option>
// // // <option>Verification Failed</option>

// // // </select>

// // // </td>

// // // <td>

// // // <select disabled value={user.stage2}>

// // // <option>None</option>
// // // <option>Under Progress</option>
// // // <option>Verified by SuperCoordinator</option>
// // // <option>Verification Failed</option>

// // // </select>

// // // </td>

// // // <td>

// // // <button
// // // className="btn-blue"
// // // onClick={()=>sendEmail(user)}
// // // >
// // // Send Confirmation Mail
// // // </button>

// // // </td>

// // // </tr>

// // // ))}

// // // </tbody>

// // // </table>

// // // </div>

// // // {showForm && (

// // // <ViewFormModal
// // // user={selectedUser}
// // // closeModal={()=>setShowForm(false)}
// // // />

// // // )}

// // // {showRate && (

// // // <RateListModal
// // // user={selectedUser}
// // // closeModal={()=>setShowRate(false)}
// // // />

// // // )}

// // // </div>

// // // );

// // // }

// // // /* EMAIL TEMPLATE */

// // // function generateEmail(user){

// // // return `Dear Dr. ${user.first_name} ${user.last_name},

// // // We at U4RAD would like to thank you for the interest you have shown in our organization.

// // // Role: Consultant Radiologist.

// // // You will independently report radiology cases assigned to you following U4RAD quality processes.

// // // Type of Engagement: Retainership.

// // // Timings: Monday to Saturday day 6 pm to 12 am (IST) & Sunday 9 am - 12 am.

// // // Professional Indemnity Insurance: INR 20 Lakhs required.

// // // Location of Work: Work from home or U4RAD designated centre.

// // // Regards
// // // HR Team
// // // U4RAD Technologies Pvt Ltd.
// // // `;

// // // }




// import React, { useEffect, useState } from "react";
// import ViewFormModal from "../../dashboard/ViewFormModal";
// import RateListModal from "../../dashboard/RateListModal";
// import "./dashboard.css";

// export default function CoordinatorDashboard(){

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

// fetch("PASTE_RADIOLOGIST_API_HERE")   // <-- ADD YOUR DJANGO API HERE
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

// fetch("PASTE_RADIOLOGIST_API_HERE")   // <-- SAME API HERE
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
//    STAGE 1 UPDATE API
//    ========================= */

// function updateStage1(user,value){

// fetch(`PASTE_STAGE1_UPDATE_API/${user.id}/`,{

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({
// stage1:value
// })

// })

// .then(res=>res.json())
// .then(data=>{
// refreshTable()
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
// <h3>U4RAD | Coordinator</h3>
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
// Coordinator Dashboard
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

// <td>

// <select
// value={user.stage1}
// onChange={(e)=>updateStage1(user,e.target.value)}
// >

// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by Coordinator</option>
// <option>Verification Failed</option>

// </select>

// </td>

// <td>

// <select value={user.stage2} disabled>

// <option>Applied</option>
// <option>Under Progress</option>
// <option>Verified by SuperCoordinator</option>
// <option>Verification Failed</option>

// </select>

// </td>

// <td>

// <button className="dashboard-btn">
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

// {/* API DATA WILL COME HERE */}

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

// {/* API DATA WILL COME HERE */}

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

// {/* API DATA WILL COME HERE */}

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