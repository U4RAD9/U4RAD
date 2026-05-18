// import React from 'react';
// import Footer from './components/Footer';
// import Hero from './components/Hero';
// import Navbar from './components/Navbar';
// import Newsletter from './components/Newsletter';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import Services from './components/Services';
// import Technology from './components/Technology';
// import WhyUs from './components/WhyUs';
// import Vision from './components/Vision';
// import Awards from './components/Awards';
// import Certificate from './components/Certificate';

// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// import { FormProvider } from "./components/context/FormContext";

// // import DoctorOnboardingForm from "./pages/doctoronboarding/form.jsx";
// import DoctorOnboardingForm from "./components/pages/doctoronboarding/form.jsx";
// import CallbackForm from "./components/pages/doctoronboarding/callback.jsx";
// import Onboarding from "./components/pages/doctoronboarding/Onboarding.jsx";
// import CoordinatorDashboard from "./components/pages/doctoronboarding/CoordinatorDashboard.jsx";
// import SuperCoordinatorDashboard from "./components/pages/doctoronboarding/SuperCoordinatorDashboard.jsx";
// import ServiceDashboard from './components/pages/doctoronboarding/ServiceDashboard.jsx';
// import ServiceRates from './components/pages/doctoronboarding/ServiceRates.jsx';
// import CallbackDashboard from './components/pages/doctoronboarding/callbackdashboard.jsx';
// import CustomerDashboard from './components/pages/doctoronboarding/customerdashboard.jsx';
// import Login from "./components/pages/doctoronboarding/Login.jsx";
// import RateList from './components/pages/doctoronboarding/RatelistRadiologist.jsx';
// import RadiologistDashboard from './components/pages/doctoronboarding/RadiologistDashboard.jsx';

// function Layout() {

//   const location = useLocation();

//   const hideLayout =
//     location.pathname.includes("dashboard") ||   // ✅ BEST FIX
//     location.pathname.includes("/services/") ||
//     location.pathname === "/login" ||
//     location.pathname.includes("/rate-list/");

//   return (
//     <>
//       {!hideLayout && <Navbar />}

//       <Routes>

//         {/* ---------- PUBLIC WEBSITE ---------- */}
//         <Route path="/" element={<><Hero /><Home /><Newsletter /><WhyUs /></>} />
//         <Route path="/about" element={<><About /><WhyUs /><Newsletter /></>} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/services" element={<><Services /><Newsletter /></>} />
//         <Route path="/services/:serviceId/rates" element={<ServiceRates />} />
//         <Route path="/technology" element={<><Technology /><Newsletter /></>} />
//         <Route path="/vision" element={<><Vision /><Newsletter /></>} />
//         <Route path="/awards" element={<><Awards /><Newsletter /></>} />

//         {/* ---------- ONBOARDING ---------- */}
//         <Route path="/onboarding" element={<Onboarding />} />
//         <Route path="/onboarding/radiologist" element={<DoctorOnboardingForm />} />
//         <Route path="/onboarding/callback" element={<CallbackForm />} />
//         <Route path="/rate-list/:id" element={<RateList />} />

//         {/* ---------- AUTH ---------- */}
//         <Route path="/login" element={<Login />} />

//         {/* ---------- DASHBOARDS (MISSING BEFORE) ---------- */}
//         <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
//         <Route path="/super-coordinator-dashboard" element={<SuperCoordinatorDashboard />} />
//         <Route path="/service-dashboard" element={<ServiceDashboard />} />
//         <Route path="/callback-dashboard" element={<CallbackDashboard />} />
//         <Route path="/customer-dashboard" element={<CustomerDashboard />} />
//         <Route path="/doctor-dashboard" element={<RadiologistDashboard />} />


//       </Routes>

//       {!hideLayout && <Certificate />}
//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <FormProvider>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </FormProvider>
//   );
// }

// export default App;




import React from 'react';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Technology from './components/Technology';
import WhyUs from './components/WhyUs';
import Vision from './components/Vision';
import Awards from './components/Awards';
import Certificate from './components/Certificate';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { FormProvider } from "./components/context/FormContext";

import DoctorOnboardingForm from "./components/pages/doctoronboarding/form.jsx";
import CallbackForm from "./components/pages/doctoronboarding/callback.jsx";
import Onboarding from "./components/pages/doctoronboarding/Onboarding.jsx";
import CoordinatorDashboard from "./components/pages/doctoronboarding/CoordinatorDashboard.jsx";
import SuperCoordinatorDashboard from "./components/pages/doctoronboarding/SuperCoordinatorDashboard.jsx";
import ServiceDashboard from './components/pages/doctoronboarding/ServiceDashboard.jsx';
import ServiceRates from './components/pages/doctoronboarding/ServiceRates.jsx';
import CallbackDashboard from './components/pages/doctoronboarding/callbackdashboard.jsx';
import CustomerDashboard from './components/pages/doctoronboarding/customerdashboard.jsx';
import Login from "./components/pages/doctoronboarding/Login.jsx";
import RateList from './components/pages/doctoronboarding/RatelistRadiologist.jsx';
import RadiologistDashboard from './components/pages/doctoronboarding/RadiologistDashboard.jsx';

// ── Client Onboarding ──────────────────────────────────────────────────────
import ClientOnboardingPage from "./components/client/pages/ClientOnboardingPage.jsx";
// ──────────────────────────────────────────────────────────────────────────

import ClientDashboard from './components/pages/doctoronboarding/Clientdashboard.jsx';
import ContactDashboard from './components/pages/doctoronboarding/ContactDashboard.jsx';
import Career from './components/pages/doctoronboarding/career.jsx';

function Layout() {

  const location = useLocation();

  const hideLayout =
    location.pathname.includes("dashboard") ||
    location.pathname.includes("/services/") ||
    location.pathname === "/login" ||
    location.pathname.includes("/rate-list/") ||
    location.pathname === "/onboarding/client";   // ← hide navbar/footer on client onboarding page

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>

        {/* ---------- PUBLIC WEBSITE ---------- */}
        <Route path="/" element={<><Hero /><Home /><Newsletter /><WhyUs /></>} />
        <Route path="/about" element={<><About /><WhyUs /><Newsletter /></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<><Services /><Newsletter /></>} />
        <Route path="/services/:serviceId/rates" element={<ServiceRates />} />
        <Route path="/technology" element={<><Technology /><Newsletter /></>} />
        <Route path="/vision" element={<><Vision /><Newsletter /></>} />
        <Route path="/awards" element={<><Awards /><Newsletter /></>} />

        {/* ---------- ONBOARDING ---------- */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/career" element={<Career />} />
        <Route path="/onboarding/radiologist" element={<DoctorOnboardingForm />} />
        <Route path="/onboarding/client" element={<ClientOnboardingPage />} />  {/* ← NEW */}
        <Route path="/onboarding/callback" element={<CallbackForm />} />
        <Route path="/rate-list/:id" element={<RateList />} />

        {/* ---------- AUTH ---------- */}
        <Route path="/login" element={<Login />} />

        {/* ---------- DASHBOARDS ---------- */}
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/super-coordinator-dashboard" element={<SuperCoordinatorDashboard />} />
        <Route path="/service-dashboard" element={<ServiceDashboard />} />
        <Route path="/callback-dashboard" element={<CallbackDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/doctor-dashboard" element={<RadiologistDashboard />} />

        <Route path="/client-dashboard" element={<ClientDashboard />} />  {/* ← NEW */}
        <Route path="/contact-dashboard" element={<ContactDashboard />} />  {/* ← NEW */}


      </Routes>

      {!hideLayout && <Certificate />}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;