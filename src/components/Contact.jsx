import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-gradient-to-b text-blackds"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8 flex flex-col items-center justify-center h-full sm:text-4xl  md:text-5xl text-2xl font-bold py-2 text-center">  
          <p className="py-6 font-bold text-white "><span className="text-[hsl(357,100%,59%)]">Get in touch</span> with us</p>
        </div>
        <div className=" flex justify-center items-center">
          <form
            action="https://getform.io/f/2cb51059-819a-4776-ae96-bc02e6889688"
            method="POST"
            className=" flex flex-col w-full md:w-1/2 "
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 bg-white border-2 rounded-md text-black focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="my-4 p-2 bg-white border-2 rounded-md text-black focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              className="p-2 bg-white border-2 rounded-md text-black focus:outline-none h-20"
            ></textarea>

            <button className="text-black bg-gradient-to-b bg-[hsl(357,100%,59%)] px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300 mb-10">
              Let's talk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;