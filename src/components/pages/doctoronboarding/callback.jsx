import { useState } from "react";

export default function CallbackForm() {
  const [data, setData] = useState({
    name: "",
    phone_number: "",
    email: "",
    qualification: "",
    experience: "",
    ctcheckbox: false,
    mricheckbox: false,
    xraycheckbox: false,
    mammographycheckbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = value;

    // Only numbers allowed for phone & experience
    if (name === "phone_number" || name === "experience") {
      updatedValue = value.replace(/\D/g, "");
    }

    // Experience limit 0–50
    if (name === "experience") {
      if (updatedValue.length > 2) {
        updatedValue = updatedValue.slice(0, 2);
      }
      if (parseInt(updatedValue) > 50) {
        updatedValue = "50";
      }
    }

    setData({
      ...data,
      [name]: type === "checkbox" ? checked : updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Callback Form Data:", data);
    alert("Callback request submitted successfully!");
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "500px",
          maxWidth: "100%",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Request a Callback
        </h2>

        <p style={{ textAlign: "center", marginBottom: "25px", color: "#6b7280" }}>
          Please fill in your details and our team will contact you.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "15px" }}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              maxLength="15"
              value={data.phone_number}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Qualification */}
          <div style={{ marginBottom: "15px" }}>
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={data.qualification}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "15px" }}>
            <label>Experience (Years)</label>
            <input
              type="text"
              name="experience"
              value={data.experience}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Modalities */}
          <div style={{ marginBottom: "20px" }}>
            <label>Modalities You Want to Report</label>
            <div style={{ marginTop: "8px" }}>
              <Checkbox name="ctcheckbox" checked={data.ctcheckbox} onChange={handleChange} label="CT" />
              <Checkbox name="mricheckbox" checked={data.mricheckbox} onChange={handleChange} label="MRI" />
              <Checkbox name="xraycheckbox" checked={data.xraycheckbox} onChange={handleChange} label="X-Ray" />
              <Checkbox name="mammographycheckbox" checked={data.mammographycheckbox} onChange={handleChange} label="Mammography" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Styles */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  outline: "none",
};

function Checkbox({ name, checked, onChange, label }) {
  return (
    <label style={{ marginRight: "15px" }}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ marginRight: "5px" }}
      />
      {label}
    </label>
  );
}
