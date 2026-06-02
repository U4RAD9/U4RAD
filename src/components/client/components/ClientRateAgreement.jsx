import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../apiconnector";
import Logo from "../../../assets/Logo.png"; // Adjust the path as necessary

export default function ClientRateAgreement() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState(null); // Will hold { client_name, rate_list: [...] }
  
  const [step, setStep] = useState(1); // 1: View Rates, 2: OTP Verification, 3: Success
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Fetch the rate list using the token when the page loads
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing agreement token.");
      setLoading(false);
      return;
    }

    // Expected Backend API to fetch rates based on token
    fetch(`${BASE_URL}/client/rates/view/?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load rate list.");
        
        // Parse the rate list JSON string back into an array
        const parsedRates = typeof data.rate_list === 'string' 
          ? JSON.parse(data.rate_list) 
          : data.rate_list;

        setClientData({ ...data, rate_list: parsedRates });
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

    // fetch(`${BASE_URL}/send_otp/`, {
    fetch(`${BASE_URL}/client/send-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert("OTP sent to your phone.");
          setStep(2); // Move to OTP entry step
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

    // Call the final agreement endpoint
    fetch(`${BASE_URL}/client/rates/agree/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, phone, otp }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStep(3); // Move to Success Step
        } else {
          alert(data.error || "Verification failed. Check OTP or Phone Number.");
        }
      })
      .catch(() => alert("Network error. Try again."))
      .finally(() => setIsVerifying(false));
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
        .cra-title { font-size: 22px; font-weight: 700; color: #111; }
        .cra-subtitle { font-size: 14px; color: #666; margin-top: 5px; }
        
        .cra-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px; }
        .cra-table th, .cra-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: center; }
        .cra-table th { background-color: #f9fafb; color: #4b5563; font-weight: 600; }
        .cra-table td.left { text-align: left; }
        
        .cra-form-group { margin-bottom: 20px; text-align: left; }
        .cra-label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #374151; }
        .cra-input { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; outline: none; transition: border-color 0.2s; }
        .cra-input:focus { border-color: #2563eb; }
        
        .cra-btn { width: 100%; padding: 14px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .cra-btn:hover { background: #1d4ed8; }
        .cra-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        
        .cra-centered { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: #555; }
        .cra-error { color: #dc2626; text-align: center; }
        .cra-success-icon { font-size: 60px; color: #10b981; margin-bottom: 15px; }
      `}</style>

      <div className="cra-card">
        <div className="cra-header">
          <img src={Logo} alt="Logo" className="cra-logo" />
          <h1 className="cra-title">Rate List Agreement</h1>
          <p className="cra-subtitle">For: <strong>{clientData?.client_name}</strong></p>
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

            <div className="cra-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="agree" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
                I have reviewed and agree to the rates proposed above.
              </label>
            </div>

            <div className="cra-form-group">
              <label className="cra-label">Registered Phone Number</label>
              <input 
                type="tel" 
                className="cra-input" 
                placeholder="Enter 10-digit number to receive OTP"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <button 
              className="cra-btn" 
              onClick={handleSendOtp}
              disabled={!agreed || phone.length !== 10 || isSendingOtp}
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP to Verify"}
            </button>
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
              You or you can reach out on +91 85********
            </p>
          </div>
        )}

      </div>
    </div>
  );
}