// for adding login button of cordinator and supercordinator


// import { useNavigate } from "react-router-dom";
// import "./onboarding.css";

// export default function Onboarding() {
//   const navigate = useNavigate();

//   return (
//     <div className="onboarding-container">
//       <div className="onboarding-box">
//         <div className="onboarding-logo">U4RAD</div>
//         <h1 className="onboarding-title">Welcome to U4RAD</h1>
//         <p className="onboarding-subtitle">
//           Please select how you would like to continue
//         </p>

//         <div className="card-wrapper">
//           {/* CLIENT */}
//           <div className="role-card" onClick={() => navigate("/onboarding/client")}>
//             <div className="icon">🏥</div>
//             <h3>Client</h3>
//             <p>Hospitals &amp; Diagnostic Centers</p>
//           </div>

//           {/* RADIOLOGIST */}
//           <div className="role-card" onClick={() => navigate("/onboarding/radiologist")}>
//             <div className="icon">🩺</div>
//             <h3>Radiologist</h3>
//             <p>Join our expert reporting panel</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



//  login button for cordinator and supercordinator

import { useNavigate } from "react-router-dom";
import "./onboarding.css";

export default function Onboarding() {

  const navigate = useNavigate();

  return (
    <div className="onboarding-container">

      <div className="onboarding-box">

        <div className="onboarding-logo">U4RAD</div>

        <h1 className="onboarding-title">
          Welcome to U4RAD
        </h1>

        <p className="onboarding-subtitle">
          Please select how you would like to continue
        </p>

        <div className="card-wrapper">

          {/* CLIENT */}

          <div
            className="role-card"
            onClick={() => navigate("/onboarding/client")}
          >

            <div className="icon">🏥</div>

            <h3>Client</h3>

            <p>Hospitals & Diagnostic Centers</p>

          </div>


          {/* RADIOLOGIST */}

          <div
            className="role-card"
            onClick={() => navigate("/onboarding/radiologist")}
          >

            <div className="icon">🩺</div>

            <h3>Radiologist</h3>

            <p>Join our expert reporting panel</p>

          </div>

        </div>


        {/* LOGIN BUTTON */}

        <div className="login">

          <button
            className="login-btn"
            onClick={() => window.open("/login", "_blank")}
          >
            Login

          </button>

        </div>

      </div>

    </div>
  );
}