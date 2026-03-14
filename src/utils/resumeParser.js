export const parseResumeData = (text) => {
  if (!text) return {};

  const clean = text.replace(/\s+/g, " ");

  // EMAIL
  const emailMatch = clean.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const email = emailMatch ? emailMatch[0] : "";

  // PHONE
  const phoneMatch = clean.match(/(\+91\s*)?[6789]\d{9}/);
  const phone = phoneMatch ? phoneMatch[0] : "";

  // EXPERIENCE
  const expMatch = clean.match(/(\d+)\s*(years?|yrs?)/i);
  const experience = expMatch ? expMatch[1] : "";

  // NAME (first 2 capitalized words in document)
  let firstName = "";
  let lastName = "";

  const nameMatch = clean.match(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/);
  if (nameMatch) {
    const parts = nameMatch[0].split(" ");
    firstName = parts[0];
    lastName = parts[1];
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    experience,
  };
};
