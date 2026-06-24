// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../apiconnector";
// import Logo from "../../../assets/Logo.png"; // Adjust the path as necessary


// export default function ClientRateAgreement() {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");

//   const navigate = useNavigate();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [clientData, setClientData] = useState(null); 
  
//   const [step, setStep] = useState(1); // 1: View Rates, 2: OTP Verification, 3: Success, 4: Callback Form
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isSendingOtp, setIsSendingOtp] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [agreed, setAgreed] = useState(false);

//   // Callback Form States
//   const [cbHospitalName, setCbHospitalName] = useState("");
//   const [cbName, setCbName] = useState("");
//   const [cbPhone, setCbPhone] = useState("");
//   const [cbMessage, setCbMessage] = useState("");
//   const [isSubmittingCb, setIsSubmittingCb] = useState(false);

//   // // Fetch the rate list using the token when the page loads
//   // useEffect(() => {
//   //   if (!token) {
//   //     setError("Invalid or missing agreement token.");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   fetch(`${BASE_URL}/client/rates/view/?token=${token}`)
//   //     .then(async (res) => {
//   //       const data = await res.json();
//   //       if (!res.ok) throw new Error(data.error || "Failed to load rate list.");
        
//   //       const parsedRates = typeof data.rate_list === 'string' 
//   //         ? JSON.parse(data.rate_list) 
//   //         : data.rate_list;

//   //       setClientData({ ...data, rate_list: parsedRates });
//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       setError(err.message);
//   //       setLoading(false);
//   //     });
//   // }, [token]);

//   // Fetch the rate list using the token when the page loads
//   useEffect(() => {
//     if (!token) {
//       setError("Invalid or missing agreement token.");
//       setLoading(false);
//       return;
//     }

//     fetch(`${BASE_URL}/client/rates/view/?token=${token}`)
//       .then(async (res) => {
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to load rate list.");
        
//         const parsedRates = typeof data.rate_list === 'string' 
//           ? JSON.parse(data.rate_list) 
//           : data.rate_list;

//         setClientData({ ...data, rate_list: parsedRates });
        
//         // ADDED THIS BLOCK: Set the phone number if it comes from the API
//         if (data.phone) {
//           setPhone(data.phone);
//         }

//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [token]);

//   // Request OTP
//   const handleSendOtp = () => {
//     if (!phone || phone.length !== 10) {
//       alert("Please enter a valid 10-digit registered phone number.");
//       return;
//     }

//     setIsSendingOtp(true);

//     fetch(`${BASE_URL}/client/send-otp/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok) {
//           alert("OTP sent to your phone.");
//           setStep(2); 
//         } else {
//           alert(data.error || "Failed to send OTP.");
//         }
//       })
//       .catch(() => alert("Network error. Try again."))
//       .finally(() => setIsSendingOtp(false));
//   };

//   // Verify OTP and Agree
//   const handleVerifyAndAgree = () => {
//     if (!otp || otp.length < 4) {
//       alert("Please enter a valid OTP.");
//       return;
//     }

//     setIsVerifying(true);

//     fetch(`${BASE_URL}/client/rates/agree/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, phone, otp }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok) {
//           setStep(3); 
//         } else {
//           alert(data.error || "Verification failed. Check OTP or Phone Number.");
//         }
//       })
//       .catch(() => alert("Network error. Try again."))
//       .finally(() => setIsVerifying(false));
//   };

//   // ✅ UPDATED: Handle Callback Request Submission to Backend
//   const handleCallbackSubmit = async () => {
//     if (!cbHospitalName.trim() || !cbName.trim() || !cbPhone.trim()) {
//       alert("Please fill in the Hospital Name, Contact Person, and Phone Number.");
//       return;
//     }

//     if (cbPhone.length !== 10) {
//       alert("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     setIsSubmittingCb(true);

//     try {
//       const response = await fetch(`${BASE_URL}/callback-request/submit/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           hospital_name: cbHospitalName,
//           contact_person: cbName,
//           phone: cbPhone,
//           message: cbMessage,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Callback request submitted successfully! Our team will contact you soon.");
//         // Clear the form fields
//         setCbHospitalName("");
//         setCbName("");
//         setCbPhone("");
//         setCbMessage("");

//         navigate("/");
//         // Return to main screen
//         setStep(1); 
//       } else {
//         alert(data.error || "Failed to submit request. Please try again.");
//       }
//     } catch (error) {
//       console.error("Callback submission error:", error);
//       alert("A network error occurred. Please check your connection and try again.");
//     } finally {
//       setIsSubmittingCb(false);
//     }
//   };

