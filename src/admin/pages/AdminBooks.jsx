import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUsers } from "@fortawesome/free-solid-svg-icons";
import { getAllBooks, getAllUsers } from "../../services/AllApi";
import { BaseUrl } from "../../services/BaseUrl";

const AdminBooks = () => {
  const [isActive, setIsActive] = useState(true);
  const [showBooks, setShowBooks] = useState(true);
  const [SearchKey, setSearchKey] = useState("");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    loadBooks();
  }, [token]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadBooks = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllBooks(reqHeader, SearchKey);
    setBooks(apiResponse.data);
  };
  const loadUsers = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllUsers(reqHeader);
    setUsers(apiResponse.data);
  };

  return (
    <>
      <AdminHeader>
        <div className="px-4 sm:px-6 lg:px-10">
          <h1 className="text-center font-bold text-3xl sm:text-4xl mt-4 sm:mt-6 text-white">
            All Books <FontAwesomeIcon icon={faBook} />
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => setIsActive(true)}
              className={`text-lg sm:text-2xl px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                isActive ? "bg-gray-600" : "bg-[#173245]"
              } hover:bg-gray-500 active:bg-gray-400 text-white`}
            >
              <FontAwesomeIcon icon={faBook} />
              Book List
            </button>
            <button
              onClick={() => setIsActive(false)}
              className={`text-lg sm:text-2xl px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                isActive ? "bg-[#173245]" : "bg-gray-600"
              } hover:bg-gray-500 active:bg-gray-400 text-white`}
            >
              <FontAwesomeIcon icon={faUsers} />
              User List
            </button>
          </div>
          {/* Book-Tab/User-Tab */}

          {isActive ? (
            <div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex p-4">
                  <input
                    type="text"
                    placeholder="Search By Title"
                    className="flex-grow px-4 py-2 border border-white text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                  <button className="bg-green-500 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-r-lg transition duration-200">
                    Search
                  </button>
                </div>
                {/* Book Card */}
                <div className="mt-5">
                  {books?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
                      {books?.map((eachBooks) => (
                        <div className="card bg-gray-900 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 flex flex-col mx-5">
                          <figure className="px-6 pt-6">
                            <img
                              src={`${BaseUrl}/uploads/${eachBooks.uploadedImages[0]}`}
                              alt="Book"
                              className="rounded-xl shadow-lg w-full h-64 lg:h-100 object-cover"
                            />
                          </figure>
                          <div className="card-body items-center text-center p-4">
                            <h2 className="card-title text-lg font-bold">
                              {eachBooks.title}
                            </h2>
                            <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                              {eachBooks.abstract}
                            </p>
                            <div className="card-actions">
                              <button className="bg-blue-800 hover:bg-blue-700 rounded-md px-4 py-2 mt-3 mb-4 cursor-pointer transition-all">
                                View Book
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h1>No Books Found</h1>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {
                users.length>0?
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                users?.map((eachBooks)=>(
                  <div className="bg-gray-600 rounded-2xl w-full h-40">
                <h1 className="p-2 font-bold text-[15px]">
                  Id : {eachBooks._id}
                </h1>
                <div className="flex items-center">
                  {
                    users.profile?<img src={eachBooks.profile} alt="user profile"/>:<img
                    src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                    alt="User"
                    className="rounded-full w-20 mx-2 border-4 border-gray-600 shadow-lg"
                  />
                  }
                  <h1 className="text-center text-orange-500 truncate mx-auto w-48">
                    <span className="text-blue-600 block">{eachBooks.username}</span>
                    <br />
                    {eachBooks.email}
                  </h1>
                </div>
              </div>
                ))
              }
              
            </div>:""
              }
            </div>

          )}
        </div>
      </AdminHeader>
    </>
  );
};

export default AdminBooks;
