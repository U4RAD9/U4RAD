
import { useContext, useState, useEffect, useRef } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";
import { useNavigate } from "react-router-dom";
import { extractTextFromPDF, parseResumeData } from "../../utils/pdfParser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Webcam from "react-webcam";

export default function Step1Personal() {
  const { formData, updateSection } = useContext(FormContext);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [showCamera, setShowCamera]               = useState(false);
  const [capturedImage, setCapturedImage]         = useState(null);
  const [showPassword, setShowPassword]           = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors]                       = useState({});
  const [isParsing, setIsParsing]                 = useState(false);
  const [parseSuccess, setParseSuccess]           = useState(false);
  const [parsedSections, setParsedSections]       = useState([]);

  const [data, setData] = useState({
    firstName:       "",
    lastName:        "",
    email:           "",
    password:        "",
    confirmPassword: "",
    address:         "",
    phone:           "",
    resume:          null,
    photo:           null,
    photoPreview:    null,
    experience:      ""
  });

  useEffect(() => {
    if (formData.personal && Object.keys(formData.personal).length > 0) {
      setData(formData.personal);
      if (formData.personal.photoPreview) {
        setCapturedImage(formData.personal.photoPreview);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updated = { ...data, [name]: files ? files[0] : value };
    setData(updated);
    updateSection("personal", updated);

    if (name === "password" || name === "confirmPassword") {
      const pw  = name === "password"        ? value : updated.password;
      const cpw = name === "confirmPassword" ? value : updated.confirmPassword;
      if (pw && cpw && pw !== cpw) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handlePhoneChange = (value) => {
    const updated = { ...data, phone: value };
    setData(updated);
    updateSection("personal", updated);
  };

  /* ══════════════════════════════════════════
      RESUME UPLOAD — fills ALL 7 pages
  ══════════════════════════════════════════ */
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsParsing(true);
    setParseSuccess(false);
    setParsedSections([]);

    try {
      const text   = await extractTextFromPDF(file);
      const parsed = parseResumeData(text);
      const filled = [];

      /* 1 ── Personal */
      if (parsed.personal) {
        let parsedPhone = parsed.personal.phone || "";
        parsedPhone = parsedPhone.replace(/^\+/, "");

        const updatedPersonal = {
          ...data,
          ...parsed.personal,
          phone:  parsedPhone || data.phone,
          resume: file
        };
        setData(updatedPersonal);
        updateSection("personal", updatedPersonal);
        filled.push("Personal Info");
      }

      /* 2 ── Education */
      if (parsed.education && Object.values(parsed.education).some(Boolean)) {
        const existingEdu = formData.education || {};
        const mergedEdu   = {};
        Object.keys(parsed.education).forEach((key) => {
          mergedEdu[key] = parsed.education[key] || existingEdu[key] || "";
        });
        updateSection("education", mergedEdu);
        filled.push("Education");
      }

      /* 3 ── Experience */
      if (parsed.experience && parsed.experience.length > 0) {
        updateSection("experience", parsed.experience);
        filled.push("Work Experience");
      }

      /* 4 ── Achievements */
      if (
        parsed.achievements &&
        (parsed.achievements.publishlink ||
          parsed.achievements.awards?.some((a) => a.name))
      ) {
        const existingAch = formData.achievements || {};
        updateSection("achievements", {
          awards:      parsed.achievements.awards?.some((a) => a.name)
                         ? parsed.achievements.awards
                         : existingAch.awards || [{ name: "", date: "" }],
          publishlink: parsed.achievements.publishlink || existingAch.publishlink || ""
        });
        filled.push("Achievements");
      }

      /* 5 ── Reporting Area */
      const rep = parsed.reporting;
      if (rep && (rep.mriopt?.length > 0 || rep.ctopt?.length > 0 || rep.xray)) {
        const existingRep = formData.reporting || {};
        updateSection("reporting", {
          mriopt:    rep.mriopt?.length > 0 ? rep.mriopt : existingRep.mriopt   || [],
          ctopt:     rep.ctopt?.length  > 0 ? rep.ctopt  : existingRep.ctopt    || [],
          mriothers: existingRep.mriothers || "",
          ctothers:  existingRep.ctothers  || "",
          xray:      rep.xray ?? existingRep.xray ?? false,
          other:     existingRep.other    || false,
          otherText: existingRep.otherText || ""
        });
        filled.push("Reporting Area");
      }

      setParsedSections(filled);
      setParseSuccess(true);
    } catch (err) {
      alert("Could not extract data from this PDF. Please fill in details manually.");
    } finally {
      setIsParsing(false);
    }
  };

  /* ══ WEBCAM ══ */
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    const updated = { ...data, photo: imageSrc, photoPreview: imageSrc };
    setData(updated);
    updateSection("personal", updated);
    setShowCamera(false);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>
      <h3 className="section-title">Personal Information :</h3>

      {/* ── Resume Upload ── */}
      <div className="form-group">
        <label>
          Upload Resume&nbsp;
          <span style={{ color: "#ff3333", fontSize: "13px" }}>
            {isParsing ? "(Analyzing...)" : "(Auto-fills basics details)"}
          </span>
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleResumeUpload}
          disabled={isParsing}
        />

        {isParsing && (
          <p style={{ color: "#ff9900", fontSize: "13px", marginTop: "6px" }}>
            ⏳ Extracting data from resume, please wait...
          </p>
        )}

        {parseSuccess && !isParsing && (
          <div style={{
            marginTop: "8px", padding: "10px 14px",
            background: "#001a00", border: "1px solid #00aa44",
            borderRadius: "6px", fontSize: "13px", color: "#00cc55"
          }}>
            ✅ Resume parsed! Auto-filled:{" "}
            <strong>{parsedSections.join(", ")}</strong>
            <br />
            <span style={{ color: "#aaa", fontSize: "12px" }}>
              Please review and correct any fields if needed.
            </span>
          </div>
        )}
      </div>

      {/* ── First Name ── */}
      <div className="form-group">
        <label>First Name</label>
        <input name="firstName" value={data.firstName} onChange={handleChange} />
      </div>

      {/* ── Last Name ── */}
      <div className="form-group">
        <label>Last Name</label>
        <input name="lastName" value={data.lastName} onChange={handleChange} />
      </div>

      {/* ── Email ── */}
      <div className="form-group">
        <label>Email ID</label>
        <input name="email" type="email" value={data.email} onChange={handleChange} />
      </div>

      {/* ── Password ── */}
      <div className="form-group">
        <label>Create Password</label>
        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={handleChange}
            style={{ paddingRight: "70px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            style={eyeBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* ── Confirm Password ── */}
      <div className="form-group">
        <label>Confirm Password</label>
        <div style={{ position: "relative" }}>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={data.confirmPassword}
            onChange={handleChange}
            style={{ paddingRight: "70px" }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((p) => !p)}
            style={eyeBtn}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>

      {/* ── Address ── */}
      <div className="form-group">
        <label>Address</label>
        <input name="address" value={data.address} onChange={handleChange} />
      </div>

      {/* ── Phone (PhoneInput handles country code display) ── */}
      <div className="form-group">
        <label>Contact No.</label>
        <PhoneInput
          country={"in"}
          value={data.phone}
          onChange={handlePhoneChange}
          enableSearch
          inputStyle={{ width: "100%", height: "45px", borderRadius: "5px" }}
        />
        {data.phone && (
          <p style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            
          </p>
        )}
      </div>

      {/* ── Experience ── */}
      <div className="form-group">
        <label>Years of Experience</label>
        <input name="experience" value={data.experience} onChange={handleChange} />
      </div>

      {/* ── Photo ── */}
      <div className="form-group">
        <label>Passport Size Photo</label>
        <div className="photo-buttons">
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowCamera(!showCamera)}
          >
            {showCamera ? "Close Camera" : "Capture Live Photo"}
          </button>
        </div>

        {showCamera && (
          <div className="camera-box" style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "10px", 
            marginTop: "10px" 
          }}>
            <div style={{ 
              width: "250px", 
              height: "250px", 
              borderRadius: "50%", 
              overflow: "hidden", 
              border: "4px solid #ff3333",
              position: "relative"
            }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 250,
                  height: 250,
                  facingMode: "user"
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            <button type="button" className="btn-primary" onClick={capturePhoto}>
              Take Photo
            </button>
          </div>
        )}

        {capturedImage && (
          <div className="photo-preview" style={{ marginTop: "10px" }}>
            <img 
              src={capturedImage} 
              alt="Preview" 
              style={{ 
                width: "120px", 
                height: "120px", 
                borderRadius: "50%", 
                objectFit: "cover", 
                border: "2px solid #ccc" 
              }} 
            />
          </div>
        )}
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/onboarding/callback")}
        >
          Go to Callback Form
        </button>
      </div>
    </div>
  );
}

const eyeBtn = {
  position: "absolute", right: "10px", top: "50%",
  transform: "translateY(-50%)", background: "none",
  border: "none", color: "#ff3333", cursor: "pointer",
  fontWeight: "bold", fontSize: "13px"
};