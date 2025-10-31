import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faDeleteLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  addNewJob,
  deleteAllJob,
  getAllJobs,
  viewApplicants,
} from "../../services/AllApi";
import { BaseUrl } from "../../services/BaseUrl";

const AdminCareers = () => {
  const [isActive, setIsActive] = useState(true);
  const [showJob, setShowJob] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    salary: 0,
    qualification: "",
    experience: 0,
    jobDescription: "",
  });

  useEffect(() => {
    loadJobs();
    loadApplicants();
  }, []);
  const loadJobs = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllJobs(reqHeader);
    setShowJob(apiResponse.data);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const addJob = async () => {
    if (
      jobDetails.jobTitle == "" ||
      jobDetails.jobLocation == "" ||
      jobDetails.jobType == "" ||
      jobDetails.salary == "" ||
      jobDetails.qualification == "" ||
      jobDetails.experience == "" ||
      jobDetails.jobDescription == ""
    ) {
      alert("Please Fill The Form");
    } else {
      let token = localStorage.getItem("token");

      let reqHeader = {
        authorization: `Bearer ${token}`,
      };
      let apiResponse = await addNewJob(jobDetails, reqHeader);
      if (apiResponse.status == 201) {
        alert("Successfully Created");
        loadJobs();
      } else {
        alert("Error Occurred");
      }
      setIsOpen(false);
    }
  };

  const loadApplicants = async () => {
    let token = localStorage.getItem("token");

    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await viewApplicants(reqHeader);
    setApplicants(apiResponse.data);
  };

  const deleteJobClick = async (id) => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await deleteAllJob(id, reqHeader);
    if (apiResponse.status == 200) {
      alert("Successfully Deleted ");
      loadJobs();
    } else {
      alert("Error Occurred");
    }
  };
  return (
    <div>
      <AdminHeader>
        <h1 className="text-center text-4xl font-bold">
          Careers <FontAwesomeIcon icon={faBriefcase} />
        </h1>
        <div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => setIsActive(true)}
              className={`text-lg sm:text-2xl px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                isActive ? "bg-gray-600" : "bg-[#173245]"
              } hover:bg-gray-500 active:bg-gray-400 text-white`}
            >
              <FontAwesomeIcon />
              Job Post
            </button>
            <button
              onClick={() => setIsActive(false)}
              className={`text-lg sm:text-2xl px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                isActive ? "bg-[#173245]" : "bg-gray-600"
              } hover:bg-gray-500 active:bg-gray-400 text-white`}
            >
              <FontAwesomeIcon />
              View Applicant
            </button>
          </div>
        </div>
        {isActive ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="w-80 flex justify-center items-center m-auto lg:ms-0 mt-5">
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
              {/* Add Job Section */}
              <div className="text-center mt-6 lg:ml-120 lg:mt-10">
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-green-600 hover:bg-green-800 cursor-pointer transform p-2 rounded-lg"
                >
                  Add Job +
                </button>
              </div>
            </div>
            {/* Job Card Section */}
            {showJob?.length > 0 ? (
              <div>
                {showJob?.map((job) => (
                  <div className=" rounded mt-2 ">
                    <div className=" mt-8 px-4 lg:w-full ">
                      <div className="max-w-4xl m-auto  p-5 border-2 border-white rounded-lg">
                        <div className="flex justify-between border-b-2 border-white pb-3">
                          <h1 className="text-white text-2xl font-bold ">
                            {job.jobTitle}
                          </h1>
                          <button
                            onClick={() => deleteJobClick(job._id)}
                            className="bg-red-600 hover:bg-red-800 p-2 cursor-pointer rounded-md  text-white"
                          >
                            Delete <FontAwesomeIcon icon={faDeleteLeft} />
                          </button>
                        </div>
                        <div className="mt-8 leading-7 text-white ">
                          <h1 className="text-blue-500 font-bold text-lg cursor-pointer">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {job.jobLocation}
                          </h1>
                          <h1>Job Type : {job.jobType}</h1>
                          <h1>Salary : {job.salary}</h1>
                          <h1>Qualification : {job.qualification}</h1>
                          <h1>Experience : {job.experience}yrs</h1>
                          <p className="text-center">{job.jobDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-gray-700 text-sm sm:text-base">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-2 text-left">Sl</th>
                  <th className="p-2 text-left">Job Title</th>
                  <th className="p-2 text-left">Qualification</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Cover Letter</th>
                  <th className="p-2 text-left">Resume</th>
                </tr>
              </thead>

              {applicants?.length > 0 ? (
                <tbody className="bg-gray-800 text-gray-100">
                  {applicants.map((eachApplicant, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-2 text-center">{index + 1}.</td>
                      <td className="p-2">{eachApplicant.jobTitle}</td>
                      <td className="p-2">{eachApplicant.qualification}</td>
                      <td className="p-2">{eachApplicant.email}</td>
                      <td className="p-2">{eachApplicant.phone}</td>
                      <td className="p-2 break-words max-w-[200px]">
                        {eachApplicant.coverLetter}
                      </td>
                      <td className="p-2 text-blue-600 break-all max-w-[200px]">
                        <a  href={`${BaseUrl}/uploads/${eachApplicant.resume}`}>Download</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-gray-400 py-6 bg-gray-800"
                    >
                      No Applicants
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        )}
        {/* Modal For Add Job */}
      </AdminHeader>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md mx-auto border border-gray-600 bg-gray-900 rounded-xl p-6 shadow-black shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 cursor-pointer right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-400 font-bold "
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
                      setJobDetails({ ...jobDetails, jobTitle: e.target.value })
                    }
                    value={jobDetails?.jobTitle}
                    type="text"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Job Title"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <input
                    onChange={(e) =>
                      setJobDetails({
                        ...jobDetails,
                        jobLocation: e.target.value,
                      })
                    }
                    value={jobDetails?.jobLocation}
                    type="text"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Job Location"
                  />
                </fieldset>
              </div>
              <div className="flex gap-4 justify-center p-2">
                <fieldset className="fieldset">
                  <input
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, jobType: e.target.value })
                    }
                    value={jobDetails?.jobType}
                    type="text"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Job Type"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <input
                    onChange={(e) =>
                      setJobDetails({ ...jobDetails, salary: e.target.value })
                    }
                    value={jobDetails?.salary}
                    type="number"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Salary"
                  />
                </fieldset>
              </div>
              <div className="flex gap-4 justify-center p-2">
                <fieldset className="fieldset">
                  <input
                    onChange={(e) =>
                      setJobDetails({
                        ...jobDetails,
                        qualification: e.target.value,
                      })
                    }
                    value={jobDetails?.qualification}
                    type="text"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Qualification"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <input
                    onChange={(e) =>
                      setJobDetails({
                        ...jobDetails,
                        experience: e.target.value,
                      })
                    }
                    value={jobDetails?.experience}
                    type="number"
                    className="input border border-gray-600 rounded-md p-1 text-center"
                    placeholder="Experience"
                  />
                </fieldset>
              </div>
              <div className="flex justify-center p-2">
                <textarea
                  onChange={(e) =>
                    setJobDetails({
                      ...jobDetails,
                      jobDescription: e.target.value,
                    })
                  }
                  value={jobDetails?.jobDescription}
                  placeholder="Job Description"
                  className="textarea border border-gray-500 rounded-2xl w-80 h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
                ></textarea>
              </div>

              <div className="flex items-center justify-center p-2 gap-2 pb-4">
                <button className="bg-red-700 hover:bg-red-800 text-lg p-2 w-20 rounded-lg cursor-pointer">
                  Reset
                </button>
                <button
                  onClick={addJob}
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
  );
};

export default AdminCareers;
