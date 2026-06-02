// import React, { useState, useRef, useCallback } from "react";
// import { validators, formatPAN, sanitizeInput } from "../utils/validators";
// import { BASE_URL } from "../../apiconnector";
// import "./ClientOnboarding.css";
// import Terms from "./Terms"; // <-- Imported the new Terms component

// const MODALITIES = [
//   { id: "XRAY",  label: "X-Ray",       icon: "🫁" },
//   { id: "CT",    label: "CT Scan",      icon: "🧠" },
//   { id: "MRI",   label: "MRI",          icon: "🔬" },
//   { id: "ECG",   label: "ECG",          icon: "💓" },
//   { id: "MAMMO", label: "Mammography",  icon: "🩺" },
// ];

// const InputField = ({
//   label, name, type = "text", value, onChange,
//   error, placeholder, required, maxLength, prefix, hint,
// }) => (
//   <div className={`co-field ${error ? "co-field--error" : ""}`}>
//     <label className="co-label">
//       {label} {required && <span className="co-required">*</span>}
//     </label>
//     <div className="co-input-wrap">
//       {prefix && <span className="co-prefix">{prefix}</span>}
//       <input
//         className={`co-input ${prefix ? "co-input--prefix" : ""}`}
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         maxLength={maxLength}
//         autoComplete="off"
//         spellCheck={false}
//       />
//     </div>
//     {hint && !error && <p className="co-hint">{hint}</p>}
//     {error && <p className="co-error">{error}</p>}
//   </div>
// );

// const ClientOnboarding = ({ onClose, onSuccess, asPage = false }) => {
//   const [form, setForm] = useState({
//     clientName:    "",
//     address:       "",
//     pincode:       "",
//     contactPerson: "",
//     phone:         "",
//     email:         "",
//     modalities:    [],
//     pan:           "",
//     panCard:       null,
//     acceptedTerms: false, // Tracks if the checkbox is checked
//   });
  
//   const [errors,      setErrors]      = useState({});
//   const [panFileName, setPanFileName] = useState("");
//   const [submitting,  setSubmitting]  = useState(false);
//   const [submitted,   setSubmitted]   = useState(false);
  
//   // State to control whether the Terms modal is open or closed
//   const [showTermsModal, setShowTermsModal] = useState(false); 
  
//   const panCardRef = useRef();

//   const set = useCallback(
//     (field) => (e) => {
//       const val = e.target ? e.target.value : e;
//       setForm((f) => ({ ...f, [field]: val }));
//       setErrors((err) => ({ ...err, [field]: null }));
//     }, []
//   );

//   const handlePAN = (e) => {
//     const formatted = formatPAN(e.target.value);
//     setForm((f) => ({ ...f, pan: formatted }));
//     setErrors((err) => ({ ...err, pan: null }));
//   };

//   const handlePhone = (e) => {
//     const val = e.target.value.replace(/\D/g, "").slice(0, 10);
//     setForm((f) => ({ ...f, phone: val }));
//     setErrors((err) => ({ ...err, phone: null }));
//   };

//   const handleModality = (id) => {
//     setForm((f) => {
//       const updated = f.modalities.includes(id)
//         ? f.modalities.filter((m) => m !== id)
//         : [...f.modalities, id];
//       return { ...f, modalities: updated };
//     });
//     setErrors((err) => ({ ...err, modalities: null }));
//   };

//   const handlePanCardUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const err = validators.panCard(file);
//     if (err) { setErrors((prev) => ({ ...prev, panCard: err })); return; }
//     setForm((f) => ({ ...f, panCard: file }));
//     setPanFileName(file.name);
//     setErrors((prev) => ({ ...prev, panCard: null }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     newErrors.clientName    = validators.clientName(form.clientName);
//     newErrors.address       = validators.address(form.address);
//     newErrors.pincode       = validators.pincode(form.pincode);
//     newErrors.contactPerson = validators.contactPerson(form.contactPerson);
//     newErrors.phone         = validators.phone(form.phone);
//     newErrors.email         = validators.email(form.email);
//     newErrors.modalities    = validators.modalities(form.modalities);
//     newErrors.pan           = validators.pan(form.pan);
//     newErrors.panCard       = validators.panCard(form.panCard);

