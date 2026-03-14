// Claude wala code


import { useState, useContext } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step4Achievements() {
  const { formData, updateSection } = useContext(FormContext);

  // publishlink is read by DoctorOnboardingForm as formData.achievements.publishlink
  // and sent to API as publish_link ✅
  const [awards, setAwards] = useState(
    formData.achievements?.awards?.length > 0
      ? formData.achievements.awards
      : [{ name: "", date: "" }]
  );

  const [publishlink, setPublishlink] = useState(
    formData.achievements?.publishlink || ""
  );

  const handleAwardChange = (index, field, value) => {
    const updated = [...awards];
    updated[index][field] = value;
    setAwards(updated);
    updateSection("achievements", { awards: updated, publishlink });
  };

  const addAward = () => {
    const updated = [...awards, { name: "", date: "" }];
    setAwards(updated);
    updateSection("achievements", { awards: updated, publishlink });
  };

  const removeAward = (index) => {
    const updated = awards.filter((_, i) => i !== index);
    setAwards(updated);
    updateSection("achievements", { awards: updated, publishlink });
  };

  const handlePublishLinkChange = (value) => {
    setPublishlink(value);
    updateSection("achievements", { awards, publishlink: value });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
          <div key={index} className="step">
            <span className={`circle ${index === 3 ? "active" : ""}`}>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Achievements :</h3>

      <div className="awards-container">
        {awards.map((award, index) => (
          <div
            key={index}
            style={{ marginBottom: "25px", borderBottom: "1px solid #333", paddingBottom: "15px" }}
          >
            <h4 className="sub-heading">Recognition / Award {index + 1}</h4>

            <div className="form-group">
              <label>Name of the Award</label>
              <input
                value={award.name}
                onChange={(e) => handleAwardChange(index, "name", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date of Receiving the Award</label>
              <input
                type="date"
                value={award.date}
                onChange={(e) => handleAwardChange(index, "date", e.target.value)}
              />
            </div>

            {index > 0 && (
              <div className="button-group">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => removeAward(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="button-group">
          <button type="button" className="btn-primary" onClick={addAward}>
            Add More Awards
          </button>
        </div>
      </div>

      <h4 className="sub-heading">Paper Published (if any)</h4>
      <div className="form-group">
        <label>Link of the Paper</label>
        <input
          value={publishlink}
          onChange={(e) => handlePublishLinkChange(e.target.value)}
        />
      </div>
    </div>
  );
}