import { useState, useContext, useEffect, useCallback } from "react";
import { FormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";

import Step1Personal from "../../../components/steps/Step1Personal";
import Step2Education from "../../../components/steps/Step2Education";
import Step3Experience from "../../../components/steps/Step3Experience";
import Step4Achievements from "../../../components/steps/Step4Achievements";
import Step5Banking from "../../../components/steps/Step5Banking";
import Step6ReportingArea from "../../../components/steps/Step6Reporting";
import Step7TimeAvailability from "../../../components/steps/Step7Availability";
import Step8Review from "../../../components/steps/Step8Review";
import { BASE_URL } from "../../apiconnector";

export default function DoctorOnboardingForm() {
  const { formData } = useContext(FormContext);

  const [step, setStep]           = useState(1);
  const [isValid, setIsValid]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errorMsg, setErrorMsg]   = useState("");
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  const totalSteps = 8;
  const progress   = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  /* ─── VALIDATION ─── */
  const validateStep = useCallback(() => {
    if (step === 1) {
      const p = formData.personal || {};
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email || "");
      return (
        p.firstName &&
        p.lastName &&
        emailValid &&
        p.password &&
        p.confirmPassword &&
        p.password === p.confirmPassword
      );
    }
    return true;
  }, [formData, step]);

  useEffect(() => {
    setIsValid(!!validateStep());
  }, [validateStep]);

  /* ─── NAVIGATION ─── */
  const nextStep = () => { if (isValid && step < totalSteps) setStep((s) => s + 1); };
  const prevStep = () => { if (step > 1) setStep((s) => s - 1); };

  /* ─── HELPERS ─── */

  // Convert YYYY-MM (month input) → YYYY-MM-01 for backend
  const monthToDate = (val) => {
    if (!val) return "";
    // Already has day component
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    // YYYY-MM → YYYY-MM-01
    if (/^\d{4}-\d{2}$/.test(val)) return `${val}-01`;
    return val;
  };

  /* ─── SUBMIT ─── */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const fd = new FormData();

      /* ══ PERSONAL ══ */
      const p = formData.personal || {};
      fd.append("first_name",          p.firstName   || "");
      fd.append("last_name",           p.lastName    || "");
      fd.append("email",               p.email       || "");
      fd.append("password",            p.password    || "");
      // Backend DB has NOT NULL constraint on confirm_password — must be sent
      fd.append("confirm_password",    p.password    || "");
      fd.append("address",             p.address     || "");
      fd.append("contact_number",      p.phone       || "");
      fd.append("years_of_experience", p.experience  || "");

    
      /* ══ ACHIEVEMENTS ══ */

        const ach = formData.achievements || {};

        // Publish Link
        fd.append(
          "publish_link",
          ach.publishlink || ""
        );

        // Awards
        fd.append(
          "achievement_details",
          JSON.stringify(ach.awards || [])
        );

        // NEW FELLOWSHIPS
        fd.append(
          "fellowship_details",
          JSON.stringify(ach.fellowships || [])
        );

      /* ══ PERSONAL FILES ══ */
      if (p.resume instanceof File) {
        fd.append("resume", p.resume);
      }
      // Photo: File (file input) or base64 string (webcam)
      if (p.photo instanceof File) {
        fd.append("photo", p.photo);
      } else if (typeof p.photo === "string" && p.photo.startsWith("data:")) {
        const res  = await fetch(p.photo);
        const blob = await res.blob();
        fd.append("photo", blob, "photo.jpg");
      }

      /* ══ BANKING ══ */
      const b = formData.banking || {};
      fd.append("account_holder_name", b.accountHolderName  || "");
      fd.append("bank_name",           b.bankName           || "");
      fd.append("branch_name",         b.branchName         || "");
      fd.append("ifsc_code",           b.ifscCode           || "");
      fd.append("account_number",      b.accountNumber      || "");
      fd.append("pan_card_number",     b.panCardNumber      || "");
      fd.append("aadhar_card_number",  b.aadharCardNumber   || "");

      // NEW INSURANCE FIELDS
      fd.append("indemnity_insurance_name",b.indemnityInsuranceName || "");
      fd.append("indemnity_coverage",b.indemnityCoverage || "");


      if (b.panCardFile    instanceof File) fd.append("pan_card_file",    b.panCardFile);
      if (b.aadharCardFile instanceof File) fd.append("aadhar_card_file", b.aadharCardFile);
      if (b.chequeFile     instanceof File) fd.append("cheque_file",      b.chequeFile);

      // NEW INSURANCE FILE
      if (b.indemnityFile instanceof File) {fd.append("indemnity_file",b.indemnityFile);}

      /* ══ EDUCATION ══ */
      const edu = formData.education || {};
      const formattedEducation = {
        tenth_name:          edu.tenthname       || "",
        tenth_grade:         edu.tenthgrade      || "",
        tenth_passing_year:  monthToDate(edu.tenthpsyr),

        twelfth_name:          edu.twelthname     || "",
        twelfth_grade:         edu.twelthgrade    || "",
        twelfth_passing_year:  monthToDate(edu.twelthpsyr),

        mbbs_institution:  edu.mbbsinstitution || "",
        mbbs_grade:        edu.mbbsgrade       || "",
        mbbs_passing_year: monthToDate(edu.mbbspsyr),

        md_institution:  edu.mdinstitution || "",
        md_grade:        edu.mdgrade       || "",
        md_passing_year: monthToDate(edu.mdpsyr),

        registration_number: edu.regno || ""
      };
      fd.append("education_details", JSON.stringify(formattedEducation));

      /* ══ DOCUMENTS FROM EDUCATION STEP ══ */

      // 10th
      if (edu.tenthcertificate instanceof File) {
        fd.append("tenth_certificate", edu.tenthcertificate);
      }

      // 12th
      if (edu.twelthcertificate instanceof File) {
        fd.append("twelfth_certificate", edu.twelthcertificate);
      }

      // MBBS
      if (edu.mbbsdegree instanceof File) {
        fd.append("mbbs_degree", edu.mbbsdegree);
      }

      // ⚠️ multiple files → send first OR loop
      if (edu.mbbsmarksheet) {
        const file = Array.isArray(edu.mbbsmarksheet)
          ? edu.mbbsmarksheet[0]
          : edu.mbbsmarksheet instanceof FileList
          ? edu.mbbsmarksheet[0]
          : edu.mbbsmarksheet;

        if (file instanceof File) {
          fd.append("mbbs_marksheet", file);
        }
      }

      // MD
      if (edu.mddegree instanceof File) {
        fd.append("md_degree", edu.mddegree);
      }

      if (edu.mdmarksheet) {
        if (edu.mdmarksheet instanceof FileList || Array.isArray(edu.mdmarksheet)) {
          fd.append("md_marksheet", edu.mdmarksheet[0]);
        }
      }

      // Registration
      if (edu.regfile instanceof File) {
        fd.append("registration_certificate", edu.regfile);
      }

      // Video
      if (edu.videofile instanceof File) {
        fd.append("about_you_video", edu.videofile);
      }

      /* ══ EXPERIENCE ══ */
      const formattedExperience = (formData.experience || []).map((exp) => ({
        institution: exp.institution || "",
        start_date:  exp.startDate   || "",
        end_date:    exp.endDate     || ""
      }));
      fd.append("experience_details", JSON.stringify(formattedExperience));

    /* ══ REPORTING AREA ══ */

        const r = formData.reporting || {};

        const formattedReporting = {

          mri_options:
            r.mriopt || [],

          ct_options:
            r.ctopt || [],

          // NEW SUBSPECIALITY
          subspeciality:
            r.subspeciality || [],

          mri_others:
            r.mriothers || "",

          ct_others:
            r.ctothers || "",

          xray:
            r.xray || false,

          others:
            r.other || false,

          others_description:
            r.otherText || ""
        };

        fd.append(
          "reporting_area",
          JSON.stringify(formattedReporting)
        );

      /* ══ AVAILABILITY ══
         Backend expects per-day booleans + a single start_time / end_time.
         We send the time from the FIRST enabled day so the backend gets
         a valid value. All day booleans are sent correctly.
      ══ */
      const a = formData.availability || {};
      const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

      const availPayload = {};

      days.forEach((day) => {
        availPayload[day] = {
          enabled: a[day]?.enabled || false,
          start: a[day]?.start || "",
          end: a[day]?.end || ""
        };
      });


      fd.append("availability", JSON.stringify(availPayload));

      /* ══ API CALL ══ */
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        body:   fd
      });

      const resData = await response.json();

      if (!response.ok) {
        console.error("Server Error:", resData);
        // Format error nicely: show field-level messages
        const msg = typeof resData === "object"
          ? Object.entries(resData)
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
              .join(" | ")
          : "Submission failed. Please try again.";
        setErrorMsg(msg);
        setLoading(false);
        return;
      }

      console.log("Registration Success:", resData);
      console.log("API RESPONSE FULL:", resData);
      setApiData(resData); 
      setSubmitted(true);
      setLoading(false);

    } catch (err) {
      console.error("Submission Error:", err);
      setErrorMsg("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
  };

  /* ─── SUCCESS SCREEN ─── */
  if (submitted) {
    return (
      <div className="form-wrapper" style={{ textAlign: "center", padding: "60px 40px" }}>
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>

        <h2 className="form-title">Registration Successful!</h2>

        <p style={{ color: "#aaa", marginTop: "10px" }}>
          Your onboarding form has been submitted.
        </p>

        {/* ✅ NEW BUTTON */}
        <button
          className="btn-primary"
          style={{ marginTop: "25px" }}
          onClick={() =>
            navigate(`/rate-list/${apiData?.id}`)
          }
        >
          Continue to Rate List →
        </button>
      </div>
    );
  }

  /* ─── MAIN UI ─── */
  return (
    <div className="form-wrapper">

      {/* PROGRESS BAR */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress > 8 && <span className="progress-label">{progress}%</span>}
        </div>
      </div>

      {/* STEP COUNT */}
      <div className="step-indicator">Step {step} of {totalSteps}</div>

      {/* STEPS */}
      {step === 1 && <Step1Personal />}
      {step === 2 && <Step2Education />}
      {step === 3 && <Step3Experience />}
      {step === 4 && <Step4Achievements />}
      {step === 5 && <Step5Banking />}
      {step === 6 && <Step6ReportingArea />}
      {step === 7 && <Step7TimeAvailability />}
      {step === 8 && <Step8Review />}

      {/* ERROR MESSAGE */}
      {errorMsg && (
        <div style={{
          color: "#ff4444", background: "#2a0000",
          border: "1px solid #ff2e2e", borderRadius: "6px",
          padding: "12px 16px", marginTop: "15px", fontSize: "13px",
          lineHeight: "1.6"
        }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* NAVIGATION */}
      <div className="button-group" style={{ gap: "12px", display: "flex", justifyContent: "center", marginTop: "25px" }}>
        {step > 1 && (
          <button className="btn-primary" onClick={prevStep}>← Previous</button>
        )}
        {step < totalSteps && (
          <button
            className="btn-primary"
            onClick={nextStep}
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.45, cursor: isValid ? "pointer" : "not-allowed" }}
          >
            Next →
          </button>
        )}
        {step === totalSteps && (
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "✓ Confirm & Submit"}
          </button>
        )}
      </div>
    </div>
  );
}