//     const filtered = Object.fromEntries(
//       Object.entries(newErrors).filter(([, v]) => v !== null)
//     );
//     setErrors(filtered);
//     return Object.keys(filtered).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);

//     try {
//       const payload = new FormData();
//       payload.append("clientName",    sanitizeInput(form.clientName.trim()));
//       payload.append("address",       sanitizeInput(form.address.trim()));
//       payload.append("pincode",       form.pincode);
//       payload.append("contactPerson", sanitizeInput(form.contactPerson.trim()));
//       payload.append("phone",         form.phone);
//       payload.append("email",         form.email.trim().toLowerCase());
//       payload.append("modalities",    JSON.stringify(form.modalities));
//       payload.append("pan",           form.pan.toUpperCase());
//       payload.append("panCard",       form.panCard);

//       const res = await fetch(`${BASE_URL}/client/register/`, {
//         method: "POST",
//         body:   payload,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         const backendErrors = {};
//         if (data.clientName)    backendErrors.clientName    = data.clientName;
//         if (data.address)       backendErrors.address       = data.address;
//         if (data.pincode)       backendErrors.pincode       = data.pincode;
//         if (data.contactPerson) backendErrors.contactPerson = data.contactPerson;
//         if (data.phone)         backendErrors.phone         = data.phone;
//         if (data.email)         backendErrors.email         = data.email;
//         if (data.modalities)    backendErrors.modalities    = data.modalities;
//         if (data.pan)           backendErrors.pan           = data.pan;
//         if (data.panCard)       backendErrors.panCard       = data.panCard;
//         if (data.error)         backendErrors.submit        = data.error;
//         setErrors(backendErrors);
//         setSubmitting(false);
//         return;
//       }

//       setSubmitted(true);
//       if (onSuccess) onSuccess(form);

//     } catch (err) {
//       setErrors({ submit: "Network error. Please check your connection and try again." });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /* ── Success Screen ─────────────────────────────────────── */
//   if (submitted) {
//     return (
//       <div className="co-page-wrap">
//         <div className="co-success-screen">
//           <div className="co-success-icon">🎉</div>
//           <h2>Thank You!</h2>
//           <p>
//             Your registration for <strong>{form.clientName}</strong> has been
//             submitted successfully.
//           </p>
//           <p className="co-success-email">
//             We’ll review and get back within 24 hours at{" "}
//             <strong>{form.email}</strong>
//           </p>
//           <button className="co-btn co-btn--primary" onClick={onClose}>
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Main Form ──────────────────────────────────────────── */
//   return (
//     <div
//       className={asPage ? "co-page-wrap" : "co-overlay"}
//       onClick={asPage ? undefined : onClose}
//     >
//       <div className="co-modal" onClick={(e) => e.stopPropagation()}>

//         {/* Header */}
//         <div className="co-header">
//           <div className="co-header-left">
//             <div className="co-logo-badge">C</div>
//             <div>
//               <h1 className="co-title">Client Registration</h1>
//               <p className="co-subtitle">Hospitals & Diagnostic Centers</p>
//             </div>
//           </div>
//           <button className="co-close" onClick={onClose} aria-label="Close">✕</button>
//         </div>

//         {/* Progress Strip */}
//         <div className="co-progress"><div className="co-progress-bar" /></div>

//         <form className="co-body" onSubmit={handleSubmit} noValidate>

