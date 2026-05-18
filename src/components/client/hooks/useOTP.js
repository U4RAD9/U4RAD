// import { useState, useRef, useCallback } from "react";

// export const useOTP = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [resendTimer, setResendTimer] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const timerRef = useRef(null);
//   const generatedOTPRef = useRef(null);

//   const startResendTimer = useCallback(() => {
//     setResendTimer(30);
//     timerRef.current = setInterval(() => {
//       setResendTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   }, []);

//   const sendOTP = useCallback(
//     async (phone) => {
//       if (!phone || phone.length !== 10) {
//         setOtpError("Please enter a valid 10-digit phone number");
//         return false;
//       }
//       setLoading(true);
//       setOtpError("");
//       // Simulate API call — replace with real SMS gateway
//       await new Promise((r) => setTimeout(r, 1200));
//       const generated = Math.floor(100000 + Math.random() * 900000).toString();
//       generatedOTPRef.current = generated;
//       console.info(`[DEV] OTP for ${phone}: ${generated}`); // Remove in production
//       setOtpSent(true);
//       setOtpVerified(false);
//       setOtp(["", "", "", "", "", ""]);
//       startResendTimer();
//       setLoading(false);
//       return true;
//     },
//     [startResendTimer]
//   );

//   const verifyOTP = useCallback(() => {
//     const entered = otp.join("");
//     if (entered.length !== 6) {
//       setOtpError("Please enter the complete 6-digit OTP");
//       return false;
//     }
//     if (entered === generatedOTPRef.current) {
//       setOtpVerified(true);
//       setOtpError("");
//       return true;
//     }
//     setOtpError("Invalid OTP. Please try again.");
//     setOtp(["", "", "", "", "", ""]);
//     return false;
//   }, [otp]);

//   const handleOtpChange = useCallback((index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);
//     setOtpError("");
//     return newOtp;
//   }, [otp]);

//   const resetOTP = useCallback(() => {
//     setOtp(["", "", "", "", "", ""]);
//     setOtpSent(false);
//     setOtpVerified(false);
//     setOtpError("");
//     setResendTimer(0);
//     generatedOTPRef.current = null;
//     if (timerRef.current) clearInterval(timerRef.current);
//   }, []);

//   return {
//     otp,
//     otpSent,
//     otpVerified,
//     otpError,
//     resendTimer,
//     loading,
//     sendOTP,
//     verifyOTP,
//     handleOtpChange,
//     resetOTP,
//   };
// };




import { useState, useRef, useCallback } from "react";
import { BASE_URL } from "../../apiconnector";

export const useOTP = () => {
  const [otp,         setOtp]         = useState(["", "", "", "", "", ""]);
  const [otpSent,     setOtpSent]     = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError,    setOtpError]    = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [loading,     setLoading]     = useState(false);
  const timerRef = useRef(null);

  const startResendTimer = useCallback(() => {
    setResendTimer(30);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // ── Send OTP ── POST /api/client/send-otp/
  const sendOTP = useCallback(async (phone) => {
    if (!phone || phone.length !== 10) {
      setOtpError("Please enter a valid 10-digit phone number.");
      return false;
    }

    setLoading(true);
    setOtpError("");

    try {
      const res = await fetch(`${BASE_URL}/client/send-otp/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.error || "Failed to send OTP. Please try again.");
        setLoading(false);
        return false;
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtp(["", "", "", "", "", ""]);
      startResendTimer();
      setLoading(false);
      return true;

    } catch (err) {
      setOtpError("Network error. Please check your connection.");
      setLoading(false);
      return false;
    }
  }, [startResendTimer]);

  // ── Verify OTP ── POST /api/client/verify-otp/
  const verifyOTP = useCallback(async (phone) => {
    const entered = otp.join("");

    if (entered.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return false;
    }

    setLoading(true);
    setOtpError("");

    try {
      const res = await fetch(`${BASE_URL}/client/verify-otp/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone, otp: entered }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.error || "Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        setLoading(false);
        return false;
      }

      setOtpVerified(true);
      setOtpError("");
      setLoading(false);
      return true;

    } catch (err) {
      setOtpError("Network error. Please check your connection.");
      setLoading(false);
      return false;
    }
  }, [otp]);

  const handleOtpChange = useCallback((index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");
    return newOtp;
  }, [otp]);

  const resetOTP = useCallback(() => {
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpError("");
    setResendTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return {
    otp,
    otpSent,
    otpVerified,
    otpError,
    resendTimer,
    loading,
    sendOTP,
    verifyOTP,
    handleOtpChange,
    resetOTP,
  };
};