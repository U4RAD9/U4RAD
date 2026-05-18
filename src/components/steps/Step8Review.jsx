
// import { useContext } from "react";
// import { FormContext } from "../../components/context/FormContext";
// import "../styles/form.css";

// /* hidden fields */

// const HIDDEN_PERSONAL_KEYS = [
//   "password","confirmPassword",
//   "resume","photo","photoPreview"
// ];

// const HIDDEN_EDUCATION_KEYS = [
//   "tenthcertificate","twelthcertificate",
//   "mbbsmarksheet","mbbsdegree",
//   "mdmarksheet","mddegree",
//   "regfile","videofile"
// ];

// const HIDDEN_BANKING_KEYS = [
//   "panCardFile","aadharCardFile","chequeFile"
// ];

// /* labels */

// const LABEL_MAP = {
//   firstName:"First Name",
//   lastName:"Last Name",
//   email:"Email",
//   address:"Address",
//   phone:"Contact No.",
//   tenthname:"10th School Name",
//   tenthgrade:"10th Grade",
//   tenthpsyr:"10th Passing Year",
//   twelthname:"12th School Name",
//   twelthgrade:"12th Grade",
//   twelthpsyr:"12th Passing Year",
//   mbbsinstitution:"MBBS Institution",
//   mdinstitution:"MD Institution",
//   accountHolderName:"Account Holder Name",
//   bankName:"Bank Name",
//   accountNumber:"Account Number",
//   ifscCode:"IFSC Code",
//   publishlink:"Publish Link",
//   name:"Award Name",
//   date:"Award Date"
// };

// const label=(key)=>
// LABEL_MAP[key]||
// key.replace(/([A-Z])/g," $1").replace(/^./,(s)=>s.toUpperCase());

// export default function Step8Review(){

// const { formData } = useContext(FormContext);

// const fullName =
// formData.personal?.firstName &&
// formData.personal?.lastName
// ? `${formData.personal.firstName} ${formData.personal.lastName}`
// : "Applicant";

// /* SAVE DATA */

// const handleSubmit = ()=>{

// const existing =
// JSON.parse(localStorage.getItem("radiologists")) || [];

// const newUser = {

// id: Date.now(),

// first_name: formData.personal?.firstName || "",
// last_name: formData.personal?.lastName || "",
// email: formData.personal?.email || "",
// contact: formData.personal?.phone || "",

// stage1:"Applied",
// stage2:"None",

// rateList:null,
// emailSent:false,

// onboardingData: formData

// };

// existing.push(newUser);

// localStorage.setItem(
// "radiologists",
// JSON.stringify(existing)
// );

// alert("Application Submitted Successfully");

// };

// /* generic row */

// const renderRows=(data,hiddenKeys=[])=>{

// if(!data) return <Empty/>;

// const entries = Object.entries(data).filter(([key,value])=>{

// if(hiddenKeys.includes(key)) return false;
// if(value===null||value===undefined||value==="") return false;
// if(value instanceof File) return false;
// if(typeof value==="object"&&!Array.isArray(value)) return false;
// if(Array.isArray(value)&&value.length===0) return false;

// return true;

// });

// if(entries.length===0) return <Empty/>;

// return entries.map(([key,value])=>(
// <Row
// key={key}
// label={label(key)}
// value={Array.isArray(value)?value.join(", "):String(value)}
// />
// ));

// };

// /* experience */

// const renderExperience=()=>{

// const exp=formData.experience;

// if(!exp||exp.length===0) return <Empty/>;

// return exp.map((item,i)=>(
// <div key={i} style={{marginBottom:"12px"}}>

// <p style={{
// color:"#ff4444",
// fontSize:"12px",
// fontWeight:600
// }}>
// Experience {i+1}
// </p>

// {renderRows(item)}

// </div>
// ));

// };

// /* achievements */

// const renderAchievements=()=>{

// const ach=formData.achievements;

// if(!ach) return <Empty/>;

// return(
// <>

// {ach.awards?.filter(a=>a.name).map((award,i)=>(

// <div key={i} style={{marginBottom:"10px"}}>

// <p style={{
// color:"#ff4444",
// fontSize:"12px",
// fontWeight:600
// }}>
// Award {i+1}
// </p>

