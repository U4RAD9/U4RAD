const Contact = () => {
  return (
    <div name="contact" className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white px-4 py-10">
      <div className="flex flex-col justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8 text-center">
          <p className="text-4xl sm:text-5xl font-bold">
            <span className="text-[hsl(357,100%,59%)]">Get in touch</span> with us
          </p>
        </div>

        <div className="flex justify-center items-center">
          <form
            action="https://getform.io/f/2cb51059-819a-4776-ae96-bc02e6889688"
            method="POST"
            className="flex flex-col w-full md:w-1/2"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="p-2 bg-white border-2 rounded-md text-black focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="my-4 p-2 bg-white border-2 rounded-md text-black focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="5"
              required
              className="p-2 bg-white border-2 rounded-md text-black focus:outline-none"
            ></textarea>

            <button className="text-black bg-[hsl(357,100%,59%)] px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;