// import { useState, useContext } from "react";
// import { FormContext } from "../../context/FormContext";
// import "../styles/form.css";

// export default function Step5Banking() {

//   const { formData, updateSection } = useContext(FormContext);

//   // 🔥 Load saved data
//   const [data, setData] = useState(formData.banking || {});
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     let updatedValue = files ? files[0] : value;

//     // Account Number → numbers only
//     if (name === "acnumber") {
//       updatedValue = value.replace(/\D/g, "");
//     }

//     // Aadhar → exactly 12 digits
//     if (name === "aadharcardno") {
//       updatedValue = value.replace(/\D/g, "");
//       if (updatedValue.length > 12) {
//         updatedValue = updatedValue.slice(0, 12);
//       }
//     }

//     const updated = {
//       ...data,
//       [name]: updatedValue,
//     };

//     setData(updated);
//     updateSection("banking", updated);
//   };

//   // Uppercase handler + validation
//   const handleUpperCase = (e) => {
//     const { name, value } = e.target;
//     const upperValue = value.toUpperCase();

//     const updated = {
//       ...data,
//       [name]: upperValue,
//     };

//     setData(updated);
//     updateSection("banking", updated);

//     // PAN Validation
//     // if (name === "pancardno") {
//     //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     //   if (upperValue.length === 10 && !panRegex.test(upperValue)) {
//     //     setErrors((prev) => ({
//     //       ...prev,
//     //       pancardno: "Invalid PAN format (ABCDE1234F)"
//     //     }));
//     //   } else {
//     //     setErrors((prev) => ({
//     //       ...prev,
//     //       pancardno: ""
//     //     }));
//     //   }
//     // }

//       if (name === "pancardno") {
//     const upperValue = value.toUpperCase();
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

//     // Update field in uppercase
//     updated.pancardno = upperValue;

//     if (!upperValue) {
//       setErrors((prev) => ({
//         ...prev,
//         pancardno: "PAN is required"
//       }));
//     } 
//     else if (upperValue.length !== 10) {
//       setErrors((prev) => ({
//         ...prev,
//         pancardno: "PAN must be exactly 10 characters"
//       }));
//     } 
//     else if (!panRegex.test(upperValue)) {
//       setErrors((prev) => ({
//         ...prev,
//         pancardno: "Invalid PAN format (ABCDE1234F)"
//       }));
//     } 
//     else {
//       setErrors((prev) => ({
//         ...prev,
//         pancardno: ""
//       }));
//     }
//   }


//     // IFSC Validation
//     if (name === "ifsc") {
//       const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
//       if (upperValue.length === 11 && !ifscRegex.test(upperValue)) {
//         setErrors((prev) => ({
//           ...prev,
//           ifsc: "Invalid IFSC format"
//         }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           ifsc: ""
//         }));
//       }
//     }
//   };

//   return (
//     <div className="form-wrapper">
//       <h2 className="form-title">Radiologist's Signup Form</h2>

//       {/* Progress */}
//       <div className="progress-steps">
//         {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map(
//           (step, index) => (
//             <div key={index} className="step">
//               <span className={`circle ${index === 4 ? "active" : ""}`}>
//                 {index + 1}
//               </span>
//               <p>{step}</p>
//             </div>
//           )
//         )}
//       </div>

//       <h3 className="section-title">Banking Details :</h3>

//       <div className="form-group">
//         <label>Account Holder's Name</label>
//         <input
//           name="accholdername"
//           value={data.accholdername || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Bank Name</label>
//         <input
//           name="bankname"
//           value={data.bankname || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Branch Name</label>
//         <input
//           name="branchname"
//           value={data.branchname || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Account Number</label>
//         <input
//           name="acnumber"
//           value={data.acnumber || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>IFSC Code</label>
//         <input
//           name="ifsc"
//           maxLength="11"
//           value={data.ifsc || ""}
//           onChange={handleUpperCase}
//         />
//         {errors.ifsc && <p className="error">{errors.ifsc}</p>}
//       </div>

//       <div className="form-group">
//         <label>PAN Card Number</label>
//         <input
//           name="pancardno"
//           maxLength="10"
//           value={data.pancardno || ""}
//           onChange={handleUpperCase}
//         />
//         {errors.pancardno && <p className="error">{errors.pancardno}</p>}
//       </div>