// {award.name && <Row label="Award Name" value={award.name}/>}
// {award.date && <Row label="Date" value={award.date}/>}

// </div>

// ))}

// {ach.publishlink && (
// <Row label="Publish Link" value={ach.publishlink} breakAll/>
// )}

// </>
// );

// };

// /* reporting */

// const renderReporting=()=>{

// const r=formData.reporting;

// if(!r) return <Empty/>;

// return(
// <>

// {r.mriopt?.length>0 && (
// <Row label="MRI" value={r.mriopt.join(", ")}/>
// )}

// {r.ctopt?.length>0 && (
// <Row label="CT" value={r.ctopt.join(", ")}/>
// )}

// {r.xray && (
// <Row label="X-Ray" value="Yes"/>
// )}

// </>
// );

// };

// /* availability */

// const renderAvailability=()=>{

// const a=formData.availability;

// if(!a) return <Empty/>;

// const days=[
// "monday","tuesday","wednesday",
// "thursday","friday","saturday","sunday"
// ];

// const enabled=days.filter(d=>a[d]?.enabled);

// if(enabled.length===0) return <Empty/>;

// return enabled.map(day=>(
// <Row
// key={day}
// label={day.charAt(0).toUpperCase()+day.slice(1)}
// value={`${a[day].start || "--:--"} - ${a[day].end || "--:--"}`}
// />
// ));

// };

// /* banking */

// const renderBanking=()=>{

// const b=formData.banking;

// if(!b) return <Empty/>;

// const masked={...b};

// if(masked.accountNumber && masked.accountNumber.length>4){

// masked.accountNumber =
// "•".repeat(masked.accountNumber.length-4) +
// masked.accountNumber.slice(-4);

// }

// return renderRows(masked,HIDDEN_BANKING_KEYS);

// };

// /* UI */

// return(

// <div className="review-container">

// <h2 className="review-main-heading">
// Review — {fullName}
// </h2>

// <p style={{
// color:"#888",
// fontSize:"18px",
// marginBottom:"25px",
// textAlign:"center"
// }}>
// Please review all details before submitting.
// </p>

// <Section title="Personal Information">
// {renderRows(formData.personal,HIDDEN_PERSONAL_KEYS)}
// </Section>

// <Section title="Education">
// {renderRows(formData.education,HIDDEN_EDUCATION_KEYS)}
// </Section>

// <Section title="Work Experience">
// {renderExperience()}
// </Section>

// <Section title="Achievements">
// {renderAchievements()}
// </Section>

// <Section title="Banking Details">
// {renderBanking()}
// </Section>

// <Section title="Reporting Areas">
// {renderReporting()}
// </Section>

// <Section title="Weekly Availability">
// {renderAvailability()}
// </Section>

// <div style={{
// textAlign:"center",
// marginTop:"40px"
// }}>

// <button
// onClick={handleSubmit}
// style={{
// background:"#2563eb",
// color:"white",
// border:"none",
// padding:"12px 28px",
// borderRadius:"6px",
// fontSize:"16px",
// cursor:"pointer"
// }}
// >
// Submit Application
// </button>

// </div>

// </div>

// );

// }

// /* components */

// function Section({title,children}){
// return(
// <div className="review-section">
// <h3 className="review-section-title">{title}</h3>
// {children}
// </div>
// );
// }

// function Row({label,value,breakAll}){
// return(
// <div className="review-line">
// <span className="review-label">{label}</span>
// <span className="review-separator">:</span>
// <span
// className="review-data"
// style={breakAll?{wordBreak:"break-all"}:{}}
// >
// {value}
// </span>
// </div>
// );
// }

// function Empty(){
// return(
// <p style={{
// color:"#555",
// fontSize:"13px",
// fontStyle:"italic"
// }}>
// No data entered for this section.
// </p>
// );
// }


import { useContext } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

/* hidden fields */

const HIDDEN_PERSONAL_KEYS = [
  "password",
  "confirmPassword",
  "resume",
  "photo",
  "photoPreview",
];

