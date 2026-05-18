// import { useState, useContext } from "react";
// import { FormContext } from "../../components/context/FormContext";
// import "../styles/form.css";

// export default function Step6ReportingArea() {
//   const { formData, updateSection } = useContext(FormContext);

//   // Field names:
//   // mriopt → mri_options ✅ (mapped in DoctorOnboardingForm)
//   // ctopt  → ct_options  ✅
//   // xray   → xray        ✅
//   // other  → others      ✅ (mapped in DoctorOnboardingForm as r.other)
//   // otherText → others_description ✅ (mapped as r.otherText)
//   const [data, setData] = useState(
//     formData.reporting || {
//       mriopt: [],
//       ctopt: [],
//       mriothers: "",
//       ctothers: "",
//       xray: false,
//       other: false,
//       otherText: ""
//     }
//   );

//   const handleChange = (e) => {
//     const { name, value, type, checked, options } = e.target;

//     let updatedValue;
//     if (type === "select-multiple") {
//       updatedValue = Array.from(options)
//         .filter((o) => o.selected)
//         .map((o) => o.value);
//     } else if (type === "checkbox") {
//       updatedValue = checked;
//     } else {
//       updatedValue = value;
//     }

//     const updated = { ...data, [name]: updatedValue };
//     setData(updated);
//     updateSection("reporting", updated);
//   };

//   return (
//     <div className="form-wrapper">
//       <h2 className="form-title">Radiologist's Signup Form</h2>

//       <div className="progress-steps">
//         {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
//           <div key={index} className="step">
//             <span className={`circle ${index === 5 ? "active" : ""}`}>{index + 1}</span>
//             <p>{step}</p>
//           </div>
//         ))}
//       </div>

//       <h3 className="section-title">Reporting Area :</h3>

//       {/* MRI */}
//       <div className="form-group">
//         <label>MRI :</label>
//         <small>(Hold Ctrl to select multiple)</small>
//         <select multiple name="mriopt" className="form-field" value={data.mriopt} onChange={handleChange}>
//           <option value="Brain">Brain</option>
//           <option value="Spine">Spine</option>
//           <option value="MSK">MSK</option>
//           <option value="Body">Body</option>
//         </select>
//         <label style={{ marginTop: "10px" }}>Other MRI (specify)</label>
//         <input
//           type="text"
//           name="mriothers"
//           maxLength="100"
//           value={data.mriothers || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* CT */}
//       <div className="form-group">
//         <label>CT :</label>
//         <small>(Hold Ctrl to select multiple)</small>
//         <select multiple name="ctopt" className="form-field" value={data.ctopt} onChange={handleChange}>
//           <option value="Brain">Brain</option>
//           <option value="Chest">Chest</option>
//           <option value="Abdomen">Abdomen</option>
//           <option value="Neck">Neck</option>
//           <option value="Angio">Angio</option>
//         </select>
//         <label style={{ marginTop: "10px" }}>Other CT (specify)</label>
//         <input
//           type="text"
//           name="ctothers"
//           maxLength="100"
//           value={data.ctothers || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* X-ray */}
//       <div className="form-group">
//         <label>
//           <input type="checkbox" name="xray" checked={data.xray} onChange={handleChange} />{" "}
//           X-ray
//         </label>
//       </div>

//       {/* Other */}
//       <div className="form-group">
//         <label>
//           <input type="checkbox" name="other" checked={data.other} onChange={handleChange} />{" "}
//           Other
//         </label>
//         {data.other && (
//           <input
//             type="text"
//             name="otherText"
//             placeholder="Please specify"
//             value={data.otherText || ""}
//             style={{ marginTop: "10px" }}
//             onChange={handleChange}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step6ReportingArea() {
  const { formData, updateSection } = useContext(FormContext);

  // Field names:
  // mriopt → mri_options ✅
  // ctopt  → ct_options ✅
  // subspeciality → new subspeciality options ✅
  // xray   → xray ✅
  // other  → others ✅
  // otherText → others_description ✅
  const [data, setData] = useState(
    formData.reporting || {
      mriopt: [],
      ctopt: [],
      subspeciality: [],
      mriothers: "",
      ctothers: "",
      xray: false,
      other: false,
      otherText: ""
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    let updatedValue;

    if (type === "select-multiple") {
      updatedValue = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
    } else if (type === "checkbox") {
      updatedValue = checked;
    } else {
      updatedValue = value;
    }

    const updated = { ...data, [name]: updatedValue };

    setData(updated);
    updateSection("reporting", updated);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map(
          (step, index) => (
            <div key={index} className="step">
              <span className={`circle ${index === 5 ? "active" : ""}`}>
                {index + 1}
              </span>
              <p>{step}</p>
            </div>
          )
        )}
      </div>

      <h3 className="section-title">Reporting Area :</h3>

      {/* MRI */}
      <div className="form-group">
        <label>MRI :</label>
        <small>(Hold Ctrl to select multiple)</small>

        <select
          multiple
          name="mriopt"
          className="form-field"
          value={data.mriopt}
          onChange={handleChange}
        >
          <option value="Brain">Brain</option>
          <option value="Spine">Spine</option>
          <option value="MSK">MSK</option>
          <option value="Body">Body</option>
        </select>

        <label style={{ marginTop: "10px" }}>
          Other MRI (specify)
        </label>

        <input
          type="text"
          name="mriothers"
          maxLength="100"
          value={data.mriothers || ""}
          onChange={handleChange}
        />
      </div>

      {/* CT */}
      <div className="form-group">
        <label>CT :</label>
        <small>(Hold Ctrl to select multiple)</small>

        <select
          multiple
          name="ctopt"
          className="form-field"
          value={data.ctopt}
          onChange={handleChange}
        >
          <option value="Brain">Brain</option>
          <option value="Chest">Chest</option>
          <option value="Abdomen">Abdomen</option>
          <option value="Neck">Neck</option>
          <option value="Angio">Angio</option>
        </select>

        <label style={{ marginTop: "10px" }}>
          Other CT (specify)
        </label>

        <input
          type="text"
          name="ctothers"
          maxLength="100"
          value={data.ctothers || ""}
          onChange={handleChange}
        />
      </div>

      {/* Subspeciality */}
      <div className="form-group">
        <label>Subspeciality :</label>
        <small>(Hold Ctrl to select multiple)</small>

        <select
          multiple
          name="subspeciality"
          className="form-field"
          value={data.subspeciality}
          onChange={handleChange}
        >
          <option value="Neuroradiology">
            Neuroradiology
          </option>

          <option value="Musculoskeletal (MSK) Radiology">
            Musculoskeletal (MSK) Radiology
          </option>

          <option value="Abdominal Radiology">
            Abdominal Radiology
          </option>

          <option value="Breast Imaging">
            Breast Imaging
          </option>

          <option value="Pediatric Radiology">
            Pediatric Radiology
          </option>

          <option value="Cardiothoracic Radiology">
            Cardiothoracic Radiology
          </option>

          <option value="Nuclear Medicine">
            Nuclear Medicine
          </option>

          <option value="Onco-imaging">
            Onco-imaging
          </option>
        </select>
      </div>

      {/* X-ray */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="xray"
            checked={data.xray}
            onChange={handleChange}
          />{" "}
          X-ray
        </label>
      </div>

      {/* Other */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="other"
            checked={data.other}
            onChange={handleChange}
          />{" "}
          Other
        </label>

        {data.other && (
          <input
            type="text"
            name="otherText"
            placeholder="Please specify"
            value={data.otherText || ""}
            style={{ marginTop: "10px" }}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}