//           {/* ── Section 01: Organization ── */}
//           <div className="co-section">
//             <h3 className="co-section-title">
//               <span className="co-section-num">01</span>
//               Organization Details
//             </h3>
//             <div className="co-grid-1">
//               <InputField
//                 label="Hospital / Center Name" name="clientName"
//                 value={form.clientName} onChange={set("clientName")}
//                 error={errors.clientName}
//                 placeholder="e.g. Apollo Diagnostics, City Scan Centre"
//                 required maxLength={100}
//               />
//             </div>
//             <div className="co-grid-2">
//               <InputField
//                 label="Full Address" name="address"
//                 value={form.address} onChange={set("address")}
//                 error={errors.address}
//                 placeholder="Building, Street, Area, City, State"
//                 required
//               />
//               <InputField
//                 label="PIN Code" name="pincode"
//                 value={form.pincode}
//                 onChange={(e) => {
//                   const v = e.target.value.replace(/\D/g, "").slice(0, 6);
//                   setForm((f) => ({ ...f, pincode: v }));
//                   setErrors((err) => ({ ...err, pincode: null }));
//                 }}
//                 error={errors.pincode}
//                 placeholder="110001" required maxLength={6}
//               />
//             </div>
//           </div>

//           {/* ── Section 02: Contact ── */}
//           <div className="co-section">
//             <h3 className="co-section-title">
//               <span className="co-section-num">02</span>
//               Contact Information
//             </h3>
//             <div className="co-grid-1">
//               <InputField
//                 label="Contact Person Name" name="contactPerson"
//                 value={form.contactPerson} onChange={set("contactPerson")}
//                 error={errors.contactPerson}
//                 placeholder="Full name of the authorized person"
//                 required
//               />
//             </div>

//             {/* Phone */}
//             <div className="co-field">
//               <label className="co-label">
//                 Phone Number <span className="co-required">*</span>
//               </label>
//               <div className="co-input-wrap">
//                 <span className="co-prefix">+91</span>
//                 <input
//                   className="co-input co-input--prefix"
//                   type="tel"
//                   value={form.phone}
//                   onChange={handlePhone}
//                   placeholder="10-digit mobile number"
//                   maxLength={10}
//                   autoComplete="tel"
//                 />
//               </div>
//               {errors.phone && <p className="co-error">{errors.phone}</p>}
//             </div>

//             <InputField
//               label="Email Address" name="email" type="email"
//               value={form.email} onChange={set("email")}
//               error={errors.email}
//               placeholder="contact@hospital.com"
//               required
//             />
//           </div>

//           {/* ── Section 03: Modalities ── */}
//           <div className="co-section">
//             <h3 className="co-section-title">
//               <span className="co-section-num">03</span>
//               Modalities Offered
//             </h3>
//             <p className="co-section-desc">
//               Select all imaging modalities available at your center
//             </p>
//             <div className="co-modalities">
//               {MODALITIES.map(({ id, label, icon }) => (
//                 <button
//                   key={id}
//                   type="button"
//                   className={`co-modality ${form.modalities.includes(id) ? "co-modality--selected" : ""}`}
//                   onClick={() => handleModality(id)}
//                 >
//                   <span className="co-modality-icon">{icon}</span>
//                   <span className="co-modality-label">{label}</span>
//                   <span className="co-modality-check">
//                     {form.modalities.includes(id) ? "✓" : ""}
//                   </span>
//                 </button>
//               ))}
//             </div>
//             {errors.modalities && <p className="co-error">{errors.modalities}</p>}
//           </div>

//           {/* ── Section 04: KYC ── */}
//           <div className="co-section">
//             <h3 className="co-section-title">
//               <span className="co-section-num">04</span>
//               KYC / Tax Details
//             </h3>
//             <div className="co-grid-2">
//               <div className={`co-field ${errors.pan ? "co-field--error" : ""}`}>
//                 <label className="co-label">
//                   PAN Number <span className="co-required">*</span>
//                 </label>
//                 <div className="co-input-wrap">
//                   <input
//                     className="co-input co-pan-input"
//                     type="text"
//                     value={form.pan}
//                     onChange={handlePAN}
//                     placeholder="ABCDE1234F"
//                     maxLength={10}
//                     style={{ letterSpacing: "0.15em", fontFamily: "monospace" }}
//                     autoComplete="off"
//                   />
//                 </div>
//                 <p className="co-hint">Format: 5 letters · 4 digits · 1 letter</p>
//                 {errors.pan && <p className="co-error">{errors.pan}</p>}
//               </div>