const HIDDEN_EDUCATION_KEYS = [
  "tenthcertificate",
  "twelthcertificate",
  "mbbsmarksheet",
  "mbbsdegree",
  "mdmarksheet",
  "mddegree",
  "regfile",
  "videofile",
];

const HIDDEN_BANKING_KEYS = [
  "panCardFile",
  "aadharCardFile",
  "chequeFile",
  "indemnityFile",
];

/* labels */

const LABEL_MAP = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  address: "Address",
  phone: "Contact No.",

  tenthname: "10th School Name",
  tenthgrade: "10th Grade",
  tenthpsyr: "10th Passing Year",

  twelthname: "12th School Name",
  twelthgrade: "12th Grade",
  twelthpsyr: "12th Passing Year",

  mbbsinstitution: "MBBS Institution",
  mdinstitution: "MD Institution",

  accountHolderName: "Account Holder Name",
  bankName: "Bank Name",
  accountNumber: "Account Number",
  ifscCode: "IFSC Code",

  indemnityInsuranceName: "Indemnity Insurance Name",
  indemnityCoverage: "Coverage Amount",

  publishlink: "Publish Link",

  name: "Award Name",
  date: "Award Date",
};

const label = (key) =>
  LABEL_MAP[key] ||
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

export default function Step8Review() {
  const { formData } = useContext(FormContext);

  const fullName =
    formData.personal?.firstName &&
    formData.personal?.lastName
      ? `${formData.personal.firstName} ${formData.personal.lastName}`
      : "Applicant";

  /* SAVE DATA */

  const handleSubmit = () => {
    const existing =
      JSON.parse(localStorage.getItem("radiologists")) || [];

    const newUser = {
      id: Date.now(),

      first_name: formData.personal?.firstName || "",
      last_name: formData.personal?.lastName || "",
      email: formData.personal?.email || "",
      contact: formData.personal?.phone || "",

      stage1: "Applied",
      stage2: "None",

      rateList: null,
      emailSent: false,

      onboardingData: formData,
    };

    existing.push(newUser);

    localStorage.setItem(
      "radiologists",
      JSON.stringify(existing)
    );

    alert("Application Submitted Successfully");
  };

  /* generic row */

  const renderRows = (data, hiddenKeys = []) => {
    if (!data) return <Empty />;

    const entries = Object.entries(data).filter(
      ([key, value]) => {
        if (hiddenKeys.includes(key)) return false;

        if (
          value === null ||
          value === undefined ||
          value === ""
        )
          return false;

        if (value instanceof File) return false;

        if (
          typeof value === "object" &&
          !Array.isArray(value)
        )
          return false;

        if (Array.isArray(value) && value.length === 0)
          return false;

        return true;
      }
    );

    if (entries.length === 0) return <Empty />;

    return entries.map(([key, value]) => (
      <Row
        key={key}
        label={label(key)}
        value={
          Array.isArray(value)
            ? value.join(", ")
            : String(value)
        }
      />
    ));
  };

  /* experience */

  const renderExperience = () => {
    const exp = formData.experience;

    if (!exp || exp.length === 0) return <Empty />;

    return exp.map((item, i) => (
      <div key={i} style={{ marginBottom: "12px" }}>
        <p
          style={{
            color: "#ff4444",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Experience {i + 1}
        </p>

        {renderRows(item)}
      </div>
    ));
  };

  /* achievements */

  const renderAchievements = () => {
    const ach = formData.achievements;

    if (!ach) return <Empty />;

    return (
      <>
        {/* Awards */}

        {ach.awards?.filter((a) => a.name).map((award, i) => (
          <div
            key={i}
            style={{ marginBottom: "15px" }}
          >
            <p
              style={{
                color: "#ff4444",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Award {i + 1}
            </p>

            {award.name && (
              <Row
                label="Award Name"
                value={award.name}
              />
            )}

            {award.date && (
              <Row
                label="Award Date"
                value={award.date}
              />
            )}
          </div>
        ))}

        {/* Fellowships */}

        {ach.fellowships?.filter((f) => f.name).map(
          (fellowship, i) => (
            <div
              key={i}
              style={{ marginBottom: "15px" }}
            >
              <p
                style={{
                  color: "#ff4444",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Fellowship {i + 1}
              </p>

              {fellowship.name && (
                <Row
                  label="Fellowship Name"
                  value={fellowship.name}
                />
              )}

              {fellowship.institute && (
                <Row
                  label="Institute"
                  value={fellowship.institute}
                />
              )}

              {fellowship.year && (
                <Row
                  label="Year"
                  value={fellowship.year}
                />
              )}
            </div>
          )
        )}

        {/* Publish Link */}

        {ach.publishlink && (
          <Row
            label="Publish Link"
            value={ach.publishlink}
            breakAll
          />
        )}
      </>
    );
  };

  /* reporting */

  const renderReporting = () => {
    const r = formData.reporting;

    if (!r) return <Empty />;

    return (
      <>
        {r.mriopt?.length > 0 && (
          <Row
            label="MRI"
            value={r.mriopt.join(", ")}
          />
        )}

        {r.mriothers && (
          <Row
            label="Other MRI"
            value={r.mriothers}
          />
        )}

        {r.ctopt?.length > 0 && (
          <Row
            label="CT"
            value={r.ctopt.join(", ")}
          />
        )}

        {r.ctothers && (
          <Row
            label="Other CT"
            value={r.ctothers}
          />
        )}

        {r.subspeciality?.length > 0 && (
          <Row
            label="Subspeciality"
            value={r.subspeciality.join(", ")}
          />
        )}

        {r.xray && (
          <Row label="X-Ray" value="Yes" />
        )}

        {r.other && (
          <Row
            label="Other Reporting Area"
            value={r.otherText || "Yes"}
          />
        )}
      </>
    );
  };

  /* availability */

  const renderAvailability = () => {
    const a = formData.availability;

    if (!a) return <Empty />;

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const enabled = days.filter(
      (d) => a[d]?.enabled
    );

    if (enabled.length === 0) return <Empty />;

    return enabled.map((day) => (
      <Row
        key={day}
        label={
          day.charAt(0).toUpperCase() +
          day.slice(1)
        }
        value={`${a[day].start || "--:--"} - ${
          a[day].end || "--:--"
        }`}
      />
    ));
  };

  /* banking */

  const renderBanking = () => {
    const b = formData.banking;

    if (!b) return <Empty />;

    const masked = { ...b };

    if (
      masked.accountNumber &&
      masked.accountNumber.length > 4
    ) {
      masked.accountNumber =
        "•".repeat(
          masked.accountNumber.length - 4
        ) + masked.accountNumber.slice(-4);
    }

    return renderRows(
      masked,
      HIDDEN_BANKING_KEYS
    );
  };

  /* UI */

  return (
    <div className="review-container">
      <h2 className="review-main-heading">
        Review — {fullName}
      </h2>

      <p
        style={{
          color: "#888",
          fontSize: "18px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        Please review all details before
        submitting.
      </p>

      <Section title="Personal Information">
        {renderRows(
          formData.personal,
          HIDDEN_PERSONAL_KEYS
        )}
      </Section>

      <Section title="Education">
        {renderRows(
          formData.education,
          HIDDEN_EDUCATION_KEYS
        )}
      </Section>

      <Section title="Work Experience">
        {renderExperience()}
      </Section>

      <Section title="Achievements">
        {renderAchievements()}
      </Section>

      <Section title="Banking Details">
        {renderBanking()}
      </Section>

      <Section title="Reporting Areas">
        {renderReporting()}
      </Section>

      <Section title="Weekly Availability">
        {renderAvailability()}
      </Section>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}

/* components */

function Section({ title, children }) {
  return (
    <div className="review-section">
      <h3 className="review-section-title">
        {title}
      </h3>

      {children}
    </div>
  );
}

function Row({ label, value, breakAll }) {
  return (
    <div className="review-line">
      <span className="review-label">
        {label}
      </span>

      <span className="review-separator">
        :
      </span>

      <span
        className="review-data"
        style={
          breakAll
            ? { wordBreak: "break-all" }
            : {}
        }
      >
        {value}
      </span>
    </div>
  );
}

function Empty() {
  return (
    <p
      style={{
        color: "#555",
        fontSize: "13px",
        fontStyle: "italic",
      }}
    >
      No data entered for this section.
    </p>
  );
}