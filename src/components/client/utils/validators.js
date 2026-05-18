// // Validation utilities for Client Onboarding

// export const validators = {
//   clientName: (val) => {
//     if (!val || val.trim().length < 3)
//       return "Hospital/Center name must be at least 3 characters";
//     if (val.trim().length > 100) return "Name too long (max 100 chars)";
//     return null;
//   },

//   address: (val) => {
//     if (!val || val.trim().length < 10)
//       return "Please enter a complete address (min 10 characters)";
//     return null;
//   },

//   pincode: (val) => {
//     if (!val || !/^\d{6}$/.test(val)) return "Enter a valid 6-digit PIN code";
//     return null;
//   },

//   contactPerson: (val) => {
//     if (!val || val.trim().length < 2) return "Contact person name is required";
//     if (!/^[a-zA-Z\s.'-]+$/.test(val))
//       return "Name should only contain letters, spaces, and . ' -";
//     return null;
//   },

//   phone: (val) => {
//     if (!val || !/^\d{10}$/.test(val))
//       return "Enter a valid 10-digit phone number";
//     return null;
//   },

//   email: (val) => {
//     if (!val) return "Email is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(val)) return "Enter a valid email address";
//     return null;
//   },

//   password: (val) => {
//     if (!val) return "Password is required";
//     if (val.length < 8) return "Password must be at least 8 characters";
//     if (!/[A-Z]/.test(val))
//       return "Password must include at least one uppercase letter";
//     if (!/[a-z]/.test(val))
//       return "Password must include at least one lowercase letter";
//     if (!/\d/.test(val)) return "Password must include at least one number";
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val))
//       return "Password must include at least one special character";
//     return null;
//   },

//   confirmPassword: (val, password) => {
//     if (!val) return "Please confirm your password";
//     if (val !== password) return "Passwords do not match";
//     return null;
//   },

//   modalities: (val) => {
//     if (!val || val.length === 0)
//       return "Please select at least one modality";
//     return null;
//   },

//   pan: (val) => {
//     if (!val) return "PAN number is required";
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     if (!panRegex.test(val.toUpperCase()))
//       return "Enter a valid PAN (e.g., ABCDE1234F)";
//     return null;
//   },

//   panCard: (file) => {
//     if (!file) return "PAN card document is required";
//     const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
//     if (!allowed.includes(file.type))
//       return "Only JPG, PNG, or PDF files are allowed";
//     if (file.size > 5 * 1024 * 1024) return "File size must be less than 5MB";
//     return null;
//   },
// };

// export const formatPAN = (val) => {
//   // Auto-format PAN as user types: AAAAA9999A
//   const cleaned = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
//   return cleaned.slice(0, 10);
// };

// export const getPasswordStrength = (password) => {
//   if (!password) return { score: 0, label: "", color: "" };
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (password.length >= 12) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[a-z]/.test(password)) score++;
//   if (/\d/.test(password)) score++;
//   if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

//   if (score <= 2) return { score, label: "Weak", color: "#ef4444" };
//   if (score <= 4) return { score, label: "Moderate", color: "#f59e0b" };
//   if (score <= 5) return { score, label: "Strong", color: "#10b981" };
//   return { score, label: "Very Strong", color: "#059669" };
// };

// export const sanitizeInput = (val) => {
//   if (typeof val !== "string") return val;
//   return val
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#x27;")
//     .replace(/\//g, "&#x2F;");
// };





// Validation utilities for Client Onboarding

export const validators = {
  clientName: (val) => {
    if (!val || val.trim().length < 3)
      return "Hospital/Center name must be at least 3 characters";
    if (val.trim().length > 100) return "Name too long (max 100 chars)";
    return null;
  },

  address: (val) => {
    if (!val || val.trim().length < 10)
      return "Please enter a complete address (min 10 characters)";
    return null;
  },

  pincode: (val) => {
    if (!val || !/^\d{6}$/.test(val)) return "Enter a valid 6-digit PIN code";
    return null;
  },

  contactPerson: (val) => {
    if (!val || val.trim().length < 2) return "Contact person name is required";
    if (!/^[a-zA-Z\s.'-]+$/.test(val))
      return "Name should only contain letters, spaces, and . ' -";
    return null;
  },

  phone: (val) => {
    if (!val || !/^\d{10}$/.test(val))
      return "Enter a valid 10-digit phone number";
    return null;
  },

  email: (val) => {
    if (!val) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Enter a valid email address";
    return null;
  },

  modalities: (val) => {
    if (!val || val.length === 0)
      return "Please select at least one modality";
    return null;
  },

  pan: (val) => {
    if (!val) return "PAN number is required";
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(val.toUpperCase()))
      return "Enter a valid PAN (e.g., ABCDE1234F)";
    return null;
  },

  panCard: (file) => {
    if (!file) return "PAN card document is required";
    const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowed.includes(file.type))
      return "Only JPG, PNG, or PDF files are allowed";
    if (file.size > 5 * 1024 * 1024) return "File size must be less than 5MB";
    return null;
  },
};

export const formatPAN = (val) => {
  const cleaned = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return cleaned.slice(0, 10);
};

export const sanitizeInput = (val) => {
  if (typeof val !== "string") return val;
  return val
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#x27;")
    .replace(/\//g, "&#x2F;");
};