//               <div className={`co-field ${errors.panCard ? "co-field--error" : ""}`}>
//                 <label className="co-label">
//                   PAN Card Upload <span className="co-required">*</span>
//                 </label>
//                 <div className="co-upload" onClick={() => panCardRef.current?.click()}>
//                   <input
//                     ref={panCardRef}
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={handlePanCardUpload}
//                     hidden
//                   />
//                   {panFileName ? (
//                     <div className="co-upload-done">
//                       <span className="co-upload-icon">📄</span>
//                       <span className="co-upload-name">{panFileName}</span>
//                       <span className="co-upload-change">Change</span>
//                     </div>
//                   ) : (
//                     <div className="co-upload-prompt">
//                       <span className="co-upload-icon">⬆</span>
//                       <span>
//                         Click to upload{" "}
//                         <span className="co-upload-sub">JPG, PNG or PDF · max 5MB</span>
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 {errors.panCard && <p className="co-error">{errors.panCard}</p>}
//               </div>
//             </div>
//           </div>

//           {/* ── Section 05: Terms & Conditions ── */}
//           <div className="co-section" style={{ paddingBottom: "10px" }}>
//             <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
//               <input
//                 type="checkbox"
//                 checked={form.acceptedTerms}
//                 onChange={(e) => {
//                   setForm((f) => ({ ...f, acceptedTerms: e.target.checked }));
//                 }}
//                 style={{ width: '18px', height: '18px', cursor: 'pointer' }}
//               />
//               <span style={{ fontSize: '14px', color: '#555' }}>
//                 I agree to the{" "}
//                 <button 
//                   type="button" 
//                   onClick={() => setShowTermsModal(true)}
//                   style={{ 
//                     background: 'none', 
//                     border: 'none', 
//                     padding: 0, 
//                     color: '#0066cc', 
//                     textDecoration: 'underline', 
//                     cursor: 'pointer',
//                     fontSize: 'inherit',
//                     fontFamily: 'inherit'
//                   }}
//                 >
//                   Terms and Conditions
//                 </button>
//               </span>
//             </label>
//           </div>

//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="co-submit-error">{errors.submit}</div>
//           )}

//           {/* Footer */}
//           <div className="co-footer">
//             <div className="co-footer-btns co-footer-btns--center">
//               <button type="button" className="co-btn co-btn--secondary" onClick={onClose}>
//                 Cancel
//               </button>
              
//               <button
//                 type="submit"
//                 className={`co-btn co-btn--primary ${submitting ? "co-btn--loading" : ""}`}
//                 disabled={submitting || !form.acceptedTerms}
//                 style={{
//                   opacity: (!form.acceptedTerms || submitting) ? 0.6 : 1,
//                   cursor: (!form.acceptedTerms || submitting) ? 'not-allowed' : 'pointer',
//                   transition: 'opacity 0.2s ease'
//                 }}
//               >
//                 {submitting
//                   ? <span className="co-spinner">Submitting…</span>
//                   : "Submit Registration"}
//               </button>
//             </div>
//           </div>

//         </form>
//       </div>

//       {/* ── Render Terms Modal if state is true ── */}
//       {showTermsModal && (
//         <Terms onClose={() => setShowTermsModal(false)} />
//       )}

//     </div>
//   );
// };

// export default ClientOnboarding;




import React, { useState, useRef, useCallback } from "react";
import { validators, formatPAN, sanitizeInput } from "../utils/validators";
import { BASE_URL } from "../../apiconnector";
import "./ClientOnboarding.css";
import Terms from "./Terms";

const MODALITIES = [
  { id: "XRAY",  label: "X-Ray",       icon: "🫁" },
  { id: "CT",    label: "CT Scan",      icon: "🧠" },
  { id: "MRI",   label: "MRI",          icon: "🔬" },
  { id: "ECG",   label: "ECG",          icon: "💓" },
  { id: "MAMMO", label: "Mammography",  icon: "🩺" },
];