//   if (loading) {
//     return <div className="cra-centered">Loading your agreement details...</div>;
//   }

//   if (error) {
//     return (
//       <div className="cra-centered cra-error">
//         <h2>Oops!</h2>
//         <p>{error}</p>
//         <p>Please contact support if you believe this is a mistake.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="cra-wrapper">
//       <style>{`
//         .cra-wrapper { min-height: 100vh; background-color: #f4f7f9; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: 'DM Sans', sans-serif; color: #333; }
//         .cra-card { background: #fff; width: 100%; max-width: 700px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); padding: 30px; }
//         .cra-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
//         .cra-logo { width: 120px; margin-bottom: 15px; }
        
//         .cra-title { font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; }
//         .cra-greeting-text { font-size: 16px; color: #555; line-height: 1.5; }
        
//         .cra-subtitle { font-size: 14px; color: #666; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #e5e7eb; }
        
//         .cra-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px; }
//         .cra-table th, .cra-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: center; }
//         .cra-table th { background-color: #f9fafb; color: #4b5563; font-weight: 600; }
//         .cra-table td.left { text-align: left; }
        
//         .cra-form-group { margin-bottom: 20px; text-align: left; }
//         .cra-label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #374151; }
//         .cra-input { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
//         .cra-input:focus { border-color: #2563eb; }
        
//         .cra-btn-group { display: flex; gap: 15px; flex-wrap: wrap; }
//         .cra-btn { flex: 1; padding: 14px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
//         .cra-btn:hover { background: #1d4ed8; }
//         .cra-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        
//         .cra-btn-secondary { flex: 1; padding: 14px; background: #fff; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
//         .cra-btn-secondary:hover { background: #eff6ff; }
        
//         .cra-centered { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: #555; }
//         .cra-error { color: #dc2626; text-align: center; }
//         .cra-success-icon { font-size: 60px; color: #10b981; margin-bottom: 15px; }
//       `}</style>

//       <div className="cra-card">
//       <div className="cra-header">
//         <img src={Logo} alt="Logo" className="cra-logo" />
        
//         {/* Top: Quotation Header */}
//         <h1 className="cra-title">
//           Quotation for: {clientData?.client_name}
//         </h1>
        
//         <p style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "14px", fontWeight: "normal" }}>
//           Greetings from U4RAD Technologies<br />
//           Thank you for connecting with us.<br />
//           Kindly check the rates below:
//         </p>

//         {/* Bottom: Information text with proper formatting */}
//         <p className="cra-info-text" style={{ textAlign: "left", lineHeight: "1.5" }}>
//           U4rad shares 2 types of rates - one to get the cases reported by an available doctor or a radiologist chosen by the client. It is a market-driven rate list (can be done via app) where radiologists are decided on the basis of experience, institutions, etc.
//         </p>
//       </div>

//         {/* STEP 1: REVIEW RATES */}
//         {step === 1 && (
//           <div>
//             <div style={{ overflowX: "auto" }}>
//               <table className="cra-table">
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Modality</th>
//                     <th className="left">Case Type</th>
//                     <th>Rate (Rs)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {clientData.rate_list.map((row, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{row.modality}</td>
//                       <td className="left">{row.caseType}</td>
//                       <td><strong>{row.rate}</strong></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="cra-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <input 
//                 type="checkbox" 
//                 id="agree" 
//                 checked={agreed} 
//                 onChange={(e) => setAgreed(e.target.checked)} 
//                 style={{ width: '18px', height: '18px', cursor: 'pointer' }}
//               />
//               <label htmlFor="agree" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
//                 I have reviewed the rates proposed above and hereby confirm my acceptance of the same.
//               </label>
//             </div>

//             <div className="cra-form-group">
//               <label className="cra-label">OTP Shared to this Number</label>
//               <input 
//                 type="tel" 
//                 className="cra-input" 
//                 placeholder="Enter 10-digit number to receive OTP"
//                 value={phone}
//                 maxLength={10}
//                 disabled={true}
//                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
//               />
//             </div>

//             <div className="cra-btn-group">
//               <button 
//                 className="cra-btn" 
//                 onClick={handleSendOtp}
//                 disabled={!agreed || phone.length !== 10 || isSendingOtp}
//               >
//                 {isSendingOtp ? "Sending OTP..." : "Send OTP to Verify"}
//               </button>
              
