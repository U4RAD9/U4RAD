import React from "react";

const Terms = ({ onClose }) => {
  return (
    <div className="co-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="co-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="co-header">
          <h2 className="co-title">Terms and Conditions</h2>
          <button className="co-close" onClick={onClose} aria-label="Close">
            Close ❌
          </button>
        </div>
        
        <div className="co-body" style={{ padding: '20px', lineHeight: '1.6', fontSize: '14px', color: '#333' }}>
          
          <h3>1. Introduction</h3>
          <p>
            Welcome to our platform. By registering your diagnostic center or hospital, 
            you agree to abide by the following terms and conditions.
          </p>

          <br />
          <h3>2. Data Privacy & Compliance</h3>
          <p>
            You agree to handle all patient and diagnostic data in accordance with 
            applicable national and local healthcare regulations.
          </p>

          <br />
          <h3>3. Accuracy of Information</h3>
          <p>
            You certify that all KYC documents, PAN details, and facility information 
            provided during this onboarding process are accurate and current.
          </p>

          <br />
          {/* Add more legal sections here as needed */}
          <p style={{ fontStyle: 'italic', color: '#777', marginTop: '20px' }}>
            (Full legal terms to be provided by the legal team.)
          </p>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button type="button" className="co-btn co-btn--primary" onClick={onClose}>
              I Understand and accept, Close
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Terms;