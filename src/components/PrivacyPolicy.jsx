import React, { useEffect, useState } from "react";

const PrivacyPolicy = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`pointer-events-auto bg-white/95 backdrop-blur-xl 
        w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl p-6 relative
        overflow-y-auto transition-all duration-300 text-sm leading-relaxed
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >

        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

        <h2 className="font-semibold mt-4">Purpose and Scope</h2>
        <p className="mt-2">
          We, U4RAD Technologies Pvt Ltd (“Company” or “we” or “our” or “us”), are committed to protecting the privacy of the information provider ("you" / "your" / "yourself"). We consider privacy and protection of your data / information to be of the highest importance. Our practices and procedures in relation to the collection and use of your data/ information has been set-out below in this privacy policy (“Privacy Policy”). This Privacy Policy will familiarize you with the manner in which the Company may collect, use, share, transfer and disclose your data / information. This Privacy Policy forms an integral part of our terms of use [insert hyperlink] to use our Website and /or Application (“Terms of Use”). The Company reserves the right, at its discretion, to change, modify, amend, add or remove portions of this Privacy Policy at any time without notice. We recommend that you review this Privacy Policy periodically to ensure that you are aware of the current privacy practices of the Company. By visiting our website (www.U4RAD.com) (“Website”) and/or using our mobile applications available on Google Play and Apple App Store (“Application”), you agree to be bound by the terms and conditions of this Privacy Policy (which includes the Terms of Use). This Privacy Policy shall be construed to be provided in compliance with the Information Technology Act 2000 (“IT Act”), as amended from time to time, and shall be read with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 (“SPDI Rules”), as applicable.        </p>

        <h2 className="font-semibold mt-4">Definitions</h2>
        <p className="mt-2">
          In this Privacy Policy, unless the context otherwise requires:
        </p>
        <p className="mt-2">
          i. ‘Personal Information’ means any information that relates to a natural person which, either directly or indirectly, in combination with other information available or likely to be available with the Company, is capable of identifying such person.
        </p>
        <p className="mt-2">
          ii. ‘Sensitive Personal Data or Information’ of a person means such Personal Information which consists of information relating to: • password; • financial information such as bank account or credit card or debit card or other payment instrument details; • physical, physiological and mental health condition; • sexual orientation; • medical records and history; • biometric information; • any detail relating to the above Clauses as provided to the Company for providing service; and • any of the information received under any of the above Clauses by the Company for processing, stored or processed under lawful contract or otherwise: Provided that any information that is freely available or accessible in public domain or furnished under the Right to Information Act 2005 or any other law for the time being in force will not be regarded as Sensitive Personal Data or Information.
        </p>
        <p className="mt-2">
          iii. The words and expressions used in this Privacy Policy but not defined herein but defined in the IT Act or SPDI Rules will have the meanings assigned to them thereunder.
        </p>

        <h2 className="font-semibold mt-4">Collection of Information</h2>
        <p className="mt-2">
          i. We collect the following Personal Information and Sensitive Personal Data or Information: a. [Name, Age, Gender, address, diagnostic tests etc]
        </p>
        <p className="mt-2">
          ii. You represent that the information or data you provide from time to time is and shall be correct, current and updated and you have all the rights, permissions and consents to provide such information or data. Your providing the data / information and the Company’s consequent storage, collection, usage, transfer, access or processing of the same shall not be in violation of any third-party agreement, laws, judgments, orders or decrees.
        </p>
        <p className="mt-2">
          iii. In general, the visitors to the Website and/or Application can access the Website’s home page / Application and browse some areas of the Website / Application, without disclosing any Personal Information or Sensitive Personal Data or Information. iv. However, the Company tracks information provided by visitor’s browser / Application, including the website the visitor came from (known as the referring URL) / application, the type of browser / device used to access the Website / Application and other information that does not personally identify any visitor of the Website. This may include installation of cookies and collection of other session data.
        </p>

        <h2 className="font-semibold mt-4">Use and Processing</h2>
        <p className="mt-2">
          a. The information collected by the Company may be used for a number of purposes connected with our business operations which may include the following:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Dealing with requests, enquiries and complaints, customer services and related activities</li>
          <li>Responding to your queries and fulfilling your requests for information regarding our products and services</li>
          <li>Notifying you about our new products or services and sending you important information regarding our products or services</li>
          <li>Legitimate business purposes</li>
          <li>Responding to judicial process and provide information to law enforcement agencies or in connection with an investigation on matters related to public safety, as permitted by law</li>
        </ul>
        <p className="mt-2">
          b. Your data/ information will be kept confidential to the maximum possible extent and in accordance with the provisions set out herein.
        </p>

        <h2 className="font-semibold mt-4">
          DISCLOSURE AND TRANSFER OF YOUR PERSONAL INFORMATION (INCLUDING SENSITIVE PERSONAL DATA OR INFORMATION)
        </h2>
        <p className="mt-2">
          a. We do not sell or rent any Personal Information (including Sensitive Personal Data or Information).
        </p>
        <p className="mt-2">
          b. We may disclose / transfer your Personal Information (including Sensitive Personal Data or Information) to our partners, associates, service providers and third parties as necessary or appropriate:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>To carry out services on the Company’s behalf under contract.</li>
          <li>In any manner permitted under applicable law, including laws outside your country of residence.</li>
          <li>To comply with any legal process whether local or foreign.</li>
          <li>To respond to requests from public and government authorities, including public and government authorities outside your country of residence.</li>
          <li>To enforce our Terms of Use and policies.</li>
          <li>When the Company, in its sole discretion, deems it necessary in order to protect its rights or the rights of others.</li>
          <li>To protect our rights or property, privacy, safety or property, and/or that of our affiliates, you or others.</li>
          <li>To allow us to pursue available remedies or limit the damages that we may sustain.</li>
        </ul>
          <p className="mt-2">
          c. The Company may also disclose or transfer the Sensitive Personal Data or Information, to another third party as a part of reorganization or a sale of the assets or business of the Company. Any third party to which the Company transfers or sells its assets will have the right to continue to use such Sensitive Personal Data or Information.
        </p>
        <h2 className="font-semibold mt-4">
          INFORMATION PROVIDER’S RIGHTS IN RELATION TO THEIR SENSITIVE PERSONAL DATA OR INFORMATION COLLECTED BY THE COMPANY
        </h2>
        <p className="mt-2">
        a. All Sensitive Personal Data or Information provided to the Company by you have been voluntarily provided to us. You have the right to withdraw your consent at any time in writing by sending an e-mail to us at contact@u4rad.com, in accordance with the terms of this Privacy Policy. However, please note that withdrawal of consent will not be retrospective in nature and shall be applicable prospectively. In case the you do not provide your information or consent for usage of Sensitive Personal Data or Information or subsequently withdraw your consent for usage of the Sensitive Personal Data or Information so collected, the Company reserves the right to discontinue the services for which the said information was sought.
        </p>
        <p className="mt-2">
        b. You may write to us at contact@u4rad.com to access, review, modify or correct your Sensitive Personal Data or Information or withdraw your consent to provide Sensitive Personal Data or Information. However, we are not responsible for the authenticity of the Sensitive Personal Data or Information provided by you.
          </p>
          <p className="mt-2">
        c. You agree and acknowledge that certain data or information cannot be corrected or deleted or is prohibited to be deleted as required under any applicable law, law enforcement requests or under any judicial proceedings. In respect to such data or information, the aforementioned rights will not be available.
          </p>
        <h2 className="font-semibold mt-4">
          SECURITY PRACTICES AND PROCEDURES
        </h2>
        <p className="mt-2">
        a. We use reasonable security measures, at the minimum those mandated under the IT Act, as amended from time to time, and read with SPDI Rules, to safeguard and protect your Sensitive Personal Data or Information. You accept the inherent security implications of providing privacy to your information shared with us and you will not hold us responsible for any breach of security or the disclosure of Personal Information unless we have been grossly and willfully negligent.
        </p>
        <p className="mt-2">
        b. We may enter into agreement with third parties (in or outside of India) to store your information or data. These third parties may have their own security standards to safeguard your information or data and we will on commercial reasonable basis require such third parties to adopt reasonable security standards to safeguard your information / data.
        </p>
        <p className="mt-2">
        c. Not with standing anything contained in this Privacy Policy or elsewhere, we shall not be held responsible for any loss, damage or misuse of your data / information, if such loss, damage or misuse is attributable to a Force Majeure Event. A “Force Majeure Event” shall mean any event that is beyond our reasonable control and shall include, without limitation, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking, unauthorized access to computer data and storage device, computer crashes, breach of security and encryption, etc.
        </p>

        <h2 className="font-semibold mt-4">GRIEVANCE REDRESSAL</h2>
        <p className="mt-2">
        Any discrepancies and grievances with respect to processing of Sensitive Personal Data or Information shall be informed to the designated Grievance Officer as mentioned below:
        </p>
        <p className="mt-2">
          Officer: Dr. Ruchi Jangra <br />
          Email: contact@u4rad.com
        </p>

        <h2 className="font-semibold mt-4">
          CHANGES TO THIS PRIVACY POLICY
        </h2>
        <p className="mt-2">
        The Company reserves the right to revise and update this Privacy Policy at its sole discretion. Any such revisions will be effective on and from the date of posting the same on the Website and/or Application and will apply to all information collected both prior to and following the effective date. By entering this website or using this Application, the visitor consents to the terms of this Privacy Policy. By submitting his/her data/information to the Company, the visitor will be treated as having given his/her permission for processing the same in a manner provided in this Privacy Policy.
        </p>

        <div className="h-10"></div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;