//               <button 
//                 className="cra-btn-secondary" 
//                 onClick={() => setStep(4)}
//               >
//                 Request Callback
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STEP 2: ENTER OTP */}
//         {step === 2 && (
//           <div style={{ textAlign: "center" }}>
//             <h3 style={{ marginBottom: "15px", color: "#333" }}>Verification Required</h3>
//             <p style={{ marginBottom: "25px", color: "#666", fontSize: "14px" }}>
//               We have sent a 6-digit code to <strong>+91 {phone}</strong>.
//             </p>

//             <div className="cra-form-group">
//               <input 
//                 type="text" 
//                 className="cra-input" 
//                 placeholder="Enter OTP"
//                 value={otp}
//                 maxLength={6}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                 style={{ textAlign: "center", fontSize: "20px", letterSpacing: "5px" }}
//               />
//             </div>

//             <button 
//               className="cra-btn" 
//               onClick={handleVerifyAndAgree}
//               disabled={otp.length < 4 || isVerifying}
//             >
//               {isVerifying ? "Verifying..." : "Verify & Confirm Agreement"}
//             </button>
            
//             <button 
//               style={{ background: 'none', border: 'none', color: '#2563eb', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}
//               onClick={() => setStep(1)}
//             >
//               ← Go back
//             </button>
//           </div>
//         )}

//         {/* STEP 3: SUCCESS */}
//         {step === 3 && (
//           <div style={{ textAlign: "center", padding: "20px 0" }}>
//             <div className="cra-success-icon">✓</div>
//             <h2 style={{ color: "#111", marginBottom: "10px" }}>Agreement Confirmed!</h2>
//             <p style={{ color: "#555", lineHeight: "1.6" }}>
//               Thank you, <strong>{clientData.client_name}</strong>. You have successfully verified and agreed to the rate list.
//             </p>
//             <p style={{ color: "#555", marginTop: "15px" }}>
//               You may now close this window. Our team will contact you shortly to finalize your onboarding.
//               You or you can reach out on +91 8587075085
//             </p>
//           </div>
//         )}

//         {/* STEP 4: CALLBACK FORM */}
//         {step === 4 && (
//           <>
//             {/* ── INCLUDED RED-THEME CSS STYLES ── */}
//             <style>
//               {`
//                 .premium-cb-container {
//                   max-width: 480px;
//                   margin: 0 auto;
//                   background: #ffffff;
//                   border: 1px solid #e2e8f0;
//                   border-radius: 20px;
//                   padding: 40px 32px;
//                   box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
//                   font-family: 'DM Sans', sans-serif;
//                   animation: fadeInCb 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//                 }

//                 @keyframes fadeInCb {
//                   0% { opacity: 0; transform: translateY(10px) scale(0.98); }
//                   100% { opacity: 1; transform: translateY(0) scale(1); }
//                 }

//                 .premium-cb-header {
//                   text-align: center;
//                   margin-bottom: 32px;
//                 }

//                 /* Red gradient icon box */
//                 .premium-cb-icon-box {
//                   width: 56px;
//                   height: 56px;
//                   margin: 0 auto 20px;
//                   background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
//                   border-radius: 16px;
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                   color: #dc2626; /* U4RAD Brand Red */
//                   box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.15);
//                 }

//                 .premium-cb-icon-box svg { width: 26px; height: 26px; }
//                 .premium-cb-title { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 8px; letter-spacing: -0.02em; }
//                 .premium-cb-subtitle { font-size: 14px; color: #64748b; line-height: 1.6; padding: 0 10px; }

//                 .premium-cb-form { display: flex; flex-direction: column; gap: 24px; }
//                 .premium-input-group { position: relative; width: 100%; }

//                 .premium-input {
//                   width: 100%;
//                   background: transparent;
//                   border: 1px solid #cbd5e1;
//                   border-radius: 12px;
//                   padding: 18px 16px 14px;
//                   font-size: 15px;
//                   color: #0f172a;
//                   outline: none;
//                   transition: all 0.25s ease;
//                   font-family: 'DM Sans', sans-serif;
//                   box-sizing: border-box;
//                 }

//                 .premium-input.with-prefix { padding-left: 62px; }
//                 .premium-textarea { resize: vertical; min-height: 110px; }

