// cloude wala code for api testing 

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

/* ═══════════════════════════════════════════════
   PDF TEXT EXTRACTOR
═══════════════════════════════════════════════ */
export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    if (!fullText.trim()) throw new Error("No text content found in PDF.");
    return fullText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
};

/* ═══════════════════════════════════════════════
   RESUME DATA PARSER
   Returns data for ALL 7 form pages:
   { personal, education, experience, achievements, reporting }
═══════════════════════════════════════════════ */
export const parseResumeData = (text) => {
  if (!text) return {};

  // Normalize whitespace but preserve structure
  const clean = text.replace(/\s+/g, " ").trim();

  /* ────────────────────────────────────────────
     HELPERS
  ──────────────────────────────────────────── */

  // Extract institution name following a keyword
  const extractInstitution = (keyword) => {
    const re = new RegExp(
      `(?:${keyword})[^.\\n]{0,100}?(?:from|at|,|-)\\s*([A-Z][A-Za-z\\s&.,'\\-]{3,60}?)(?:\\.|,|\\d|\\()`,
      "i"
    );
    const m = clean.match(re);
    // Fallback: keyword appears directly before institution without preposition
    if (!m) {
      const re2 = new RegExp(
        `(?:${keyword})[^.\\n]{0,30}\\s+([A-Z][A-Za-z\\s&.,'\\-]{3,50}?)(?:\\.|,|\\d{4})`,
        "i"
      );
      const m2 = clean.match(re2);
      return m2 ? m2[1].trim() : "";
    }
    return m[1].trim();
  };

  // Extract grade/percentage/cgpa near a keyword
  const extractGrade = (keyword) => {
    const re = new RegExp(
      `(?:${keyword})[^.\\n]{0,150}?(\\d{1,3}(?:\\.\\d+)?)\\s*(?:%|cgpa|gpa|grade|marks|out of|score)`,
      "i"
    );
    const m = clean.match(re);
    return m ? m[1] : "";
  };

  // Extract passing year near a keyword, return YYYY-MM for <input type="month">
  const extractYear = (keyword) => {
    const re = new RegExp(
      `(?:${keyword})[^.\\n]{0,120}?((?:19|20)\\d{2})`,
      "i"
    );
    const m = clean.match(re);
    return m ? `${m[1]}-01` : "";
  };

  /* ────────────────────────────────────────────
     PAGE 1 — PERSONAL
  ──────────────────────────────────────────── */

  // Email
  const emailMatch = clean.match(/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i);
  const email = emailMatch ? emailMatch[0] : "";

  // Phone — store EXACTLY as it appears in resume (with country code if present)
  // Handles: +91-XXXXXXXXXX, +91 XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX
  // Also handles international formats: +1 XXX XXX XXXX, +44 XXXX XXXXXX etc.
  let phone = "";
  const phonePatterns = [
    // Full international format: +CountryCode digits (most specific first)
    /(\+\d{1,3}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{3,5}[\s\-]?\d{4,6})/,
    // Indian with country code but no +: 91 followed by 10 digit mobile
    /(91[\s\-]?[6-9]\d{9})/,
    // Indian mobile without country code: starts 6-9, 10 digits
    /\b([6-9]\d{9})\b/,
    // Any 10-digit number with separators
    /\b(\d{3}[\s.\-]\d{3}[\s.\-]\d{4})\b/
  ];
  for (const pattern of phonePatterns) {
    const m = clean.match(pattern);
    if (m) {
      // Clean up extra spaces/dashes inside the number but keep country code
      phone = m[1].replace(/[\s]/g, "").trim();
      break;
    }
  }

  // Years of experience
  const expYearsMatch = clean.match(
    /(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp(?:erience)?)?/i
  );
  const experience = expYearsMatch ? expYearsMatch[1] : "";

  // Name — first pair of consecutive Title-cased words near top of document
  // Uses first 500 chars to avoid picking up institution names deeper in doc
  let firstName = "";
  let lastName = "";
  const topText = clean.slice(0, 500);
  const nameMatch =
    topText.match(/\b([A-Z][a-z]{1,20})\s+([A-Z][a-z]{1,20})\b/) ||
    clean.match(/\b([A-Z][a-z]{1,20})\s+([A-Z][a-z]{1,20})\b/);
  if (nameMatch) {
    firstName = nameMatch[1];
    lastName  = nameMatch[2];
  }

  // Address
  const addressMatch = clean.match(
    /(?:address|residence|location)[:\s]+([A-Za-z0-9\s,.\-/#]{10,100}?)(?:pin|phone|mob|email|–|—|\n|$)/i
  );
  // Fallback: detect "City, State - 6digitPIN" pattern
  const pinMatch = clean.match(
    /([A-Za-z\s,.\-]{5,60},\s*[A-Za-z\s]{3,30}[\s\-]+\d{6})/
  );
  const address = addressMatch
    ? addressMatch[1].trim()
    : pinMatch
    ? pinMatch[1].trim()
    : "";

  /* ────────────────────────────────────────────
     PAGE 2 — EDUCATION
  ──────────────────────────────────────────── */

  // Registration number (MCI / State Medical Council)
  const regnoMatch = clean.match(
    /(?:reg(?:istration)?[\s#.:no\-]*(?:no|number)?[\s.:]*|MCI[\s:]+|council[\s:]+reg[^.\n]{0,30})([A-Z0-9\/\-]{4,25})/i
  );

  const education = {
    tenthname:       extractInstitution("10th|tenth|class\\s*x\\b|ssc|matriculation|secondary school"),
    tenthgrade:      extractGrade("10th|tenth|ssc|matriculation"),
    tenthpsyr:       extractYear("10th|tenth|ssc|matriculation"),

    twelthname:      extractInstitution("12th|twelfth|class\\s*xii|hsc|intermediate|higher secondary|senior secondary"),
    twelthgrade:     extractGrade("12th|twelfth|hsc|intermediate|higher secondary"),
    twelthpsyr:      extractYear("12th|twelfth|hsc|intermediate|higher secondary"),

    mbbsinstitution: extractInstitution("mbbs"),
    mbbsgrade:       extractGrade("mbbs"),
    mbbspsyr:        extractYear("mbbs"),

    mdinstitution:   extractInstitution("md\\b|dnb\\b|post.?graduate|post.?graduation|post.?grad"),
    mdgrade:         extractGrade("md\\b|dnb\\b"),
    mdpsyr:          extractYear("md\\b|dnb\\b|post.?grad"),

    regno: regnoMatch ? regnoMatch[1].trim() : ""
  };

  /* ────────────────────────────────────────────
     PAGE 3 — WORK EXPERIENCE BLOCKS
  ──────────────────────────────────────────── */
  const experienceBlocks = [];

  // Pattern: "Institution Name   Month YYYY – Month YYYY"
  const expBlockRe =
    /([A-Z][A-Za-z\s&.,'\-]{5,70}(?:hospital|clinic|institute|centre|center|diagnostics|healthcare|radiology|medical|labs?|imaging)[A-Za-z\s&.,'\-]{0,40})\s+((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{4})\s*(?:–|—|-|to)\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{4}|present|current|till\s*date)/gi;

  const parseToISO = (str) => {
    if (!str || /present|current|till/i.test(str)) return "";
    const d = new Date(str);
    return isNaN(d) ? "" : d.toISOString().split("T")[0];
  };

  let expBlockMatch;
  while ((expBlockMatch = expBlockRe.exec(clean)) !== null) {
    experienceBlocks.push({
      institution: expBlockMatch[1].trim(),
      startDate:   parseToISO(expBlockMatch[2]),
      endDate:     parseToISO(expBlockMatch[3])
    });
  }

  /* ────────────────────────────────────────────
     PAGE 4 — ACHIEVEMENTS
  ──────────────────────────────────────────── */
  // Research/publication links
  const publishMatch = clean.match(
    /(?:https?:\/\/(?:www\.)?(?:pubmed|ncbi|researchgate|scholar\.google|doi|journals|springer|elsevier|academia)[^\s]{5,}|doi\.org\/[^\s]+)/i
  );
  // Fallback: any https link that looks like a publication
  const anyLinkMatch = clean.match(/https?:\/\/[^\s]{15,}/i);
  const publishlink = publishMatch
    ? publishMatch[0]
    : anyLinkMatch
    ? anyLinkMatch[0]
    : "";

  // Award names near keywords
  const awardMatches = [];
  const awardRe =
    /(?:award|honour|honor|fellowship|recognition|prize|medal)[^.]{0,5}:?\s*([A-Z][A-Za-z\s&.,'\-]{5,60}?)(?:\.|,|\d{4})/gi;
  let awardMatch;
  while ((awardMatch = awardRe.exec(clean)) !== null) {
    awardMatches.push({ name: awardMatch[1].trim(), date: "" });
  }

  /* ────────────────────────────────────────────
     PAGE 6 — REPORTING AREA (inferred from resume)
  ──────────────────────────────────────────── */
  const mriopt = [];
  if (/\bMRI\b/i.test(clean)) {
    if (/\bbrain\b/i.test(clean))            mriopt.push("Brain");
    if (/\bspine\b|\bspinal\b/i.test(clean)) mriopt.push("Spine");
    if (/\bMSK\b|\bmusculo/i.test(clean))    mriopt.push("MSK");
    if (/\bbody\b/i.test(clean))             mriopt.push("Body");
  }

  const ctopt = [];
  if (/\bCT\b|\bCTScan\b|\bcomputed tomography\b/i.test(clean)) {
    if (/\bbrain\b/i.test(clean))    ctopt.push("Brain");
    if (/\bchest\b/i.test(clean))    ctopt.push("Chest");
    if (/\babdomen\b/i.test(clean))  ctopt.push("Abdomen");
    if (/\bneck\b/i.test(clean))     ctopt.push("Neck");
    if (/\bangio\b/i.test(clean))    ctopt.push("Angio");
  }

  const xray = /\bX-?ray\b|\bradiograph/i.test(clean);

  /* ────────────────────────────────────────────
     RETURN — structured for all form sections
  ──────────────────────────────────────────── */
  return {
    // Page 1
    personal: { firstName, lastName, email, phone, experience, address },

    // Page 2
    education,

    // Page 3
    experience: experienceBlocks.length > 0 ? experienceBlocks : null,

    // Page 4
    achievements: {
      awards:      awardMatches.length > 0 ? awardMatches : [{ name: "", date: "" }],
      publishlink
    },

    // Page 6
    reporting: {
      mriopt,
      ctopt,
      mriothers: "",
      ctothers:  "",
      xray,
      other:     false,
      otherText: ""
    }
  };
};