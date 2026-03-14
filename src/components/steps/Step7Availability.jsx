// import { useState, useContext, useEffect } from "react";
// import { FormContext } from "../../context/FormContext";

// export default function Step7TimeAvailability() {
//   const { formData, updateSection } = useContext(FormContext);

//   const defaultAvailability = {
//     monday: { enabled: false, start: "", end: "" },
//     tuesday: { enabled: false, start: "", end: "" },
//     wednesday: { enabled: false, start: "", end: "" },
//     thursday: { enabled: false, start: "", end: "" },
//     friday: { enabled: false, start: "", end: "" },
//     saturday: { enabled: false, start: "", end: "" },
//     sunday: { enabled: false, start: "", end: "" },
//   };

//   const [availability, setAvailability] = useState(() => ({
//     ...defaultAvailability,
//     ...formData.availability,
//   }));

//   useEffect(() => {
//     setAvailability({
//       ...defaultAvailability,
//       ...formData.availability,
//     });
//   }, [formData.availability]);

//   const handleToggleDay = (day) => {
//     const updated = {
//       ...availability,
//       [day]: {
//         ...availability[day],
//         enabled: !availability[day].enabled,
//       },
//     };
//     setAvailability(updated);
//     updateSection("availability", updated);
//   };

//   const handleTimeChange = (day, field, value) => {
//     const updated = {
//       ...availability,
//       [day]: {
//         ...availability[day],
//         [field]: value,
//       },
//     };
//     setAvailability(updated);
//     updateSection("availability", updated);
//   };

//   return (
//     <div className="form-wrapper">
//       <h2 className="form-title">Radiologist's Signup Form</h2>
//       <h3 className="section-title">Weekly Availability</h3>

//       <div className="availability-table">
//         {Object.keys(defaultAvailability).map((day) => (
//           <div key={day} className="availability-row">

//             {/* Day Name + Checkbox */}
//             <div className="day-col">
//               <input
//                 type="checkbox"
//                 checked={availability[day]?.enabled || false}
//                 onChange={() => handleToggleDay(day)}
//               />
//               <span>
//                 {day.charAt(0).toUpperCase() + day.slice(1)}
//               </span>
//             </div>

//             {/* From */}
//             <div className="time-col">
//               <span className="time-label">From</span>
//               <input
//                 type="time"
//                 disabled={!availability[day]?.enabled}
//                 value={availability[day]?.start || ""}
//                 onChange={(e) =>
//                   handleTimeChange(day, "start", e.target.value)
//                 }
//               />
//             </div>

//             {/* To */}
//             <div className="time-col">
//               <span className="time-label">To</span>
//               <input
//                 type="time"
//                 disabled={!availability[day]?.enabled}
//                 value={availability[day]?.end || ""}
//                 onChange={(e) =>
//                   handleTimeChange(day, "end", e.target.value)
//                 }
//               />
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// cloude wala code for api testing


import { useState, useContext, useEffect } from "react";
import { FormContext } from "../../components/context/FormContext";
import "../styles/form.css";

export default function Step7TimeAvailability() {
  const { formData, updateSection } = useContext(FormContext);

  // Each day has: enabled (bool), start (HH:MM), end (HH:MM)
  // DoctorOnboardingForm reads each day's .enabled for the boolean flags
  // and uses the first enabled day's start/end as global start_time/end_time ✅
  const defaultAvailability = {
    monday:    { enabled: false, start: "", end: "" },
    tuesday:   { enabled: false, start: "", end: "" },
    wednesday: { enabled: false, start: "", end: "" },
    thursday:  { enabled: false, start: "", end: "" },
    friday:    { enabled: false, start: "", end: "" },
    saturday:  { enabled: false, start: "", end: "" },
    sunday:    { enabled: false, start: "", end: "" }
  };

  const [availability, setAvailability] = useState(() => ({
    ...defaultAvailability,
    ...formData.availability
  }));

  useEffect(() => {
    setAvailability({ ...defaultAvailability, ...formData.availability });
  }, [formData.availability]);

  const handleToggleDay = (day) => {
    const updated = {
      ...availability,
      [day]: { ...availability[day], enabled: !availability[day].enabled }
    };
    setAvailability(updated);
    updateSection("availability", updated);
  };

  const handleTimeChange = (day, field, value) => {
    const updated = {
      ...availability,
      [day]: { ...availability[day], [field]: value }
    };
    setAvailability(updated);
    updateSection("availability", updated);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Radiologist's Signup Form</h2>

      <div className="progress-steps">
        {["Info", "Qual", "Exp", "Achiev", "Bank", "Area", "Time"].map((step, index) => (
          <div key={index} className="step">
            <span className={`circle ${index === 6 ? "active" : ""}`}>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Weekly Availability :</h3>

      <div className="availability-table">
        {Object.keys(defaultAvailability).map((day) => (
          <div key={day} className="availability-row">
            <div className="day-col">
              <input
                type="checkbox"
                checked={availability[day]?.enabled || false}
                onChange={() => handleToggleDay(day)}
              />
              <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
            </div>

            <div className="time-col">
              <span className="time-label">From</span>
              <input
                type="time"
                disabled={!availability[day]?.enabled}
                value={availability[day]?.start || ""}
                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
              />
            </div>

            <div className="time-col">
              <span className="time-label">To</span>
              <input
                type="time"
                disabled={!availability[day]?.enabled}
                value={availability[day]?.end || ""}
                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