//                 .premium-floating-label {
//                   position: absolute;
//                   left: 16px;
//                   top: 50%;
//                   transform: translateY(-50%);
//                   font-size: 15px;
//                   color: #64748b;
//                   pointer-events: none;
//                   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//                   background: #ffffff;
//                   padding: 0 4px;
//                 }

//                 .premium-textarea ~ .premium-floating-label { top: 26px; }
//                 .premium-input-group .prefix-label { left: 62px; }

//                 /* Floating label turns Brand Red on focus */
//                 .premium-input:focus ~ .premium-floating-label,
//                 .premium-input:not(:placeholder-shown) ~ .premium-floating-label,
//                 .premium-input:valid ~ .premium-floating-label {
//                   top: 0;
//                   font-size: 12px;
//                   font-weight: 600;
//                   color: #dc2626;
//                   transform: translateY(-50%);
//                 }

//                 .premium-input-group .premium-input.with-prefix:focus ~ .prefix-label,
//                 .premium-input-group .premium-input.with-prefix:valid ~ .prefix-label,
//                 .premium-input-group .premium-input.with-prefix:not(:placeholder-shown) ~ .prefix-label {
//                   left: 12px; 
//                 }

//                 /* Input border and shadow turns Brand Red on focus */
//                 .premium-input:focus {
//                   border-color: #dc2626;
//                   box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12);
//                 }

//                 .premium-prefix {
//                   position: absolute;
//                   left: 16px;
//                   top: 50%;
//                   transform: translateY(-50%);
//                   font-size: 15px;
//                   color: #0f172a;
//                   font-weight: 500;
//                   pointer-events: none;
//                   border-right: 1px solid #e2e8f0;
//                   padding-right: 12px;
//                   font-family: 'DM Mono', monospace;
//                 }

//                 /* Primary Button is now Brand Red */
//                 .premium-submit-btn {
//                   width: 100%;
//                   padding: 16px;
//                   background: #dc2626;
//                   color: #ffffff;
//                   border: none;
//                   border-radius: 12px;
//                   font-size: 15px;
//                   font-weight: 600;
//                   cursor: pointer;
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                   transition: all 0.2s ease;
//                   margin-top: 8px;
//                   font-family: 'DM Sans', sans-serif;
//                 }

//                 .premium-submit-btn:hover:not(:disabled) {
//                   background: #b91c1c; /* Darker red on hover */
//                   box-shadow: 0 8px 20px -6px rgba(220, 38, 38, 0.4);
//                   transform: translateY(-1px);
//                 }

//                 .premium-submit-btn:active:not(:disabled) { transform: translateY(0); }
//                 .premium-submit-btn.loading { opacity: 0.8; cursor: not-allowed; }

//                 .premium-spinner {
//                   width: 20px;
//                   height: 20px;
//                   border: 2px solid rgba(255,255,255,0.3);
//                   border-top-color: #ffffff;
//                   border-radius: 50%;
//                   animation: premiumSpin 0.8s linear infinite;
//                 }

//                 @keyframes premiumSpin { 100% { transform: rotate(360deg); } }

//                 .premium-cb-footer {
//                   margin-top: 24px;
//                   text-align: center;
//                   border-top: 1px solid #f1f5f9;
//                   padding-top: 24px;
//                 }

//                 .premium-back-btn {
//                   background: transparent;
//                   border: none;
//                   color: #64748b;
//                   font-size: 14px;
//                   font-weight: 500;
//                   cursor: pointer;
//                   display: inline-flex;
//                   align-items: center;
//                   gap: 6px;
//                   transition: color 0.2s ease;
//                   font-family: 'DM Sans', sans-serif;
//                 }

//                 .premium-back-btn svg { width: 16px; height: 16px; }
//                 .premium-back-btn:hover { color: #0f172a; }
//               `}
//             </style>

//             {/* ── FORM HTML ── */}
//             <div className="premium-cb-container">
//               {/* Header Section */}
//               <div className="premium-cb-header">
//                 <div className="premium-cb-icon-box">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
//                   </svg>
//                 </div>
//                 <h2 className="premium-cb-title">Request a Callback</h2>
//                 <p className="premium-cb-subtitle">
//                   Prefer to speak with an expert? Drop your details and our onboarding team will connect with you.
//                 </p>
//               </div>

//               {/* Form Section with Floating Labels */}
//               <div className="premium-cb-form">
                
//                 {/* NEW: Hospital / Center Name Field */}
//                 <div className="premium-input-group">
//                   <input
//                     type="text"
//                     className="premium-input"
//                     placeholder=" " 
//                     value={cbHospitalName}
//                     onChange={(e) => setCbHospitalName(e.target.value)}
//                     required
//                   />
//                   <label className="premium-floating-label">Hospital / Center Name</label>
//                 </div>

