import React from "react";

// Theme: Red (#c8102e), Black (#1a1a1a), White (#ffffff)
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  box: {
    background: "#ffffff",
    borderRadius: "4px",
    width: "100%",
    maxWidth: "660px",
    maxHeight: "88vh",
    overflowY: "auto",
    boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
    border: "1px solid #e0e0e0",
    position: "relative",
  },
  header: {
    background: "#1a1a1a",
    padding: "28px 36px 22px",
    borderBottom: "3px solid #c8102e",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    color: "#ffffff",
    margin: 0,
    fontSize: "20px",
    fontWeight: "400",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  headerSub: {
    color: "#c8102e",
    fontSize: "12px",
    letterSpacing: "0.15em",
    marginTop: "4px",
    textTransform: "uppercase",
  },
  body: {
    padding: "0 36px 36px",
  },
  section: {
    marginTop: "28px",
    paddingBottom: "24px",
    borderBottom: "1px solid #ebebeb",
  },
  sectionLast: {
    marginTop: "28px",
    paddingBottom: "0",
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c8102e",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionTitleLine: {
    flex: 1,
    height: "1px",
    background: "#ebebeb",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 24px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888888",
  },
  value: {
    fontSize: "14px",
    color: "#1a1a1a",
    lineHeight: "1.5",
  },
  link: {
    fontSize: "14px",
    color: "#c8102e",
    textDecoration: "none",
    borderBottom: "1px solid #c8102e",
    paddingBottom: "1px",
    wordBreak: "break-all",
  },
  eduCard: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderLeft: "3px solid #c8102e",
    borderRadius: "3px",
    padding: "14px 18px",
    marginBottom: "10px",
  },
  eduCardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "10px",
    letterSpacing: "0.03em",
  },
  eduGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px 16px",
  },
  tagGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "4px",
  },
  tag: {
    background: "#1a1a1a",
    color: "#ffffff",
    borderRadius: "3px",
    padding: "4px 12px",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  tagAccent: {
    background: "#c8102e",
    color: "#ffffff",
    borderRadius: "3px",
    padding: "4px 12px",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  dayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
    marginBottom: "14px",
  },
  dayChip: (active) => ({
    textAlign: "center",
    padding: "8px 4px",
    borderRadius: "3px",
    fontSize: "10px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: "700",
    background: active ? "#c8102e" : "#f5f5f5",
    color: active ? "#ffffff" : "#aaaaaa",
    border: active ? "none" : "1px solid #e0e0e0",
  }),
  timeSlotCard: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: "3px",
    padding: "12px 16px",
    marginBottom: "8px",
  },
  timeSlotTitle: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#888888",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  timeRow: {
    display: "flex",
    gap: "16px",
  },
  timeBox: {
    flex: 1,
    textAlign: "center",
  },
  timeLabel: {
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888888",
    marginBottom: "2px",
  },
  timeValue: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  expCard: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderLeft: "3px solid #1a1a1a",
    borderRadius: "3px",
    padding: "14px 18px",
    marginBottom: "10px",
  },
  achCard: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderLeft: "3px solid #c8102e",
    borderRadius: "3px",
    padding: "14px 18px",
    marginBottom: "10px",
  },
  closeBtn: {
    display: "block",
    width: "100%",
    padding: "14px",
    background: "#c8102e",
    color: "#ffffff",
    border: "none",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "28px",
    borderRadius: "3px",
    transition: "background 0.2s",
  },
  badge: (val) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "3px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    background: val ? "#1a1a1a" : "#fdecea",
    color: val ? "#ffffff" : "#c8102e",
    border: val ? "none" : "1px solid #f5c0bb",
  }),
  emptyState: {
    fontSize: "13px",
    color: "#aaaaaa",
    fontStyle: "italic",
  },
};

function Field({ label, value }) {
  return (
    <div style={styles.field}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value !== undefined && value !== null && value !== "" ? value : <span style={styles.emptyState}>—</span>}</span>
    </div>
  );
}

function LinkField({ label, href, linkText }) {
  return (
    <div style={styles.field}>
      <span style={styles.label}>{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" style={styles.link}>
          {linkText || `View ${label}`}
        </a>
      ) : (
        <span style={styles.emptyState}>—</span>
      )}
    </div>
  );
}

function BoolField({ label, value }) {
  return (
    <div style={styles.field}>
      <span style={styles.label}>{label}</span>
      <span style={styles.badge(value)}>{value ? "Yes" : "No"}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 style={styles.sectionTitle}>
      {children}
      <span style={styles.sectionTitleLine} />
    </h3>
  );
}

