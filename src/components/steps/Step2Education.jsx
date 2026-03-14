
import { useContext, useState } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step2Education() {
  const { formData, updateSection } = useContext(FormContext);

  // Field names match what DoctorOnboardingForm sends in education_details JSON:
  // tenth_name → tenthname, tenth_grade → tenthgrade, tenth_passing_year → tenthpsyr, etc.
  const [data, setData] = useState(formData.education || {});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updated = {
      ...data,
      [name]: files ? (e.target.multiple ? files : files[0]) : value
    };
    setData(updated);
    updateSection("education", updated);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
          <div key={index} className="step">
            <span className={`circle ${index === 1 ? "active" : ""}`}>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Educational Information :</h3>

      {/* 10th */}
      <h4 className="sub-heading">Class 10th details</h4>
      <div className="form-group">
        <label>School Name</label>
        <input name="tenthname" value={data.tenthname || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Grade / Percentage</label>
        <input name="tenthgrade" value={data.tenthgrade || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Passing Year</label>
        <input type="month" name="tenthpsyr" value={data.tenthpsyr || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload 10th Certificate</label>
        <input type="file" name="tenthcertificate" onChange={handleChange} />
      </div>

      {/* 12th */}
      <h4 className="sub-heading">Class 12th details</h4>
      <div className="form-group">
        <label>School Name</label>
        <input name="twelthname" value={data.twelthname || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Grade / Percentage</label>
        <input name="twelthgrade" value={data.twelthgrade || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Passing Year</label>
        <input type="month" name="twelthpsyr" value={data.twelthpsyr || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload 12th Certificate</label>
        <input type="file" name="twelthcertificate" onChange={handleChange} />
      </div>

      {/* MBBS */}
      <h4 className="sub-heading">MBBS Details</h4>
      <div className="form-group">
        <label>Institution Name</label>
        <input name="mbbsinstitution" value={data.mbbsinstitution || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Grade / CGPA</label>
        <input name="mbbsgrade" value={data.mbbsgrade || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Passing Year</label>
        <input type="month" name="mbbspsyr" value={data.mbbspsyr || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload Marksheets (Ctrl for multiple)</label>
        <input type="file" multiple name="mbbsmarksheet" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload Degree</label>
        <input type="file" name="mbbsdegree" onChange={handleChange} />
      </div>

      {/* MD/DNB */}
      <h4 className="sub-heading">MD/DNB Details</h4>
      <div className="form-group">
        <label>Institution Name</label>
        <input name="mdinstitution" value={data.mdinstitution || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Grade / CGPA</label>
        <input name="mdgrade" value={data.mdgrade || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Passing Year</label>
        <input type="month" name="mdpsyr" value={data.mdpsyr || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload Marksheets (Ctrl for multiple)</label>
        <input type="file" multiple name="mdmarksheet" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Upload Degree</label>
        <input type="file" name="mddegree" onChange={handleChange} />
      </div>

      {/* Registration */}
      <h4 className="sub-heading">State Registration</h4>
      <div className="form-group">
        <label>Registration Number</label>
        <input name="regno" value={data.regno || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Registration Certificate</label>
        <input type="file" name="regfile" onChange={handleChange} />
      </div>

      {/* About */}
      <h4 className="sub-heading">About You</h4>
      <div className="form-group">
        <label>Upload video stating strengths &amp; weaknesses</label>
        <input type="file" name="videofile" onChange={handleChange} />
      </div>
    </div>
  );
}