//                 <div className="premium-input-group">
//                   <input
//                     type="text"
//                     className="premium-input"
//                     placeholder=" " 
//                     value={cbName}
//                     onChange={(e) => setCbName(e.target.value)}
//                     required
//                   />
//                   <label className="premium-floating-label">Contact Person Name</label>
//                 </div>

//                 <div className="premium-input-group">
//                   <span className="premium-prefix">+91</span>
//                   <input
//                     type="tel"
//                     className="premium-input with-prefix"
//                     placeholder=" "
//                     value={cbPhone}
//                     maxLength={10}
//                     onChange={(e) => setCbPhone(e.target.value.replace(/\D/g, ""))}
//                     required
//                   />
//                   <label className="premium-floating-label prefix-label">Phone Number</label>
//                 </div>

//                 <div className="premium-input-group">
//                   <textarea
//                     className="premium-input premium-textarea"
//                     placeholder=" "
//                     value={cbMessage}
//                     onChange={(e) => setCbMessage(e.target.value)}
//                     required
//                     rows="3"
//                   />
//                   <label className="premium-floating-label">Additional Requirements (Optional)</label>
//                 </div>

//                 <button
//                   className={`premium-submit-btn ${isSubmittingCb ? 'loading' : ''}`}
//                   onClick={handleCallbackSubmit}
//                   disabled={isSubmittingCb}
//                 >
//                   {isSubmittingCb ? (
//                     <span className="premium-spinner"></span>
//                   ) : (
//                     <span>Request Callback →</span>
//                   )}
//                 </button>
//               </div>

//               {/* Footer Section */}
//               <div className="premium-cb-footer">
//                 <button className="premium-back-btn" onClick={() => setStep(1)}>
//                   <svg viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                   </svg>
//                   Return to Rates
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
        
//       </div>
//     </div>
//   );
// } 




import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";
import Logo from "../../../assets/Logo.png"; // Adjust the path as necessary
import Terms from "./Terms"; // Make sure this path points to your Terms.jsx file