export default function ViewFormModal({ user, closeModal }) {
  const data = user?.form_details || {};
  const edu = data?.education_details || {};
  const reporting = data?.reporting_area || {};
  const avail = data?.availability || {};
  const banking = data?.banking_details || {};
  const indemnity = data?.indemnity_insurance || {};
  const experiences = Array.isArray(data?.experience_details) ? data.experience_details : [];
  const achievements = Array.isArray(data?.achievement_details) ? data.achievement_details : [];

  const fellowships = Array.isArray(data?.fellowship_details) ? data.fellowship_details : [];

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const formatDate = (d) => {
    if (!d) return null;
    try {
      return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return d;
    }
  };

  // Collect time slots — support both slot-based and single start/end_time keys
  const timeSlotKeys = [
    { label: "Slot 1", start: avail.start_time_slot_1 ?? avail.start_time, end: avail.end_time_slot_1 ?? avail.end_time },
    { label: "Slot 2", start: avail.start_time_slot_2, end: avail.end_time_slot_2 },
    { label: "Slot 3", start: avail.start_time_slot_3, end: avail.end_time_slot_3 },
    { label: "Slot 4", start: avail.start_time_slot_4, end: avail.end_time_slot_4 },
  ];

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div style={styles.box}>

        {/* ── Header ── */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Complete Form Details</h2>
          <div style={styles.headerSub}>{user?.first_name} {user?.last_name}</div>
        </div>

        <div style={styles.body}>

          {/* ── Personal Information ── */}
          <div style={styles.section}>
            <SectionTitle>Personal Information</SectionTitle>
            <div style={styles.grid}>
              <Field label="First Name" value={user?.first_name} />
              <Field label="Last Name" value={user?.last_name} />
              <Field label="Email" value={user?.email} />
              <Field label="Contact No." value={user?.contact} />
              <Field label="Address" value={data?.address} />
              <Field label="Experience Years" value={data?.years_of_experience} />
            </div>
            <div style={{ ...styles.grid, marginTop: "14px" }}>
              <LinkField label="Resume" href={data?.resume} linkText="View Resume" />
              <LinkField label="Photo" href={data?.photo} linkText="View Photo" />
            </div>
          </div>

          {/* ── Educational Details ── */}
          <div style={styles.section}>
            <SectionTitle>Educational Details</SectionTitle>

            {/* 10th */}
            <div style={styles.eduCard}>
              <div style={styles.eduCardTitle}>10th Standard</div>
              <div style={styles.eduGrid}>
                <Field label="School Name" value={edu.tenth_name} />
                <Field label="Grade" value={edu.tenth_grade} />
                <Field label="Passing Year" value={formatDate(edu.tenth_passing_year) || edu.tenth_passing_year} />
                <LinkField label="10th Certificate" href={data.tenth_certificate} linkText="View Certificate" />
              </div>
            </div>

            {/* 12th */}
            <div style={styles.eduCard}>
              <div style={styles.eduCardTitle}>12th Standard</div>
              <div style={styles.eduGrid}>
                <Field label="School Name" value={edu.twelfth_name} />
                <Field label="Grade" value={edu.twelfth_grade} />
                <Field label="Passing Year" value={formatDate(edu.twelfth_passing_year) || edu.twelfth_passing_year} />
                <LinkField label="12th Certificate" href={data.twelfth_certificate} linkText="View Certificate" />
              </div>
            </div>

            {/* MBBS */}
            <div style={styles.eduCard}>
              <div style={styles.eduCardTitle}>MBBS</div>
              <div style={styles.eduGrid}>
                <Field label="Institution" value={edu.mbbs_institution} />
                <Field label="Grade" value={edu.mbbs_grade} />
                <Field label="Passing Year" value={formatDate(edu.mbbs_passing_year) || edu.mbbs_passing_year} />
                <LinkField label="MBBS Marksheet" href={data.mbbs_marksheet} linkText="View Marksheet" />
                <LinkField label="MBBS Degree" href={data.mbbs_degree} linkText="View Degree" />
              </div>
            </div>

            {/* MD */}
            <div style={styles.eduCard}>
              <div style={styles.eduCardTitle}>MD</div>
              <div style={styles.eduGrid}>
                <Field label="Institution" value={edu.md_institution} />
                <Field label="Grade" value={edu.md_grade} />
                <Field label="Passing Year" value={formatDate(edu.md_passing_year) || edu.md_passing_year} />
                <LinkField label="MD Marksheet" href={data.md_marksheet} linkText="View Marksheet" />
                <LinkField label="MD Degree" href={data.md_degree} linkText="View Degree" />
              </div>
            </div>

            {/* Registration & Video */}
            <div style={{ ...styles.grid, marginTop: "10px" }}>
              <Field label="State Registration Number" value={edu.registration_number} />
              <LinkField label="Registration File" href={data.registration_certificate} linkText="View Registration File" />
              <LinkField label="Video File" href={data.about_you_video} linkText="View Video" />
            </div>
          </div>

          {/* ── Experience Details ── */}
          <div style={styles.section}>
            <SectionTitle>Experience Details</SectionTitle>
            {experiences.length === 0 ? (
              <span style={styles.emptyState}>No experience added.</span>
            ) : (
              experiences.map((exp, i) => (
                <div key={i} style={styles.expCard}>
                  <div style={styles.eduCardTitle}>Experience {i + 1}</div>
                  <div style={styles.eduGrid}>
                    <Field label={`Institution`} value={exp.institution || exp.hospital_name || exp.name} />
                    <Field label="Starting Date" value={formatDate(exp.starting_date || exp.start_date) || exp.starting_date || exp.start_date} />
                    <Field label="Ending Date" value={formatDate(exp.ending_date || exp.end_date) || exp.ending_date || exp.end_date} />
                    {exp.designation && <Field label="Designation" value={exp.designation} />}
                  </div>
                </div>
              ))
            )}
          </div>

{/* ── Achievement Details ── */}
<div style={styles.section}>
  <SectionTitle>Achievement Details</SectionTitle>

  {achievements.length === 0 &&
  fellowships.length === 0 &&
  !data?.publish_link ? (
    <span style={styles.emptyState}>
      No achievements added.
    </span>
  ) : (
    <>
      {/* Awards */}

      {achievements.map((ach, i) => (
        <div key={i} style={styles.achCard}>
          <div style={styles.eduGrid}>
            <Field
              label={`Award ${i + 1}`}
              value={
                ach.award ||
                ach.name ||
                ach.title
              }
            />

            <Field
              label={`Award Date ${i + 1}`}
              value={
                formatDate(
                  ach.date || ach.award_date
                ) ||
                ach.date ||
                ach.award_date
              }
            />
          </div>
        </div>
      ))}

      {/* ========================
          FELLOWSHIPS
      ======================== */}

      {fellowships.map((fellowship, i) => (
        <div key={i} style={styles.achCard}>
          <div style={styles.eduCardTitle}>
            Fellowship {i + 1}
          </div>

          <div style={styles.eduGrid}>
            <Field
              label="Fellowship Name"
              value={fellowship.name}
            />

            <Field
              label="Institute"
              value={fellowship.institute}
            />

            <Field
              label="Year"
              value={fellowship.year}
            />
          </div>
        </div>
      ))}

      {/* Publish Link */}

      {data?.publish_link && (
        <div
          style={{
            marginTop:
              achievements.length ||
              fellowships.length
                ? "10px"
                : "0",
          }}
        >
          <LinkField
            label="Publish Link"
            href={data.publish_link}
            linkText={data.publish_link}
          />
        </div>
      )}
    </>
  )}
</div>

          {/* ── Banking Details ── */}
<div style={styles.section}>
  <SectionTitle>Banking Details</SectionTitle>

  <div style={styles.grid}>
    <Field
      label="Account Holder Name"
      value={banking.account_holder_name}
    />

    <Field
      label="Bank Name"
      value={banking.bank_name}
    />

    <Field
      label="Branch Name"
      value={banking.branch_name}
    />

    <Field
      label="Account Number"
      value={banking.account_number}
    />

    <Field
      label="IFSC"
      value={banking.ifsc}
    />

    <Field
      label="Pan Card Number"
      value={banking.pan_card_number}
    />

    <Field
      label="Aadhar Card Number"
      value={banking.aadhar_card_number}
    />

    {/* NEW FIELDS */}

    <Field
      label="Indemnity Insurance Name"
      value={indemnity.indemnity_insurance_name}
    />

    <Field
      label="Coverage Amount"
      value={
        indemnity.indemnity_coverage
          ? `₹ ${indemnity.indemnity_coverage}`
          : ""
      }
    />
  </div>

  <div
    style={{
      ...styles.grid,
      marginTop: "14px",
    }}
  >
    <LinkField
      label="Pan Card"
      href={banking.pan_card}
      linkText="View Pan Card"
    />

    <LinkField
      label="Aadhar Card"
      href={banking.aadhar_card}
      linkText="View Aadhar Card"
    />

    <LinkField
      label="Cheque"
      href={banking.cheque}
      linkText="View Cheque"
    />

    {/* NEW FILE */}

    <LinkField
      label="Insurance Document"
      href={indemnity.indemnity_file}
      linkText="View Insurance File"
    />
  </div>
</div>

{/* ── Reporting Area Details ── */}
<div style={styles.section}>
  <SectionTitle>Reporting Area Details</SectionTitle>

  <div style={styles.grid}>
    <BoolField
      label="Xray"
      value={reporting.xray}
    />

    <BoolField
      label="Others"
      value={reporting.others}
    />
  </div>

  {/* MRI */}

  <div style={{ marginTop: "16px" }}>
    <span style={styles.label}>
      MRI Options
    </span>

    <div style={styles.tagGroup}>
      {Array.isArray(reporting.mri_options) &&
      reporting.mri_options.length > 0 ? (
        reporting.mri_options.map((opt, i) => (
          <span
            key={i}
            style={styles.tagAccent}
          >
            {opt}
          </span>
        ))
      ) : (
        <span style={styles.emptyState}>—</span>
      )}
    </div>
  </div>

  <div style={{ marginTop: "12px" }}>
    <Field
      label="MRI Others"
      value={reporting.mri_others}
    />
  </div>

  {/* CT */}

  <div style={{ marginTop: "16px" }}>
    <span style={styles.label}>
      CT Options
    </span>

    <div style={styles.tagGroup}>
      {Array.isArray(reporting.ct_options) &&
      reporting.ct_options.length > 0 ? (
        reporting.ct_options.map((opt, i) => (
          <span key={i} style={styles.tag}>
            {opt}
          </span>
        ))
      ) : (
        <span style={styles.emptyState}>—</span>
      )}
    </div>
  </div>

  <div style={{ marginTop: "12px" }}>
    <Field
      label="CT Others"
      value={reporting.ct_others}
    />
  </div>

  {/* NEW SUBSPECIALITY */}

  <div style={{ marginTop: "16px" }}>
    <span style={styles.label}>
      Subspeciality
    </span>

    <div style={styles.tagGroup}>
      {Array.isArray(reporting.subspeciality) &&
      reporting.subspeciality.length > 0 ? (
        reporting.subspeciality.map((opt, i) => (
          <span
            key={i}
            style={styles.tagAccent}
          >
            {opt}
          </span>
        ))
      ) : (
        <span style={styles.emptyState}>—</span>
      )}
    </div>
  </div>

  <div style={{ marginTop: "12px" }}>
    <Field
      label="Others Text"
      value={reporting.others_description}
    />
  </div>
</div>
          {/* ── Availability Details ── */}
          <div style={styles.sectionLast}>
            <SectionTitle>Availability Details</SectionTitle>

            {/* Day chips */}
            <div style={styles.dayGrid}>
              {days.map((day, i) => (
                <div key={day} style={styles.dayChip(avail[day]?.enabled)}>
                  {dayLabels[i]}
                </div>
              ))}
            </div>

            {/* Day Yes/No text list */}
            <div style={styles.grid}>
              {days.map((day) => (
                <BoolField key={day} label={day.charAt(0).toUpperCase() + day.slice(1)} value={avail[day]?.enabled} />
              ))}
            </div>

            {/* Time Slots */}
            <div style={{ marginTop: "16px" }}>
              {days.map((day) => {
                const dayData = avail[day];

                if (!dayData?.enabled) return null;

                return (
                  <div key={day} style={styles.timeSlotCard}>
                    <div style={styles.timeSlotTitle}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </div>

                    <div style={styles.timeRow}>
                      <div style={styles.timeBox}>
                        <div style={styles.timeLabel}>Start Time</div>
                        <div style={styles.timeValue}>
                          {dayData.start || "—"}
                        </div>
                      </div>

                      <div style={styles.timeBox}>
                        <div style={styles.timeLabel}>End Time</div>
                        <div style={styles.timeValue}>
                          {dayData.end || "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            style={styles.closeBtn}
            onMouseEnter={(e) => (e.target.style.background = "#a00d24")}
            onMouseLeave={(e) => (e.target.style.background = "#c8102e")}
            onClick={closeModal}
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}