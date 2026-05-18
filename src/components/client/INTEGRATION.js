/**
 * U4RAD — Integration Guide
 * How to plug <ClientOnboarding> into your existing login/selection screen
 *
 * STEP 1: Copy the entire `client/` folder into:
 *   src/components/client/
 *
 * STEP 2: In your existing Login / Role-selection component,
 *   import and wire like below.
 */

// ─── Example: src/components/pages/LoginPage.jsx (or wherever your role picker lives) ───

import React, { useState } from "react";
import { ClientOnboarding } from "../client";  // adjust path as needed

const LoginPage = () => {
  const [showClientOnboarding, setShowClientOnboarding] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // "client" | "radiologist"

  const handleLoginClick = () => {
    if (selectedRole === "client") {
      setShowClientOnboarding(true);
    } else if (selectedRole === "radiologist") {
      // Navigate to radiologist login
    }
  };

  const handleRegistrationSuccess = (formData) => {
    // formData contains the submitted values (minus raw password — hash server-side)
    console.log("New client registered:", formData.clientName);
    // Optionally redirect, show toast, etc.
  };

  return (
    <div>
      {/* ── Your existing role selector UI ── */}
      <div className="role-card" onClick={() => setSelectedRole("client")}>
        Client
      </div>
      <div className="role-card" onClick={() => setSelectedRole("radiologist")}>
        Radiologist
      </div>
      <button onClick={handleLoginClick}>Login</button>

      {/* ── Mount onboarding modal ── */}
      {showClientOnboarding && (
        <ClientOnboarding
          onClose={() => setShowClientOnboarding(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default LoginPage;

/**
 * FOLDER STRUCTURE after adding the module:
 *
 * src/
 * └── components/
 *     ├── client/                        ← NEW MODULE
 *     │   ├── index.js                   ← barrel export
 *     │   ├── components/
 *     │   │   ├── ClientOnboarding.jsx   ← main form
 *     │   │   └── ClientOnboarding.css   ← styles
 *     │   ├── hooks/
 *     │   │   └── useOTP.js              ← OTP state machine
 *     │   └── utils/
 *     │       └── validators.js          ← all validation logic
 *     ├── context/
 *     ├── dashboard/
 *     ├── pages/
 *     └── ...existing files...
 *
 *
 * SECURITY CHECKLIST (Backend):
 * ──────────────────────────────
 * ✅  Hash passwords with bcrypt (cost factor ≥ 12) before storing
 * ✅  Validate & sanitize all fields server-side (never trust client)
 * ✅  Rate-limit OTP send endpoint (e.g., 3 attempts / 10 min per phone)
 * ✅  Scan uploaded PAN card files for malware before storing
 * ✅  Store PAN card in encrypted object storage (S3 + SSE, not public)
 * ✅  Log registration events (IP, timestamp, phone) for audit
 * ✅  Use HTTPS everywhere — never transmit credentials over HTTP
 * ✅  Implement CSRF tokens on the registration endpoint
 * ✅  Set Content-Security-Policy headers to prevent XSS
 * ✅  Enforce file-type validation server-side (MIME sniffing, not just extension)
 *
 *
 * OTP INTEGRATION (replace simulation in useOTP.js):
 * ────────────────────────────────────────────────────
 * Replace the `sendOTP` simulation with your SMS provider call, e.g.:
 *
 *   // Twilio example
 *   await fetch('/api/otp/send', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ phone: `+91${phone}` })
 *   });
 *
 * Move OTP generation & verification to the backend — never expose
 * the generated OTP in frontend console logs in production.
 *
 *
 * API ENDPOINT (replace simulation in handleSubmit):
 * ────────────────────────────────────────────────────
 *   await fetch('/api/client/register', {
 *     method: 'POST',
 *     body: payload,           // FormData with panCard file
 *     credentials: 'include',  // send cookies for CSRF
 *   });
 */