export default function ClientRateAgreement() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState(null); 
  
  const [step, setStep] = useState(1); // 1: View Rates, 2: OTP Verification, 3: Success, 4: Callback Form
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Checkbox States
  const [agreed, setAgreed] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); // NEW: Terms checkbox state
  const [showTermsModal, setShowTermsModal] = useState(false); // NEW: Terms modal state

  // Callback Form States
  const [cbHospitalName, setCbHospitalName] = useState("");
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbMessage, setCbMessage] = useState("");
  const [isSubmittingCb, setIsSubmittingCb] = useState(false);

  // Fetch the rate list using the token when the page loads
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing agreement token.");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/client/rates/view/?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load rate list.");
        
        const parsedRates = typeof data.rate_list === 'string' 
          ? JSON.parse(data.rate_list) 
          : data.rate_list;

        setClientData({ ...data, rate_list: parsedRates });
        
        if (data.phone) {
          setPhone(data.phone);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  // Request OTP
  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit registered phone number.");
      return;
    }

    setIsSendingOtp(true);

    fetch(`${BASE_URL}/client/send-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert("OTP sent to your phone.");
          setStep(2); 
        } else {
          alert(data.error || "Failed to send OTP.");
        }
      })
      .catch(() => alert("Network error. Try again."))
      .finally(() => setIsSendingOtp(false));
  };

  // Verify OTP and Agree
  const handleVerifyAndAgree = () => {
    if (!otp || otp.length < 4) {
      alert("Please enter a valid OTP.");
      return;
    }

    setIsVerifying(true);

    fetch(`${BASE_URL}/client/rates/agree/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, phone, otp }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStep(3); 
        } else {
          alert(data.error || "Verification failed. Check OTP or Phone Number.");
        }
      })
      .catch(() => alert("Network error. Try again."))
      .finally(() => setIsVerifying(false));
  };

  // Handle Callback Request Submission to Backend
  const handleCallbackSubmit = async () => {
    if (!cbHospitalName.trim() || !cbName.trim() || !cbPhone.trim()) {
      alert("Please fill in the Hospital Name, Contact Person, and Phone Number.");
      return;
    }

    if (cbPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmittingCb(true);

    try {
      const response = await fetch(`${BASE_URL}/callback-request/submit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital_name: cbHospitalName,
          contact_person: cbName,
          phone: cbPhone,
          message: cbMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Callback request submitted successfully! Our team will contact you soon.");
        setCbHospitalName("");
        setCbName("");
        setCbPhone("");
        setCbMessage("");

        navigate("/");
        setStep(1); 
      } else {
        alert(data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Callback submission error:", error);
      alert("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmittingCb(false);
    }
  };

  if (loading) {
    return <div className="cra-centered">Loading your agreement details...</div>;
  }

  if (error) {
    return (
      <div className="cra-centered cra-error">
        <h2>Oops!</h2>
        <p>{error}</p>
        <p>Please contact support if you believe this is a mistake.</p>
      </div>
    );
  }

  return (
    <div className="cra-wrapper">
      <style>{`
        .cra-wrapper { min-height: 100vh; background-color: #f4f7f9; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: 'DM Sans', sans-serif; color: #333; }
        .cra-card { background: #fff; width: 100%; max-width: 700px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); padding: 30px; }
        .cra-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
        .cra-logo { width: 120px; margin-bottom: 15px; }
        
        .cra-title { font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; }
        .cra-greeting-text { font-size: 16px; color: #555; line-height: 1.5; }
        
        .cra-subtitle { font-size: 14px; color: #666; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #e5e7eb; }
        
        .cra-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px; }
        .cra-table th, .cra-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: center; }
        .cra-table th { background-color: #f9fafb; color: #4b5563; font-weight: 600; }
        .cra-table td.left { text-align: left; }
        
        .cra-form-group { margin-bottom: 20px; text-align: left; }
        .cra-label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #374151; }
        .cra-input { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .cra-input:focus { border-color: #2563eb; }
        
        .cra-btn-group { display: flex; gap: 15px; flex-wrap: wrap; }
        .cra-btn { flex: 1; padding: 14px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
        .cra-btn:hover { background: #1d4ed8; }
        .cra-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        
        .cra-btn-secondary { flex: 1; padding: 14px; background: #fff; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
        .cra-btn-secondary:hover { background: #eff6ff; }
        
        .cra-centered { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: #555; }
        .cra-error { color: #dc2626; text-align: center; }
        .cra-success-icon { font-size: 60px; color: #10b981; margin-bottom: 15px; }
      `}</style>

      <div className="cra-card">
      <div className="cra-header">
        <img src={Logo} alt="Logo" className="cra-logo" />
        
        <h1 className="cra-title">
          Quotation for: {clientData?.client_name}
        </h1>
        
        <p style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "14px", fontWeight: "normal" }}>
          Greetings from U4RAD Technologies<br />
          Thank you for connecting with us.<br />
          Kindly check the rates below:
        </p>

        <p className="cra-info-text" style={{ textAlign: "left", lineHeight: "1.5" }}>
          The rates mentioned below are the standard rates applicable when cases are reported by U4Rad's assigned radiologists.
          <br />
          <br />
          <strong>Note:</strong> Customized radiologist selection is also available. In such cases, pricing is market-driven and may vary based on the selected specialist's experience, qualifications, affiliated institution, and specific requirements.
        </p>
      </div>

        {/* STEP 1: REVIEW RATES */}
        {step === 1 && (
          <div>
            <div style={{ overflowX: "auto" }}>
              <table className="cra-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Modality</th>
                    <th className="left">Case Type</th>
                    <th>Rate (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  {clientData.rate_list.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.modality}</td>
                      <td className="left">{row.caseType}</td>
                      <td><strong>{row.rate}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Existing Rates Agreement Checkbox */}
            <div className="cra-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="agree" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
                I have reviewed the rates proposed above and hereby confirm my acceptance of the same.
              </label>
            </div>

            {/* NEW: Terms and Conditions Checkbox */}
            <div className="cra-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="terms" style={{ fontSize: '14px', color: '#555', display: 'flex', alignItems: 'center' }}>
                I agree to the{" "}
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTermsModal(true);
                  }}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: '0 0 0 4px', 
                    color: '#0066cc', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit'
                  }}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>

            {/* <div className="cra-form-group">
              <label className="cra-label">OTP sent to this Number</label>
              <input 
                type="tel" 
                className="cra-input" 
                placeholder="Enter 10-digit number to receive OTP"
                value={phone}
                maxLength={10}
                disabled={true}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div> */}

            <div className="cra-form-group">
              <p className="cra-label" style={{ marginBottom: "0" }}>
                OTP sent to this Number: <strong>{phone}</strong>
              </p>
            </div>

            <div className="cra-btn-group">
              <button 
                className="cra-btn" 
                onClick={handleSendOtp}
                // Updated disabled logic to require both checkboxes
                disabled={!agreed || !acceptedTerms || phone.length !== 10 || isSendingOtp}
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP to Verify"}
              </button>
              
              <button 
                className="cra-btn-secondary" 
                onClick={() => setStep(4)}
              >
                Request Callback
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ENTER OTP */}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Verification Required</h3>
            <p style={{ marginBottom: "25px", color: "#666", fontSize: "14px" }}>
              We have sent a 6-digit code to <strong>+91 {phone}</strong>.
            </p>

            <div className="cra-form-group">
              <input 
                type="text" 
                className="cra-input" 
                placeholder="Enter OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{ textAlign: "center", fontSize: "20px", letterSpacing: "5px" }}
              />
            </div>

            <button 
              className="cra-btn" 
              onClick={handleVerifyAndAgree}
              disabled={otp.length < 4 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify & Confirm Agreement"}
            </button>
            
            <button 
              style={{ background: 'none', border: 'none', color: '#2563eb', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setStep(1)}
            >
              ← Go back
            </button>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div className="cra-success-icon">✓</div>
            <h2 style={{ color: "#111", marginBottom: "10px" }}>Agreement Confirmed!</h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Thank you, <strong>{clientData.client_name}</strong>. You have successfully verified and agreed to the rate list.
            </p>
            <p style={{ color: "#555", marginTop: "15px" }}>
              You may now close this window. Our team will contact you shortly to finalize your onboarding.
              You or you can reach out on +91 8587075085
            </p>
          </div>
        )}

        {/* STEP 4: CALLBACK FORM */}
        {step === 4 && (
          <>
            <style>
              {`
                .premium-cb-container {
                  max-width: 480px;
                  margin: 0 auto;
                  background: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 20px;
                  padding: 40px 32px;
                  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
                  font-family: 'DM Sans', sans-serif;
                  animation: fadeInCb 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes fadeInCb {
                  0% { opacity: 0; transform: translateY(10px) scale(0.98); }
                  100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                .premium-cb-header {
                  text-align: center;
                  margin-bottom: 32px;
                }

                .premium-cb-icon-box {
                  width: 56px;
                  height: 56px;
                  margin: 0 auto 20px;
                  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                  border-radius: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #dc2626;
                  box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.15);
                }

                .premium-cb-icon-box svg { width: 26px; height: 26px; }
                .premium-cb-title { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 8px; letter-spacing: -0.02em; }
                .premium-cb-subtitle { font-size: 14px; color: #64748b; line-height: 1.6; padding: 0 10px; }

                .premium-cb-form { display: flex; flex-direction: column; gap: 24px; }
                .premium-input-group { position: relative; width: 100%; }

                .premium-input {
                  width: 100%;
                  background: transparent;
                  border: 1px solid #cbd5e1;
                  border-radius: 12px;
                  padding: 18px 16px 14px;
                  font-size: 15px;
                  color: #0f172a;
                  outline: none;
                  transition: all 0.25s ease;
                  font-family: 'DM Sans', sans-serif;
                  box-sizing: border-box;
                }

                .premium-input.with-prefix { padding-left: 62px; }
                .premium-textarea { resize: vertical; min-height: 110px; }

                .premium-floating-label {
                  position: absolute;
                  left: 16px;
                  top: 50%;
                  transform: translateY(-50%);
                  font-size: 15px;
                  color: #64748b;
                  pointer-events: none;
                  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                  background: #ffffff;
                  padding: 0 4px;
                }

                .premium-textarea ~ .premium-floating-label { top: 26px; }
                .premium-input-group .prefix-label { left: 62px; }

                .premium-input:focus ~ .premium-floating-label,
                .premium-input:not(:placeholder-shown) ~ .premium-floating-label,
                .premium-input:valid ~ .premium-floating-label {
                  top: 0;
                  font-size: 12px;
                  font-weight: 600;
                  color: #dc2626;
                  transform: translateY(-50%);
                }

                .premium-input-group .premium-input.with-prefix:focus ~ .prefix-label,
                .premium-input-group .premium-input.with-prefix:valid ~ .prefix-label,
                .premium-input-group .premium-input.with-prefix:not(:placeholder-shown) ~ .prefix-label {
                  left: 12px; 
                }

                .premium-input:focus {
                  border-color: #dc2626;
                  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12);
                }

                .premium-prefix {
                  position: absolute;
                  left: 16px;
                  top: 50%;
                  transform: translateY(-50%);
                  font-size: 15px;
                  color: #0f172a;
                  font-weight: 500;
                  pointer-events: none;
                  border-right: 1px solid #e2e8f0;
                  padding-right: 12px;
                  font-family: 'DM Mono', monospace;
                }

                .premium-submit-btn {
                  width: 100%;
                  padding: 16px;
                  background: #dc2626;
                  color: #ffffff;
                  border: none;
                  border-radius: 12px;
                  font-size: 15px;
                  font-weight: 600;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: all 0.2s ease;
                  margin-top: 8px;
                  font-family: 'DM Sans', sans-serif;
                }

                .premium-submit-btn:hover:not(:disabled) {
                  background: #b91c1c; 
                  box-shadow: 0 8px 20px -6px rgba(220, 38, 38, 0.4);
                  transform: translateY(-1px);
                }

                .premium-submit-btn:active:not(:disabled) { transform: translateY(0); }
                .premium-submit-btn.loading { opacity: 0.8; cursor: not-allowed; }

                .premium-spinner {
                  width: 20px;
                  height: 20px;
                  border: 2px solid rgba(255,255,255,0.3);
                  border-top-color: #ffffff;
                  border-radius: 50%;
                  animation: premiumSpin 0.8s linear infinite;
                }

                @keyframes premiumSpin { 100% { transform: rotate(360deg); } }

                .premium-cb-footer {
                  margin-top: 24px;
                  text-align: center;
                  border-top: 1px solid #f1f5f9;
                  padding-top: 24px;
                }

                .premium-back-btn {
                  background: transparent;
                  border: none;
                  color: #64748b;
                  font-size: 14px;
                  font-weight: 500;
                  cursor: pointer;
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  transition: color 0.2s ease;
                  font-family: 'DM Sans', sans-serif;
                }

                .premium-back-btn svg { width: 16px; height: 16px; }
                .premium-back-btn:hover { color: #0f172a; }
              `}
            </style>

            <div className="premium-cb-container">
              <div className="premium-cb-header">
                <div className="premium-cb-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </div>
                <h2 className="premium-cb-title">Request a Callback</h2>
                <p className="premium-cb-subtitle">
                  Prefer to speak with an expert? Drop your details and our onboarding team will connect with you.
                </p>
              </div>

              <div className="premium-cb-form">
                <div className="premium-input-group">
                  <input
                    type="text"
                    className="premium-input"
                    placeholder=" " 
                    value={cbHospitalName}
                    onChange={(e) => setCbHospitalName(e.target.value)}
                    required
                  />
                  <label className="premium-floating-label">Hospital / Center Name</label>
                </div>

                <div className="premium-input-group">
                  <input
                    type="text"
                    className="premium-input"
                    placeholder=" " 
                    value={cbName}
                    onChange={(e) => setCbName(e.target.value)}
                    required
                  />
                  <label className="premium-floating-label">Contact Person Name</label>
                </div>

                <div className="premium-input-group">
                  <span className="premium-prefix">+91</span>
                  <input
                    type="tel"
                    className="premium-input with-prefix"
                    placeholder=" "
                    value={cbPhone}
                    maxLength={10}
                    onChange={(e) => setCbPhone(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                  <label className="premium-floating-label prefix-label">Phone Number</label>
                </div>

                <div className="premium-input-group">
                  <textarea
                    className="premium-input premium-textarea"
                    placeholder=" "
                    value={cbMessage}
                    onChange={(e) => setCbMessage(e.target.value)}
                    required
                    rows="3"
                  />
                  <label className="premium-floating-label">Additional Requirements (Optional)</label>
                </div>

                <button
                  className={`premium-submit-btn ${isSubmittingCb ? 'loading' : ''}`}
                  onClick={handleCallbackSubmit}
                  disabled={isSubmittingCb}
                >
                  {isSubmittingCb ? (
                    <span className="premium-spinner"></span>
                  ) : (
                    <span>Request Callback →</span>
                  )}
                </button>
              </div>

              <div className="premium-cb-footer">
                <button className="premium-back-btn" onClick={() => setStep(1)}>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Return to Rates
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* NEW: Render Terms Modal if state is true */}
      {showTermsModal && (
        <Terms onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
}