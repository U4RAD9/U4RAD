import React from 'react';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Services from './components/Services';
import Technology from './components/Technology';
import WhyUs from './components/WhyUs';
import Vision from './components/Vision';
import Awards from './components/Awards';
import Certificate from './components/Certificate';

function App() {
  return (
    <div>     
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={[<Hero />, <Home/>,<Newsletter />,<WhyUs />]} ></Route>
          <Route path="/About" element={[<About />, <WhyUs />,<Newsletter />]} ></Route>
          <Route path="/Contact" element={[<Contact />]} ></Route>
          <Route path="/Services" element={[<Services/>,<Newsletter />]}></Route>
          <Route path="/Technology" element={[<Technology/>,<Newsletter />]}></Route>
          <Route path="/Vision" element={[<Vision />,<Newsletter />]}></Route>
          <Route path="/Awards" element={[<Awards />,<Newsletter />]}></Route>
         
        </Routes>
        <Certificate />
        <Footer />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
