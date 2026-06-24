// import { useNavigate } from "react-router-dom";
// import "./onboarding.css";

// export default function Onboarding() {
//   const navigate = useNavigate();

//   return (
//     <div className="onboarding-container">
//       <div className="onboarding-box">
//         <div className="onboarding-logo"></div>

//         <h1 className="onboarding-title">Welcome to U4RAD</h1>

//         <p className="onboarding-subtitle">
//           Please select how you would like to continue
//         </p>

//         <div className="card-wrapper">
//           {/* CLIENT CARD */}
//           <div
//             className="role-card cursor-pointer" // Added cursor-pointer for better UX
//             onClick={() => navigate("/onboarding/client")}
//           >
//             <div className="icon">🏥</div>
//             <h3>Client</h3>
//             <p>Hospitals & Diagnostic Centers</p>
//           </div>

//           {/* You can leave the Radiologist card commented out until you need it */}
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  // Updated to include the "Step X" labels
  const steps = [
    { title: "Step 1", desc: "Complete the registration form." },
    { title: "Step 2", desc: "Review and approve the quotation." },
    { title: "Step 3", desc: "Complete the PACS installation and begin your journey with U4RAD." }
  ];

  return (
    <>
      <style>
        {`
          .stepper-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0 40px 0;
            width: 100%;
          }

          .step-item {
            display: flex;
            align-items: flex-start; /* Aligns to top in case text wraps */
            gap: 15px;
            opacity: 0; 
            animation: fadeInSlide 0.6s ease forwards;
          }

          .step-number {
            background-color: #ef4444; /* Red color */
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
            flex-shrink: 0;
            margin-top: 2px; /* Slight adjustment to align with text */
          }

          .step-text {
            margin: 0;
            font-size: 0.95rem;
            color: #333;
            line-height: 1.4;
          }

          @keyframes fadeInSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      </style>

      <div className="onboarding-container">
        <div className="onboarding-box">
          <div className="onboarding-logo"></div>

          <h1 className="onboarding-title">Welcome to U4RAD</h1>

          {/* <p className="onboarding-subtitle">
            Please select how you would like to continue
          </p> */}

          <div className="stepper-container">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="step-item" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-number">✓</div>
                <p className="step-text">
                  <strong>{step.title}:</strong> {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="card-wrapper">
            {/* CLIENT CARD */}
            <div
              className="role-card cursor-pointer"
              onClick={() => navigate("/onboarding/client")}
            >
              <div className="icon">🏥</div>
              <h3>Client</h3>
              <p>Hospitals & Diagnostic Centers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}