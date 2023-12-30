import React from "react";
import missionPic from "../assets/missionPic.jpg";
import missionPic2 from "../assets/missionPic2.jpg";

const Vision = () => {
  return (
    <>
      <div className="w-full py-[6rem]  bg-white  mx-auto">
        <div className="w-full py-20  bg-black text-white px-6 mb-20">
          <div className="lg:col-span-2 my-4 ">
            <h1 className=" md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
              {" "}
              <span className="text-[hsl(357,100%,59%)]">VISION</span>
              <span>,</span>
              <span className="text-[hsl(357,100%,59%)]">
                &nbsp; MISSION &nbsp;
              </span>
              &<span className="text-white">&nbsp; QUALITY &nbsp;</span>
              ASSURANCE
            </h1>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img className="w-[400px] mx-auto my-4" src={missionPic2} alt="/" />
          <div className="flex flex-col justify-center">
            <p className="text-[hsl(357,100%,59%)] font-bold "></p>
            <h1 className=" text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
              OUR VISION
            </h1>
            <p>
              To be admired as an innovative, ethical, and efficient health tech
              organization, which always puts technology and services first, and
              consistently creates value for our clients.
            </p>
            {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ">
          <img
            className="w-[400px] mx-auto my-20 block"
            src={missionPic}
            alt="/"
          />
          <div className="flex flex-col justify-center">
            <p className="text-[hsl(357,100%,59%)] font-bold"></p>
            <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
              OUR MISSION
            </h1>
            <p>
              U4RAD's mission is to provide a collaborative technology platform,
              interacting seamlessly with all radiology diagnostic stakeholders,
              to provide the highest quality service to our clients,
              irrespective of their physical location, through understanding,
              teamwork, & innovative technology where every stakeholder is
              treated with dignity & respect. <p></p>
              <br></br> Our key values:
              <br></br>
              <br></br>
              <ul className="flex flex-wrap">
                <li
                  className="text-gray-500 mb-2 mr-4"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  INNOVATION
                </li>
                <li
                  className="text-gray-500 mb-2 mr-4 "
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  ETHICS
                </li>
                <li
                  className="text-gray-500 mb-2 mr-4"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  EFFICIENCY
                </li>
                <li
                  className="text-gray-500 mb-2 mr-4"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  TECHNOLOGY
                </li>
                <li
                  className="text-gray-500 mb-2 mr-4"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  COLLABORATION
                </li>
                <li
                  className="text-gray-500 mb-2 mr-4"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  QUALITY
                </li>
                <li
                  className="text-gray-500 mb-2"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#ffe6e6", // Set your desired highlight color here
                    padding: "0.5rem", // Adjust padding for better appearance
                    borderRadius: "0.25rem", // Optional: add rounded corners
                  }}
                >
                  INCLUSIVITY
                </li>
              </ul>
            </p>
            {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
          </div>
        </div>

        <div className="text-black bg-white ">
          <div className="max-w-[800px] mt-[120px] w-full h-screen mx-auto text-center flex flex-col justify-center">
            <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
              <span className="text-[hsl(357,100%,59%)]">Quality</span>{" "}
              Standards
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                title="In-House Radiology Quality Monitoring System"
                color="rgba(247,68,77,0.69)"
              />
              <Card
                title="Credentialing & Partner Radiologist Appointments"
                color="gray-500"
              />
              <Card
                title="Comprehensive Quality Management System"
                color="rgba(247,68,77,0.69)"
              />
              <Card
                title="Clinical and Non-Clinical Quality Monitoring"
                color="gray-500"
              />
              <Card
                title="Dashboards for Measuring Parameters"
                color="rgba(247,68,77,0.69)"
              />
              <Card
                title="Non-reporting or Missed Reporting of Images"
                color="gray-500"
              />
              <Card
                title="Client/Physician Feedback System"
                color="rgba(247,68,77,0.69)"
              />
              <Card title="Senior Radiology Advisory Team" color="gray-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Card = ({ title, color }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border border-${color} my-4 mb-2`}
    >
      <p className={`text-${color} font-bold`}>{title}</p>
    </div>
  );
};

export default Vision;
