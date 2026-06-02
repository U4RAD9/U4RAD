import React from "react";
import { useNavigate } from "react-router-dom";
import ClientOnboarding from "../components/ClientOnboarding";
import Navbar from "D:/U4RAD/src/components/Navbar.jsx"; // Ensure this points to your actual Navbar file!

export default function ClientOnboardingPage() {
  const navigate = useNavigate();
  
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Adding the Navbar makes it feel like you are still on the Home Page */}
      <Navbar />
      
      <ClientOnboarding
        asPage
        onClose={() => navigate("/")}
      />
    </div>
  );
}