const InputField = ({
  label, name, type = "text", value, onChange,
  error, placeholder, required, maxLength, prefix, hint,
}) => (
  <div className={`co-field ${error ? "co-field--error" : ""}`}>
    <label className="co-label">
      {label} {required && <span className="co-required">*</span>}
    </label>
    <div className="co-input-wrap">
      {prefix && <span className="co-prefix">{prefix}</span>}
      <input
        className={`co-input ${prefix ? "co-input--prefix" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
    {hint && !error && <p className="co-hint">{hint}</p>}
    {error && <p className="co-error">{error}</p>}
  </div>
);

const ClientOnboarding = ({ onClose, onSuccess, asPage = false }) => {
  const [form, setForm] = useState({
    clientName:    "",
    address:       "",
    pincode:       "",
    contactPerson: "",
    phone:         "",
    email:         "",
    modalities:    [],
    pan:           "",
    panCard:       null,
    acceptedTerms: false,
  });
  
  const [errors,      setErrors]      = useState({});
  const [panFileName, setPanFileName] = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  
  const [showTermsModal, setShowTermsModal] = useState(false); 
  
  const panCardRef = useRef();

  const set = useCallback(
    (field) => (e) => {
      const val = e.target ? e.target.value : e;
      setForm((f) => ({ ...f, [field]: val }));
      setErrors((err) => ({ ...err, [field]: null }));
    }, []
  );

  const handlePAN = (e) => {
    const formatted = formatPAN(e.target.value);
    setForm((f) => ({ ...f, pan: formatted }));
    setErrors((err) => ({ ...err, pan: null }));
  };

  const handlePhone = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone: val }));
    setErrors((err) => ({ ...err, phone: null }));
  };

  const handleModality = (id) => {
    setForm((f) => {
      const updated = f.modalities.includes(id)
        ? f.modalities.filter((m) => m !== id)
        : [...f.modalities, id];
      return { ...f, modalities: updated };
    });
    setErrors((err) => ({ ...err, modalities: null }));
  };

  const handlePanCardUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const err = validators.panCard(file);
    if (err) { setErrors((prev) => ({ ...prev, panCard: err })); return; }
    setForm((f) => ({ ...f, panCard: file }));
    setPanFileName(file.name);
    setErrors((prev) => ({ ...prev, panCard: null }));
  };

  const validate = () => {
    const newErrors = {};
    newErrors.clientName    = validators.clientName(form.clientName);
    newErrors.address       = validators.address(form.address);
    newErrors.pincode       = validators.pincode(form.pincode);
    newErrors.contactPerson = validators.contactPerson(form.contactPerson);
    newErrors.phone         = validators.phone(form.phone);
    newErrors.email         = validators.email(form.email);
    newErrors.modalities    = validators.modalities(form.modalities);
    newErrors.pan           = form.pan ? validators.pan(form.pan) : null;
    newErrors.panCard       = form.panCard ? validators.panCard(form.panCard) : null;

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== null)
    );
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("clientName",    sanitizeInput(form.clientName.trim()));
      payload.append("address",       sanitizeInput(form.address.trim()));
      payload.append("pincode",       form.pincode);
      payload.append("contactPerson", sanitizeInput(form.contactPerson.trim()));
      payload.append("phone",         form.phone);
      payload.append("email",         form.email.trim().toLowerCase());
      payload.append("modalities",    JSON.stringify(form.modalities));
      
      if (form.pan) {
        payload.append("pan", form.pan.toUpperCase());
      }
      if (form.panCard) {
        payload.append("panCard", form.panCard);
      }

      const res = await fetch(`${BASE_URL}/client/register/`, {
        method: "POST",
        body:   payload,
      });

      const data = await res.json();

      if (!res.ok) {
        const backendErrors = {};
        if (data.clientName)    backendErrors.clientName    = data.clientName;
        if (data.address)       backendErrors.address       = data.address;
        if (data.pincode)       backendErrors.pincode       = data.pincode;
        if (data.contactPerson) backendErrors.contactPerson = data.contactPerson;
        if (data.phone)         backendErrors.phone         = data.phone;
        if (data.email)         backendErrors.email         = data.email;
        if (data.modalities)    backendErrors.modalities    = data.modalities;
        if (data.pan)           backendErrors.pan           = data.pan;
        if (data.panCard)       backendErrors.panCard       = data.panCard;
        if (data.error)         backendErrors.submit        = data.error;
        setErrors(backendErrors);
        setSubmitting(false);
        return;
      }

      setSubmitted(true);

    } catch (err) {
      setErrors({ submit: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Main Form ──────────────────────────────────────────── */
  return (
    <div
      className={asPage ? "co-page-wrap" : "co-overlay"}
      onClick={asPage ? undefined : onClose}
    >
      <div className="co-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="co-header">
          <div className="co-header-left">
            <div className="co-logo-badge">C</div>
            <div>
              <h1 className="co-title">Client Registration</h1>
              <p className="co-subtitle">Hospitals & Diagnostic Centers</p>
            </div>
          </div>
          <button className="co-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Progress Strip */}
        <div className="co-progress"><div className="co-progress-bar" /></div>

        <form className="co-body" onSubmit={handleSubmit} noValidate>

          {/* ── Section 01: Organization ── */}
          <div className="co-section">
            <h3 className="co-section-title">
              <span className="co-section-num">01</span>
              Organization Details
            </h3>
            <div className="co-grid-1">
              <InputField
                label="Hospital / Center Name" name="clientName"
                value={form.clientName} onChange={set("clientName")}
                error={errors.clientName}
                placeholder="e.g. Apollo Diagnostics, City Scan Centre"
                required maxLength={100}
              />
            </div>
            <div className="co-grid-2">
              <InputField
                label="Full Address" name="address"
                value={form.address} onChange={set("address")}
                error={errors.address}
                placeholder="Building, Street, Area, City, State"
                required
              />
              <InputField
                label="PIN Code" name="pincode"
                value={form.pincode}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setForm((f) => ({ ...f, pincode: v }));
                  setErrors((err) => ({ ...err, pincode: null }));
                }}
                error={errors.pincode}
                placeholder="110001" required maxLength={6}
              />
            </div>
          </div>

          {/* ── Section 02: Contact ── */}
          <div className="co-section">
            <h3 className="co-section-title">
              <span className="co-section-num">02</span>
              Contact Information
            </h3>
            <div className="co-grid-1">
              <InputField
                label="Contact Person Name" name="contactPerson"
                value={form.contactPerson} onChange={set("contactPerson")}
                error={errors.contactPerson}
                placeholder="Full name of the authorized person"
                required
              />
            </div>

            {/* Phone */}
            <div className="co-field">
              <label className="co-label">
                Phone Number <span className="co-required">*</span>
              </label>
              <div className="co-input-wrap">
                <span className="co-prefix">+91</span>
                <input
                  className="co-input co-input--prefix"
                  type="tel"
                  value={form.phone}
                  onChange={handlePhone}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <p className="co-error">{errors.phone}</p>}
            </div>

            <InputField
              label="Email Address" name="email" type="email"
              value={form.email} onChange={set("email")}
              error={errors.email}
              placeholder="contact@hospital.com"
              required
            />
          </div>

          {/* ── Section 03: Modalities ── */}
          <div className="co-section">
            <h3 className="co-section-title">
              <span className="co-section-num">03</span>
              Modalities Offered
            </h3>
            <p className="co-section-desc">
              Select all imaging modalities available at your center
            </p>
            <div className="co-modalities">
              {MODALITIES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`co-modality ${form.modalities.includes(id) ? "co-modality--selected" : ""}`}
                  onClick={() => handleModality(id)}
                >
                  <span className="co-modality-icon">{icon}</span>
                  <span className="co-modality-label">{label}</span>
                  <span className="co-modality-check">
                    {form.modalities.includes(id) ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>
            {errors.modalities && <p className="co-error">{errors.modalities}</p>}
          </div>

          {/* ── Section 04: KYC ── */}
          <div className="co-section">
            <h3 className="co-section-title">
              <span className="co-section-num">04</span>
              KYC / Tax Details <span style={{ fontSize: "14px", color: "#666", fontWeight: "normal", marginLeft: "8px" }}>(Optional)</span>
            </h3>
            <div className="co-grid-2">
              <div className={`co-field ${errors.pan ? "co-field--error" : ""}`}>
                <label className="co-label">
                  PAN Number
                </label>
                <div className="co-input-wrap">
                  <input
                    className="co-input co-pan-input"
                    type="text"
                    value={form.pan}
                    onChange={handlePAN}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    style={{ letterSpacing: "0.15em", fontFamily: "monospace" }}
                    autoComplete="off"
                  />
                </div>
                <p className="co-hint">Format: 5 letters · 4 digits · 1 letter</p>
                {errors.pan && <p className="co-error">{errors.pan}</p>}
              </div>

              <div className={`co-field ${errors.panCard ? "co-field--error" : ""}`}>
                <label className="co-label">
                  PAN Card Upload
                </label>
                <div className="co-upload" onClick={() => panCardRef.current?.click()}>
                  <input
                    ref={panCardRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePanCardUpload}
                    hidden
                  />
                  {panFileName ? (
                    <div className="co-upload-done">
                      <span className="co-upload-icon">📄</span>
                      <span className="co-upload-name">{panFileName}</span>
                      <span className="co-upload-change">Change</span>
                    </div>
                  ) : (
                    <div className="co-upload-prompt">
                      <span className="co-upload-icon">⬆</span>
                      <span>
                        Click to upload{" "}
                        <span className="co-upload-sub">JPG, PNG or PDF · max 5MB</span>
                      </span>
                    </div>
                  )}
                </div>
                {errors.panCard && <p className="co-error">{errors.panCard}</p>}
              </div>
            </div>
          </div>

          {/* ── Section 05: Terms & Conditions ── */}
          <div className="co-section" style={{ paddingBottom: "10px" }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={(e) => {
                  setForm((f) => ({ ...f, acceptedTerms: e.target.checked }));
                }}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#555' }}>
                I agree to the{" "}
                <button 
                  type="button" 
                  onClick={() => setShowTermsModal(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    color: '#0066cc', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit'
                  }}
                >
                  Terms and Conditions
                </button>
              </span>
            </label>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="co-submit-error">{errors.submit}</div>
          )}

          {/* Footer */}
          <div className="co-footer">
            <div className="co-footer-btns co-footer-btns--center">
              <button type="button" className="co-btn co-btn--secondary" onClick={onClose}>
                Cancel
              </button>
              
              <button
                type="submit"
                className={`co-btn co-btn--primary ${submitting ? "co-btn--loading" : ""}`}
                disabled={submitting || !form.acceptedTerms}
                style={{
                  opacity: (!form.acceptedTerms || submitting) ? 0.6 : 1,
                  cursor: (!form.acceptedTerms || submitting) ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                {submitting
                  ? <span className="co-spinner">Submitting…</span>
                  : "Submit Registration"}
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* ── Render Terms Modal if state is true ── */}
      {showTermsModal && (
        <Terms onClose={() => setShowTermsModal(false)} />
      )}

      {/* ── SUCCESS POPUP MODAL (Floats over the form!) ── */}
      {submitted && (
        <div 
          className="co-overlay" 
          onClick={onClose} 
          style={{ 
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)" 
          }}
        >
          <div 
            className="co-modal" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: "500px", width: "90%", paddingBottom: "30px", margin: 0 }}
          >
            {/* Header just for the cross button */}
            <div className="co-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <div className="co-header-left"></div>
              <button className="co-close" onClick={onClose} aria-label="Close">✕</button>
            </div>

            {/* Centered Success Content */}
            <div className="co-success-screen" style={{ textAlign: "center", padding: "0 20px" }}>
              <div className="co-success-icon" style={{ fontSize: "50px", marginBottom: "15px" }}>🎉</div>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Thank You!</h2>
              <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
                Your registration for <strong>{form.clientName}</strong> has been
                submitted successfully.
              </p>
              <p className="co-success-email" style={{ marginTop: "15px", fontSize: "14px", color: "#666", lineHeight: "1.5" }}>
                Our team will call you shortly to proceed further, or you can reach out to us directly at{" "}
                <strong>+91 85********</strong>
              </p>
              <button 
                className="co-btn co-btn--primary" 
                onClick={onClose} 
                style={{ marginTop: "25px", padding: "10px 30px" }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientOnboarding;