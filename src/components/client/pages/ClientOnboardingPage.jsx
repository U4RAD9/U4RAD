import React from "react";
import { useNavigate } from "react-router-dom";
import ClientOnboarding from "../components/ClientOnboarding";

export default function ClientOnboardingPage() {
  const navigate = useNavigate();
  return (
    <ClientOnboarding
      asPage
      onClose={() => navigate("/onboarding")}
      onSuccess={() => navigate("/onboarding")}
    />
  );
}