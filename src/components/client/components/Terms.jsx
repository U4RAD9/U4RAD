import React from "react";

const Terms = ({ onClose }) => {
  return (
    <div className="co-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="co-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '700px', maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="co-header">
          <h2 className="co-title">TELEREPORTING SERVICES – TERMS & CONDITIONS</h2>
          <button className="co-close" onClick={onClose} aria-label="Close">
            Close ❌
          </button>
        </div>
        
        <div className="co-body" style={{ padding: '20px', lineHeight: '1.6', fontSize: '14px', color: '#333' }}>
          
          <p>
            By availing telereporting services from <strong>U4RAD Technologies Private Limited ("U4RAD")</strong>, the Client agrees to the following terms and conditions:
          </p>

          <br />
          <h3>1. Services</h3>
          <p>
            U4RAD shall provide remote interpretation and reporting of radiology and/or ECG investigations submitted by the Client through mutually agreed platforms and channels.
          </p>

          <br />
          <h3>2. Client Responsibilities</h3>
          <p>The Client shall:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
            <li><strong>a.</strong> Provide complete, accurate, and relevant patient information, clinical history, prescriptions, doctor's notes, and diagnostic images required for reporting.</li>
            <li><strong>b.</strong> Ensure that all images submitted are of diagnostic quality.</li>
            <li><strong>c.</strong> Share reports with patients/customers only in the original form provided by U4RAD and shall not alter, amend, or modify the reports.</li>
            <li><strong>d.</strong> Obtain all necessary patient consents, permissions, and approvals required under applicable laws.</li>
            <li><strong>e.</strong> Maintain all valid licenses, registrations, and statutory approvals necessary for operating its healthcare services.</li>
          </ul>

          <br />
          <h3>3. Reporting Services</h3>
          <p>
            U4RAD shall make reasonable efforts to provide reports within the agreed turnaround time, subject to receipt of complete and diagnostic-quality information and images.
          </p>
          <p style={{ marginTop: '10px' }}>
            Reports shall be prepared by qualified and licensed radiologists/cardiologists and may be subject to internal quality assurance processes.
          </p>

          <br />
          <h3>4. Payment Terms</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
            <li><strong>a.</strong> Reporting charges shall be as mutually agreed between the parties.</li>
            <li><strong>b.</strong> Invoices raised by U4RAD shall be paid within the agreed credit period.</li>
            <li><strong>c.</strong> Any invoice dispute must be raised within three (3) business days of receipt of the invoice.</li>
            <li><strong>d.</strong> Delayed payments may attract interest at the rate of 1% per month on the outstanding amount.</li>
          </ul>

          <br />
          <h3>5. Confidentiality</h3>
          <p>
            Both parties shall maintain strict confidentiality of all patient information, reports, business information, and any other confidential information exchanged during the course of service.
          </p>

          <br />
          <h3>6. Limitation of Liability</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
            <li><strong>a.</strong> U4RAD's liability, if any, shall be limited to the fees paid for the specific reporting service giving rise to the claim.</li>
            <li><strong>b.</strong> U4RAD shall not be liable for any indirect, consequential, incidental, or special damages including loss of profits, business interruption, or reputational loss.</li>
            <li><strong>c.</strong> U4RAD shall not be responsible for errors arising from incomplete, inaccurate, misleading, or poor-quality information or images provided by the Client.</li>
          </ul>

          <br />
          <h3>7. Indemnity</h3>
          <p>The Client agrees to indemnify and hold harmless U4RAD, its directors, employees, consultants, and reporting doctors from any claims, losses, liabilities, penalties, damages, or expenses arising from:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
            <li><strong>a.</strong> Incorrect or incomplete information/images provided by the Client;</li>
            <li><strong>b.</strong> Failure to obtain patient consent or regulatory approvals;</li>
            <li><strong>c.</strong> Breach of confidentiality or data privacy obligations by the Client; or</li>
            <li><strong>d.</strong> Any claim, litigation, or complaint arising from the Client's services, operations, or actions.</li>
          </ul>

          <br />
          <h3>8. Termination</h3>
          <p>
            Either party may discontinue the service arrangement by providing thirty (30) days' written notice. All outstanding dues payable to U4RAD shall remain payable and become immediately due upon termination.
          </p>

          <br />
          <h3>9. Governing Law</h3>
          <p>
            These Terms & Conditions shall be governed by the laws of India and any disputes shall be subject to the exclusive jurisdiction of the courts at New Delhi.
          </p>

          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#212121', color: '#e0e0e0', borderRadius: '4px' }}>
            <strong>Consent & Acceptance:</strong>
            <p style={{ marginTop: '10px', fontSize: '13px' }}>
              I/We have read, understood, and agree to the above Terms & Conditions governing telereporting services provided by U4RAD Technologies Private Limited. By selecting "I Understand and Accept" and/or using the services, I/We acknowledge that these Terms & Conditions are legally binding upon us.
            </p>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button type="button" className="co-btn co-btn--primary" onClick={onClose}>
              I Understand and Accept
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Terms;