import React, { use, useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { addNewJob, applyJob, getAllJobs } from "../services/AllApi";
const Careers = () => {
  // for Modal
  const [isOpen, setIsOpen] = useState(false);
  const [showJobs, setShowJob] = useState([]);
  const [applicantData, setApplicantData] = useState({
    fullName: "",
    jobTitle: "",
    qualification: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
  });
  //   for modal unwanted interactions
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  useEffect(() => {
    loadJobs();
  }, []);
  const loadJobs = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllJobs(reqHeader);
    setShowJob(apiResponse.data);
    console.log(apiResponse.data);
  };

  const showModalTitle = (jobTitle) => {
    setApplicantData({ ...applicantData, jobTitle: jobTitle });
    setIsOpen(true);
  };
  const addOnApplyClick = async () => {
    if (
      applicantData.fullName == "" ||
      applicantData.jobTitle == "" ||
      applicantData.qualification == "" ||
      applicantData.email == "" ||
      applicantData.phone == "" ||
      applicantData.coverLetter == "" ||
      applicantData.resume == ""
    ) {
      alert("Please Fill the Form");
    } else {
      
      let reqHeader = {
        "Content-Type": "multipart/form-data",
      };
      let reqBody = new FormData()
      for(let key in applicantData){
        reqBody.append(key,applicantData[key])
      }
      
      let apiResponse = await applyJob(reqBody,reqHeader);
      if(apiResponse.status == 201){
        alert("Successfully Applied")
      }else{
        alert("Something Went Wrong")
      }
      setIsOpen(false)
    }
  };
  return (
    <>
      <div className="career-page-bg overflow-hidden">
        <Header />
        <div>
          <h1 className="text-center text-white font-bold text-4xl mt-16 ">
            Careers
          </h1>
          <p className="text-white text-center p-7 pl-12 pr-12 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut
            harum, fugiat at cum natus commodi necessitatibus? Praesentium ipsa
            alias a, aliquam odit sequi corporis suscipit voluptates animi quas
            neque? Asperiores harum, delectus magni distinctio voluptatem sint,
            maiores, dolorem laudantium praesentium reprehenderit similique
            vitae repellendus atque aspernatur. Consequatur delectus cumque,
            error suscipit doloribus tempore ex eius, quibusdam, ut reiciendis
            voluptatem. Minus ducimus nihil saepe, omnis porro alias eveniet
            nostrum perspiciatis temporibus unde qui neque. Rem iste nobis
            accusamus doloribus architecto autem facere ratione officiis at
            aliquam, mollitia labore dolorem dignissimos.
          </p>
          <h1 className="text-center text-white font-bold text-3xl underline mt-14">
            Current Opening
          </h1>
          <div className="w-80 flex justify-center items-center m-auto mt-5">
            <div className="flex items-center max-w-md mx-auto mt-6">
              <input
                type="text"
                placeholder="Search By Title"
                className="flex-grow px-4 py-2 border border-white text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <button className="bg-green-500 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-r-lg transition duration-200">
                Search
              </button>
            </div>
          </div>
          {/* Job Card */}
          {showJobs?.length > 0 ? (
            <div className="mt-10 pb-10 mx-2">
              {showJobs?.map((eachJob) => (
                <div className="max-w-4xl m-auto mt-10  p-5 border-2 border-white rounded-lg">
                  <div className="flex justify-between border-b-2 border-white pb-3">
                    <h1 className="text-white text-2xl font-bold ">
                      {eachJob.jobTitle}
                    </h1>
                    <button
                      onClick={() => showModalTitle(eachJob.jobTitle)}
                      className="bg-blue-700 hover:bg-blue-800 p-2 rounded-md  text-white"
                    >
                      Apply <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </button>
                  </div>
                  <div className="mt-8 leading-7  text-white ">
                    <h1 className="text-blue-500 font-bold text-lg cursor-pointer">
                      <FontAwesomeIcon icon={faLocationDot} />
                      {eachJob.jobLocation}
                    </h1>
                    <h1>Job Type : {eachJob.jobType}</h1>
                    <h1>Salary : {eachJob.salary}</h1>
                    <h1>Qualification : {eachJob.qualification}</h1>
                    <h1>Experience : {eachJob.experience}yrs</h1>
                    <p className="text-center">{eachJob.jobDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-white text-center text-2xl font-extrabold my-5">
              Currently No Jobs Available at the Moment !
            </h1>
          )}
        </div>
      </div>
      <div>
        {/* Button to open modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md mx-auto border border-gray-600 bg-gray-900 rounded-xl p-6 shadow-black shadow-lg">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-400 font-bold "
                aria-label="Close"
              >
                ✕
              </button>

              <h3 className="text-3xl font-bold text-white text-center mb-6">
                Application Form
              </h3>
              <div className="bg-gray-800 rounded-md text-white">
                <div className="flex gap-4 justify-center p-2">
                  <fieldset className="fieldset">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          fullName: e.target.value,
                        })
                      }
                      value={applicantData?.fullName}
                      type="text"
                      className="input border border-gray-600 rounded-md p-1 text-center"
                      placeholder="Full Name"
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          qualification: e.target.value,
                        })
                      }
                      value={applicantData?.qualification}
                      type="text"
                      className="input border border-gray-600 rounded-md p-1 text-center"
                      placeholder="Qualification"
                    />
                  </fieldset>
                </div>
                <div className="flex gap-4 justify-center p-2">
                  <fieldset className="fieldset">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          email: e.target.value,
                        })
                      }
                      value={applicantData?.email}
                      type="text"
                      className="input border border-gray-600 rounded-md p-1 text-center"
                      placeholder="Email Id"
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          phone: e.target.value,
                        })
                      }
                      value={applicantData?.phone}
                      type="text"
                      className="input border border-gray-600 rounded-md p-1 text-center"
                      placeholder="Phone"
                    />
                  </fieldset>
                </div>
                <div className="flex justify-center p-2">
                  <textarea
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        coverLetter: e.target.value,
                      })
                    }
                    value={applicantData?.coverLetter}
                    placeholder="Cover Letter"
                    className="textarea border border-gray-500 rounded-2xl w-80 h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
                  ></textarea>
                </div>
                <div className="flex items-center justify-center pl-4 pr-4 pb-3">
                  <div class=" border border-gray-400 rounded-md overflow-hidden w-full max-w-sm">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          resume: e.target.files[0],
                        })
                      }
                      type="file"
                      id="file"
                      class=" block w-full text-sm text-gray-700 border-0 file:mr-4 file:py-2 file:cursor-pointer file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-300"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 gap-2 pb-4">
                  <button className="bg-red-700 hover:bg-red-800 text-lg p-2 w-20 rounded-lg cursor-pointer">
                    Reset
                  </button>
                  <button
                    onClick={addOnApplyClick}
                    className="bg-green-700 hover:bg-green-800 text-lg p-2 w-20 rounded-lg cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Careers;
