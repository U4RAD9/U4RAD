// import React,{useState} from "react";
// import "./modal.css";

// export default function RateListModal({user,closeModal}){

// const defaultRates = [

// {modality:"MRI",caseType:"Head/Brain/Chest/Abdomen/Pelvis/PNS/Face",rate:200},
// {modality:"MRI",caseType:"MRI Screening(per body parts)",rate:100},
// {modality:"MRI",caseType:"MSK",rate:250},
// {modality:"MRI",caseType:"Whole Abdomen",rate:250},
// {modality:"MRI",caseType:"Special Cases",rate:300},
// {modality:"MRI",caseType:"MRI Angiography",rate:300},

// {modality:"CT",caseType:"Head/Brain/PNS/Face/Orbit",rate:150},
// {modality:"CT",caseType:"NCCT Spine",rate:150},
// {modality:"CT",caseType:"HRCT Chest/KUB",rate:150},
// {modality:"CT",caseType:"Abdomen/Pelvis/Neck",rate:200},
// {modality:"CT",caseType:"Whole Abdomen",rate:225},
// {modality:"CT",caseType:"CT Angiography",rate:200},
// {modality:"CT",caseType:"Cardiac Angiography",rate:500},

// {modality:"X-Ray",caseType:"Per Exposure - any body parts",rate:20},
// {modality:"X-Ray",caseType:"Special Procedure - Barium/IVP/HSG",rate:75}

// ];

// const [rates,setRates] = useState(
// user.rateList || defaultRates
// );

// const updateRate=(index,value)=>{

// const updated=[...rates];
// updated[index].rate=value;

// setRates(updated);

// };

// const saveRates=()=>{

// const users =
// JSON.parse(localStorage.getItem("radiologists"));

// const updatedUsers = users.map(u=>{

// if(u.id === user.id){

// return {...u,rateList:rates};

// }

// return u;

// });

// localStorage.setItem(
// "radiologists",
// JSON.stringify(updatedUsers)
// );

// alert("Rate list saved");

// closeModal();

// };

// return(

// <div className="modal-overlay">

// <div className="modal-large">

// <h2>Update Rate List</h2>

// <table className="rate-table">

// <thead>
// <tr>
// <th>Serial</th>
// <th>Modality</th>
// <th>Case Type</th>
// <th>Doctor Rate</th>
// </tr>
// </thead>

// <tbody>

// {rates.map((r,index)=>(
// <tr key={index}>

// <td>{index+1}</td>
// <td>{r.modality}</td>
// <td>{r.caseType}</td>

// <td>

// <input
// value={r.rate}
// onChange={(e)=>updateRate(index,e.target.value)}
// />

// </td>

// </tr>
// ))}

// </tbody>

// </table>

// <button onClick={saveRates}>
// Save Changes
// </button>

// </div>

// </div>

// );

// }

import React, { useState, useEffect } from "react";
import "./modal.css";
import { BASE_URL } from "../apiconnector";

