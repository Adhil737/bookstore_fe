import React, { useEffect, useState } from "react";
import { getSingleBook, makePayment } from "../services/AllApi";
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../services/BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";

const ViewBooks = () => {
  const [bookDetails, setBookDetails] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getBookDetails();
  }, []);
  const getBookDetails = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getSingleBook(id, reqHeader);
    setBookDetails(apiResponse.data);
  };
  const buyBook = async () => {
    const stripe = await loadStripe(
      "pk_test_51SNd7V01Ri4QwWGcEmECDNzGFBxemARH67A1jybkskL4DAlnj04eIic7myfwNMGYaknyRo417PzBY6SZCn9KDUbJ00vje4s9II"
    );
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let reqBody = {
      bookDetails: bookDetails,
    };
    let apiResponse = await makePayment(reqBody, reqHeader);
    if(apiResponse.status==200){
      let session = apiResponse.data.session
      window.location.href = session.url
    }else{
      console.log("Error Occurred")
    }
  }
  return (
    <div className="viewSingleBookBg p-10 min-h-screen">
      <div className=" w-full rounded-xl bg-gray-900 flex flex-col p-5 justify-center items-center lg:flex-row">
        <div className="lg:w-[30%]">
          <div className="flex justify-center items-center">
            {
              <img
                src={`${BaseUrl}/uploads/${bookDetails?.uploadedImages?.[0]}`}
                alt="Book Title Image"
                className=" p-2 mt-2 rounded-2xl"
              />
            }
          </div>
        </div>
        <div className="lg:w-[70%]">
          <h1 className="text-center text-2xl lg:text-4xl pt-2 px-20 text-white font-extrabold break-words">
            {bookDetails?.title}
          </h1>
          <h3 className="text-blue-700 text-center text-lg mt-4 font-bold">
            <span className="text-xl text-white">Author :</span> <br />{" "}
            {bookDetails?.author}
          </h3>
          <h3 className="text-center mt-2 text-white text-lg font-bold">
            Description :{" "}
          </h3>
          <p className="text-justify leading-relaxed tracking-normal text-white overflow-hidden break-words px-4">
            {bookDetails?.abstract}.
          </p>

          <div className="bg-slate-900 text-white p-6 rounded-xl mt-3 shadow-md max-w-md lg:max-w-full mx-auto grid grid-cols-2 gap-y-3 gap-x-4 break-words">
            <span className="font-semibold text-lg">Publisher</span>
            <span className="text-gray-300 break-words">
              {bookDetails?.publisher}
            </span>

            <span className="font-semibold text-lg">Language</span>
            <span className="text-gray-300 break-words">
              {bookDetails?.language}
            </span>

            <span className="font-semibold text-lg">No. of Pages</span>
            <span className="text-gray-300 break-words">
              {bookDetails?.noOfPages}
            </span>

            <span className="font-semibold text-lg">Seller Email</span>
            <span className="text-gray-300 break-words">
              {bookDetails?.userMail}
            </span>

            <span className="font-semibold text-lg">Real Price</span>
            <span className="text-gray-300 break-words">
              $ {bookDetails?.price}
            </span>

            <span className="font-semibold text-lg">ISBN</span>
            <span className="text-gray-300 break-words">
              {bookDetails?.isbn}
            </span>
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <Link
              to={"/books"}
              className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-500 cursor-pointer transform transition-transform hover:scale-105 shadow-lg"
            >
              <FontAwesomeIcon icon={faBackward} /> Back
            </Link>
            <button
              onClick={buyBook}
              className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-500 cursor-pointer transform transition-transform hover:scale-105 shadow-lg"
            >
              Buy ${bookDetails.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
