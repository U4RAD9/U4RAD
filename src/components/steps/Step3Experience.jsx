// cloude wala code for api testing

import { useState, useContext } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step3Experience() {
  const { formData, updateSection } = useContext(FormContext);

  // Field names: institution, startDate, endDate
  // DoctorOnboardingForm maps these as: institution → institution, startDate → start_date, endDate → end_date ✅
  const [experiences, setExperiences] = useState(
    formData.experience && formData.experience.length > 0
      ? formData.experience
      : [{ institution: "", startDate: "", endDate: "" }]
  );

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    updateSection("experience", updated);
  };

  const addExperience = () => {
    const updated = [...experiences, { institution: "", startDate: "", endDate: "" }];
    setExperiences(updated);
    updateSection("experience", updated);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    updateSection("experience", updated);
  };

  // 🔥 Re-sync if resume auto-fill updated context after component mounted
  const contextExp = formData.experience;
  const [lastContextLen, setLastContextLen] = useState(contextExp?.length || 0);
  if (contextExp && contextExp.length !== lastContextLen) {
    setExperiences(contextExp);
    setLastContextLen(contextExp.length);
  }

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
          <div key={index} className="step">
            <span className={`circle ${index === 2 ? "active" : ""}`}>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Work Experience :</h3>

      <div className="experience-container">
        {experiences.map((exp, index) => (
          <div
            key={index}
            style={{ marginBottom: "25px", borderBottom: "1px solid #333", paddingBottom: "15px" }}
          >
            <h4 className="sub-heading">Experience {index + 1}</h4>

            <div className="form-group">
              <label>Name of the Institution</label>
              <input
                value={exp.institution}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Starting Date</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date (Leave blank if currently working)</label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>

            {index > 0 && (
              <div className="button-group">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => removeExperience(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="button-group">
          <button type="button" className="btn-primary" onClick={addExperience}>
            Add More Experience
          </button>
        </div>
      </div>
    </div>
  );
}