export default function RateListModal({ user, closeModal }) {

const defaultRates = [

{ modality:"MRI", caseType:"Head/Brain/Chest/Abdomen/Pelvis/PNS/Face", rate:200 },
{ modality:"MRI", caseType:"MRI Screening(per body parts)", rate:100 },
{ modality:"MRI", caseType:"MSK", rate:250 },
{ modality:"MRI", caseType:"Whole Abdomen", rate:250 },
{ modality:"MRI", caseType:"Special Cases(ex. Neurography, Defacography, Breast)", rate:300 },
{ modality:"MRI", caseType:"MRI Angiography(per body parts)", rate:300 },

{ modality:"CT", caseType:"Head/Brain/PNS/Face/Orbit", rate:150 },
{ modality:"CT", caseType:"NCCT Spine", rate:150 },
{ modality:"CT", caseType:"HRCT Chest/KUB", rate:150 },
{ modality:"CT", caseType:"Abdomen/Pelvis/Neck", rate:200 },
{ modality:"CT", caseType:"Whole Abdomen", rate:225 },
{ modality:"CT", caseType:"CT Angiography(per body parts)", rate:200 },
{ modality:"CT", caseType:"Cardiac Angiography", rate:500 },

{ modality:"X-Ray", caseType:"Per Exposure - any body parts", rate:20 },
{ modality:"X-Ray", caseType:"Special Procedure - Barium/IVP/HSG", rate:75 }

];

const [rates, setRates] = useState(defaultRates);

/* ================= FETCH FROM BACKEND ================= */

useEffect(() => {
  async function fetchRates() {
    try {
      const res = await fetch(
        `${BASE_URL}/rate-list/${user.id}/`
      );

      if (!res.ok) return;

      const data = await res.json();

      const mappedRates = [
        { modality:"MRI", caseType:"Head/Brain/Chest/Abdomen/Pelvis/PNS/Face", rate:data.mri1 },
        { modality:"MRI", caseType:"MRI Screening(per body parts)", rate:data.mri2 },
        { modality:"MRI", caseType:"MSK", rate:data.mri3 },
        { modality:"MRI", caseType:"Whole Abdomen", rate:data.mri4 },
        { modality:"MRI", caseType:"Special Cases(ex. Neurography, Defacography, Breast)", rate:data.mri5 },
        { modality:"MRI", caseType:"MRI Angiography(per body parts)", rate:data.mri6 },

        { modality:"CT", caseType:"Head/Brain/PNS/Face/Orbit", rate:data.ct1 },
        { modality:"CT", caseType:"NCCT Spine", rate:data.ct2 },
        { modality:"CT", caseType:"HRCT Chest/KUB", rate:data.ct3 },
        { modality:"CT", caseType:"Abdomen/Pelvis/Neck", rate:data.ct4 },
        { modality:"CT", caseType:"Whole Abdomen", rate:data.ct5 },
        { modality:"CT", caseType:"CT Angiography(per body parts)", rate:data.ct6 },
        { modality:"CT", caseType:"Cardiac Angiography", rate:data.ct7 },

        { modality:"X-Ray", caseType:"Per Exposure - any body parts", rate:data.xray1 },
        { modality:"X-Ray", caseType:"Special Procedure - Barium/IVP/HSG", rate:data.xray2 }
      ];

      setRates(mappedRates);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  fetchRates();
}, [user.id]);

/* ================= EDIT RATE ================= */

function handleChange(index, value) {
  const updated = [...rates];
  updated[index].rate = value;
  setRates(updated);
}

/* ================= SAVE TO BACKEND ================= */

async function saveRates() {
  try {
    const payload = {
      mri1: rates[0].rate,
      mri2: rates[1].rate,
      mri3: rates[2].rate,
      mri4: rates[3].rate,
      mri5: rates[4].rate,
      mri6: rates[5].rate,

      ct1: rates[6].rate,
      ct2: rates[7].rate,
      ct3: rates[8].rate,
      ct4: rates[9].rate,
      ct5: rates[10].rate,
      ct6: rates[11].rate,
      ct7: rates[12].rate,

      xray1: rates[13].rate,
      xray2: rates[14].rate,
    };

    const res = await fetch(
      `${BASE_URL}/rate-list/save/${user.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Rate list saved successfully");
      closeModal();
    } else {
      alert("Error saving data");
      console.error(data);
    }

  } catch (err) {
    console.error("Save error:", err);
    alert("Server error");
  }
}

/* ================= UI ================= */

return(
<div className="modal-overlay">

<div className="modal-box">

<h2>Update Rate List</h2>

<table className="rate-table">

<thead>
<tr>
<th>Serial Number</th>
<th>Modality</th>
<th>Case Type</th>
<th>Doctor Rate</th>
</tr>
</thead>

<tbody>
{rates.map((r,i)=>(
<tr key={i}>
<td>{i+1}.</td>
<td>{r.modality}</td>
<td>{r.caseType}</td>
<td>
<input
type="number"
value={r.rate}
onChange={(e)=>handleChange(i,e.target.value)}
style={{
width:"120px",
padding:"6px"
}}
/>
</td>
</tr>
))}
</tbody>

</table>

<div style={{
marginTop:"10px",
textAlign:"center",
fontWeight:"bold"
}}>
Note: One Sunday and 5 Night on a call to be performed.
</div>

<div style={{marginTop:"20px", textAlign:"right"}}>

<button
onClick={closeModal}
style={{
background:"#6b7280",
color:"white",
border:"none",
padding:"8px 14px",
borderRadius:"5px",
marginRight:"10px"
}}>
Close
</button>

<button
onClick={saveRates}
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"8px 14px",
borderRadius:"5px"
}}>
Save Changes
</button>

</div>

</div>

</div>
);

}