
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

export default function Career() {

  const navigate = useNavigate();

  return (
    <div className="onboarding-container">

      <div className="onboarding-box">

        <div className="onboarding-logo"></div>

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
           onClick={() => window.open(
             "https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link",
             "_blank"
           )}
         >

            <div className="icon">💼</div>

            <h3>Career Opportunities</h3>

            <p>Join Us</p>

          </div>


          {/* RADIOLOGIST */}

          <div
            className="role-card"
            onClick={() => navigate("/onboarding/radiologist")}
          >

            <div className="icon">🩺</div>

            <h3>Radiologist</h3>

            <p>Radiologist expert reporting panel</p>

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