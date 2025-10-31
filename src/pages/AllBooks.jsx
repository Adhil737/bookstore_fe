import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getAllBooks } from "../services/AllApi";
import { BaseUrl } from "../services/BaseUrl";
import { AuthContext } from "../../context/authContext";

const AllBooks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [duplicateBooks, setDuplicateBooks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const { token } = useContext(AuthContext);
  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const uniqueColors = [
    "peer-checked:bg-red-500",
    "peer-checked:bg-blue-500",
    "peer-checked:bg-green-500",
    "peer-checked:bg-yellow-500",
    "peer-checked:bg-purple-500",
    "peer-checked:bg-pink-500",
  ];

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getBooks();
    }
  }, []);
  const getBooks = async (search) => {
    try {
      let header = {
        authorization: `Bearer ${token}`,
      };
      let apiResponse;
      if (search) {
        apiResponse = await getAllBooks(header, search);
      } else {
        apiResponse = await getAllBooks(header, " ");
      }

      let data = apiResponse.data;
      setBooks(data);
      setDuplicateBooks(data);
      // let categories = data.map((eachBook) => eachBook.category);
      let categories = [];

      data.forEach((eachBook) => {
        if (!categories.includes(eachBook.category)) {
          categories.push(eachBook.category);
        }
      });

      setCategory(categories);
    } catch (error) {
      console.log(error);
    }
  };
  const filterBooks = (cat) => {
    let filteredBooks = duplicateBooks.filter(
      (eachBook) => eachBook.category == cat
    );
    setBooks(filteredBooks);
  };

  return (
    <>
      {/* Give the condition for login here */}
      <div className="books-page-bg">
        <Header />
        {isLoggedIn ? (
          <div>
            <div>
              <h1 className="text-center text-white font-bold text-4xl mt-10">
                Collections
              </h1>
              <div className="flex items-center max-w-md  mx-auto px-5 mt-6">
                <input
                  onChange={(e) => {
                    getBooks(e.target.value);
                  }}
                  type="text"
                  placeholder="Search By Book Name"
                  className="flex-grow px-4 py-2 border border-white text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
                <button className="bg-green-500 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-r-lg transition duration-200">
                  Search
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr]  gap-6 p-4 md:p-10  text-white">
              {/* === FILTER SECTION === */}
              <div className="filter-section-bg bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="flex justify-between border-b border-gray-700 items-center pb-2">
                  <h1 className="text-center font-bold text-2xl">Filters</h1>
                  <button
                    onClick={() => setOpen(!open)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors duration-300 lg:hidden"
                  >
                    {open ? "Hide Filters" : "Show Filters"}
                  </button>
                </div>

                {/* Filters */}
                <form
                  onReset={() => {
                    const radios = document.querySelectorAll(".peer");
                    radios.forEach((r) => (r.checked = false));
                  }}
                  className={`
                  flex-1 flex flex-col gap-4 mt-4 overflow-y-auto transition-all duration-500 ease-in-out
                  ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
                  md:overflow-y-auto md:max-h-[1000px] md:opacity-100
                  lg:max-h-none lg:opacity-100
                  `}
                >
                  <div className="flex flex-wrap justify-center gap-3">
                    {category?.map((eachCategory, index) => (
                      <label key={index} className="relative">
                        <input
                          onChange={() => filterBooks(eachCategory)}
                          type="radio"
                          name="filter"
                          className="peer hidden"
                          id={index}
                        />
                        <div
                          className={`
                          px-4 py-2 rounded-lg cursor-pointer font-medium select-none shadow transition-all duration-300 bg-white text-gray-700
                          ${uniqueColors[index % uniqueColors.length]}
                        peer-checked:text-white
                          `}
                        >
                          {eachCategory}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Reset Button for small screens */}
                  <div
                    className={`flex justify-center pt-4  ${
                      open ? "block" : "hidden"
                    }`}
                  >
                    <input
                      type="reset"
                      value="Reset Filters"
                      className="px-5 py-2 bg-red-500 rounded-md cursor-pointer font-semibold hover:bg-red-600"
                    />
                  </div>
                </form>
              </div>

              {/* === BOOK DISPLAY SECTION === */}
              <div>
                {books.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {books?.map((eachBooks, index) => {
                      const isExpanded = expanded[index];
                      const abstract = eachBooks.abstract || "";
                      const shortText =
                        abstract.length > 100
                          ? abstract.slice(0, 100) + "..."
                          : abstract;

                      return (
                        <div
                          key={index}
                          className="card bg-gray-900 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 flex flex-col mx-5"
                        >
                          {/* Image */}
                          <figure className="px-6 pt-6">
                            <img
                              src={`${BaseUrl}/uploads/${eachBooks.uploadedImages[0]}`}
                              alt="Book"
                              className="rounded-xl shadow-lg w-full h-64 lg:h-100 object-cover"
                            />
                          </figure>

                          {/* Content */}
                          <div className="flex flex-col justify-between flex-1 px-4 text-center pb-4">
                            {/* Title + Text */}
                            <div className="flex flex-col flex-1">
                              <h2 className="text-lg font-bold mt-2 line-clamp-2 min-h-[48px]">
                                {eachBooks.title}
                              </h2>

                              <p
                                className={`text-sm text-gray-300 mt-2 transition-all duration-300 ${
                                  isExpanded
                                    ? "line-clamp-none"
                                    : "line-clamp-3"
                                }`}
                              >
                                {abstract}
                              </p>

                              {abstract.length > 100 && (
                                <button
                                  onClick={() => toggleReadMore(index)}
                                  className="text-blue-400 text-sm hover:underline mt-1 self-center"
                                >
                                  {isExpanded ? "Read Less" : "Read More"}
                                </button>
                              )}
                            </div>

                            {/* View Button */}
                            <div className="mt-4">
                              <Link
                                to={`/view-book/${eachBooks._id}`}
                                className="bg-blue-800 hover:bg-blue-700 cursor-pointer rounded-md px-4 py-2 transition-all"
                              >
                                View Book
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center mt-5">
                    <h1 className="text-center text-4xl font-extrabold">
                      No Books Found!
                    </h1>
                    <img
                      className="w-100 h-100"
                      src="https://i.pinimg.com/originals/ec/c0/15/ecc015d4e89f77b435df3cd81928ad48.gif"
                      alt="No books"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // If User Not Logged in
          <div className="">
            <div className="flex justify-center">
              <img
                className="mt-10 rounded-full p-4 "
                src="https://globalartcollection.com/img/login.gif"
                alt=""
              />
            </div>
            <div className="mt-10">
              <h1 className="text-center text-white text-lg pb-20">
                ❗Please{" "}
                <Link to={"/login"} className="text-blue-500">
                  Login
                </Link>{" "}
                For Continue
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBooks;
