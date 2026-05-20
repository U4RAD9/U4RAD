// // // const Contact = () => {
// // //   return (
// // //     <div name="contact" className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white px-4 py-10">
// // //       <div className="flex flex-col justify-center max-w-screen-lg mx-auto h-full">
// // //         <div className="pb-8 text-center">
// // //           <p className="text-4xl sm:text-5xl font-bold">
// // //             <span className="text-[hsl(357,100%,59%)]">Get in touch</span> with us
// // //           </p>
// // //         </div>

// // //         <div className="flex justify-center items-center">
// // //           <form
// // //             action="https://getform.io/f/2cb51059-819a-4776-ae96-bc02e6889688"
// // //             method="POST"
// // //             className="flex flex-col w-full md:w-1/2"
// // //           >
// // //             <input
// // //               type="text"
// // //               name="name"
// // //               placeholder="Enter your name"
// // //               required
// // //               className="p-2 bg-white border-2 rounded-md text-black focus:outline-none"
// // //             />
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               placeholder="Enter your email"
// // //               required
// // //               className="my-4 p-2 bg-white border-2 rounded-md text-black focus:outline-none"
// // //             />
// // //             <textarea
// // //               name="message"
// // //               placeholder="Enter your message"
// // //               rows="5"
// // //               required
// // //               className="p-2 bg-white border-2 rounded-md text-black focus:outline-none"
// // //             ></textarea>

// // //             <button className="text-black bg-[hsl(357,100%,59%)] px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
// // //               Submit
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Contact;




import { useState } from "react";
import { BASE_URL } from "./apiconnector";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState([]);

  const handleRoleChange = (value) => {
    setRole((prev) =>
      prev.includes(value)
        ? prev.filter((r) => r !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Role validation
    if (role.length === 0) {
      alert("Please select your role");
      return;
    }

    setLoading(true);

    const formData = {
      name: e.target.name.value,
      street_address: e.target.street_address.value,
      address: e.target.address.value,
      pincode: e.target.pincode.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
      role: role,
    };

    try {
      const res = await fetch(`${BASE_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        setShowSuccess(true);
        e.target.reset();
        setRole([]);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* 🔴 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600 opacity-20 blur-[120px] top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-red-500 opacity-20 blur-[120px] bottom-10 right-10"></div>

      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center z-10">

        {/* Left Text */}
        <div className="hidden md:block">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-red-500">Let’s Talk</span><br />
            We’re here to help
          </h1>
          <p className="text-gray-400 mt-4">
            Fill out the form and our team will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-red-500">
            Contact Us
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          {/* Street Address */}
          <input
            type="text"
            name="street_address"
            placeholder="Street Address"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          {/* Full Address */}
          <input
            type="text"
            name="address"
            placeholder="Full Address (City, Area, State)"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          {/* PIN Code */}
          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full p-3 mb-4 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />

          {/* Role */}
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Your Role</p>
            <div className="flex gap-4 flex-wrap">
              {["Radiologist", "Customer", "Others"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={role.includes(item)}
                    onChange={() => handleRoleChange(item)}
                    className="accent-red-600"
                  />
                  <span className="text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            required
            className="w-full p-3 mb-6 rounded-md bg-black/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-md font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* ✅ Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white text-black p-8 rounded-xl text-center w-[90%] md:w-[400px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              🎉 Thank You!
            </h2>
            <p className="mb-6">
              Your message has been submitted successfully. We'll contact you soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;