//       <div className="form-group">
//         <label>AADHAR Card Number</label>
//         <input
//           name="aadharcardno"
//           placeholder="000011112222"
//           value={data.aadharcardno || ""}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Upload PAN Card</label>
//         <input type="file" name="pancard" onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <label>Upload AADHAR Card</label>
//         <input type="file" name="aadharcard" onChange={handleChange} />
//       </div>

//       <div className="form-group">
//         <label>Upload Cancelled Cheque</label>
//         <input type="file" name="cheque" onChange={handleChange} />
//       </div>

//     </div>
//   );
// }





// adding api integration and validation cloude wala code 

import { useState, useContext } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step5Banking() {
  const { formData, updateSection } = useContext(FormContext);

  // Field names match what DoctorOnboardingForm sends to API:
  // account_holder_name → accountHolderName
  // bank_name → bankName
  // branch_name → branchName
  // ifsc_code → ifscCode
  // account_number → accountNumber
  // pan_card_number → panCardNumber
  // aadhar_card_number → aadharCardNumber
  // pan_card_file → panCardFile
  // aadhar_card_file → aadharCardFile
  // cheque_file → chequeFile
  const [data, setData] = useState(formData.banking || {});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedValue = files ? files[0] : value;

    // Account Number → digits only
    if (name === "accountNumber") {
      updatedValue = value.replace(/\D/g, "");
    }

    // Aadhar → exactly 12 digits
    if (name === "aadharCardNumber") {
      updatedValue = value.replace(/\D/g, "").slice(0, 12);
    }

    const updated = { ...data, [name]: updatedValue };
    setData(updated);
    updateSection("banking", updated);
  };

  // Uppercase handler for PAN & IFSC with validation
  const handleUpperCase = (e) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase();

    const updated = { ...data, [name]: upperValue };
    setData(updated);
    updateSection("banking", updated);

    if (name === "panCardNumber") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!upperValue) {
        setErrors((prev) => ({ ...prev, panCardNumber: "PAN is required" }));
      } else if (upperValue.length !== 10) {
        setErrors((prev) => ({ ...prev, panCardNumber: "PAN must be exactly 10 characters" }));
      } else if (!panRegex.test(upperValue)) {
        setErrors((prev) => ({ ...prev, panCardNumber: "Invalid PAN format (ABCDE1234F)" }));
      } else {
        setErrors((prev) => ({ ...prev, panCardNumber: "" }));
      }
    }

    if (name === "ifscCode") {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (upperValue.length === 11 && !ifscRegex.test(upperValue)) {
        setErrors((prev) => ({ ...prev, ifscCode: "Invalid IFSC format (e.g. SBIN0001234)" }));
      } else {
        setErrors((prev) => ({ ...prev, ifscCode: "" }));
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
          <div key={index} className="step">
            <span className={`circle ${index === 4 ? "active" : ""}`}>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Banking Details :</h3>

      <div className="form-group">
        <label>Account Holder's Name</label>
        <input name="accountHolderName" value={data.accountHolderName || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Bank Name</label>
        <input name="bankName" value={data.bankName || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Branch Name</label>
        <input name="branchName" value={data.branchName || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Account Number</label>
        <input name="accountNumber" value={data.accountNumber || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>IFSC Code</label>
        <input
          name="ifscCode"
          maxLength="11"
          value={data.ifscCode || ""}
          onChange={handleUpperCase}
        />
        {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}
      </div>

      <div className="form-group">
        <label>PAN Card Number</label>
        <input
          name="panCardNumber"
          maxLength="10"
          value={data.panCardNumber || ""}
          onChange={handleUpperCase}
        />
        {errors.panCardNumber && <p className="error">{errors.panCardNumber}</p>}
      </div>

      <div className="form-group">
        <label>AADHAR Card Number</label>
        <input
          name="aadharCardNumber"
          placeholder="000011112222"
          maxLength="12"
          value={data.aadharCardNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Upload PAN Card</label>
        <input type="file" name="panCardFile" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload AADHAR Card</label>
        <input type="file" name="aadharCardFile" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Cancelled cheque/Bank details</label>
        <input type="file" name="chequeFile" onChange={handleChange} />
      </div>
    </div>
  );
}