import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { createBook, getUserBooks, purchaseHistory } from "../services/AllApi";
import EditProfile from "../components/EditProfile";
import { Card } from "flowbite-react";
import { BaseUrl } from "../services/BaseUrl";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellFlag, setSellFlag] = useState(true);
  const [bookFlag, setBookFlag] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);
  const [preview, setPreview] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [previewList, setPreviewList] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [purchasedBook,setPurchasedBooks]=useState([])
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    imageUrl: "",
    noOfPages: 0,
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    category: "",
    language: "",
    isbn: "",
    bookImages: [],
  });
  console.log(bookData);
  const handleReset = () => {
    setBookData({
      title: "",
      author: "",
      imageUrl: "",
      noOfPages: "",
      price: "",
      discountPrice: "",
      abstract: "",
      publisher: "",
      category: "",
      language: "",
      isbn: "",
      bookImages: [],
    });
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    }
    currentUserBooks();
    loadPurchaseBooks();
  }, []);
  const viewSellBook = () => {
    setSellFlag(true);
    setBookFlag(false);
    setPurchaseFlag(false);
  };
  const viewBookStatus = () => {
    setSellFlag(false);
    setBookFlag(true);
    setPurchaseFlag(false);
  };
  const viewPurchase = () => {
    setSellFlag(false);
    setBookFlag(false);
    setPurchaseFlag(true);
  };
  const handleFileChange = (e) => {
    console.log(e.target.files);
    let imgFile = e.target.files[0];
    setPreview(URL.createObjectURL(imgFile));

    setPreviewList([...previewList, URL.createObjectURL(imgFile)]);
    let aBookImages = bookData.bookImages;
    aBookImages.push(imgFile);
    setBookData({ ...bookData, bookImages: aBookImages });
  };
  const currentUserBooks = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getUserBooks(reqHeader);
    setUserBooks(apiResponse.data);

  };
  const handleSubmit = async () => {
    const {
      title,
      author,
      imageUrl,
      noOfPages,
      price,
      discountPrice,
      abstract,
      publisher,
      category,
      language,
      isbn,
      bookImages,
    } = bookData;
    if (
      title == "" ||
      author == "" ||
      imageUrl == "" ||
      noOfPages == 0 ||
      price == 0 ||
      discountPrice == 0 ||
      abstract == "" ||
      publisher == "" ||
      category == "" ||
      language == "" ||
      isbn == "" ||
      bookImages == []
    ) {
      alert("Please Fill the Form");
    } else {
      let token = localStorage.getItem("token");
      let header = {
        authorization: `Bearer ${token}`,
      };
      let reqBody = new FormData();
      for (let key in bookData) {
        if (key !== "bookImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.bookImages.forEach((eachImageFile) => {
            reqBody.append("bookImages", eachImageFile);
          });
        }
      }

      let apiResponse = await createBook(reqBody, header);
      console.log(apiResponse);
      
    }
  };

  const loadPurchaseBooks = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await purchaseHistory(reqHeader);
    setPurchasedBooks(apiResponse.data)
    
  };
  console.log(purchasedBook)
  return (
    <>
      <div className="profile-section-bg h-full">
        <Header />
        <div className="bg-gray-900 p-30 mt-2 flex justify-center lg:justify-start">
          <div className="absolute  lg:ml-[-50px]">
            <img
              src={` ${
                userDetails
                  ? userDetails.profile
                  : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
              }`}
              alt="User"
              className="rounded-full p-2 w-44 h-44 mx-auto border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <div className=" h-30 mt-6 flex flex-col items-center mb-9 lg:flex-row lg:justify-between">
          <div className="flex">
            <h1 className="mt-10 ml-12 text-2xl font-bold text-white">
              {userDetails ? userDetails.username : "User"}
              <FontAwesomeIcon
                className="text-blue-500 mx-2"
                icon={faCircleCheck}
              />
            </h1>
          </div>
          <EditProfile />
        </div>
        <p className="text-white text-center mx-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          temporibus quasi facilis maiores corrupti quo aliquid, maxime enim
          quos officia laboriosam optio, dolore laudantium delectus libero
          sapiente. Labore, eius rerum! Eveniet mollitia, quis et amet rerum ad,
          facilis sunt, adipisci repellat quisquam explicabo. Aspernatur odio
          recusandae aperiam aut! Veniam incidunt expedita facilis assumenda
          omnis quibusdam quos eos quisquam necessitatibus aut.
        </p>
        <div className="flex justify-center mt-20 gap-2 mx-5">
          <button
            onClick={viewSellBook}
            className={
              "text-lg justify-center w-30  rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 bg-gray-700 hover:bg-gray-500 active:bg-gray-400 text-white"
            }
          >
            <FontAwesomeIcon />
            Sell Book
          </button>
          <button
            onClick={viewBookStatus}
            className={
              "text-lg  w-30 justify-center rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 bg-gray-700 hover:bg-gray-500 active:bg-gray-400 text-white"
            }
          >
            <FontAwesomeIcon />
            Book Status
          </button>
          <button
            onClick={viewPurchase}
            className={
              "text-lg  w-30 justify-center rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2 bg-gray-700 hover:bg-gray-500 active:bg-gray-400 text-white"
            }
          >
            <FontAwesomeIcon />
            Purchase History
          </button>
        </div>

        {sellFlag && (
          <div className="text-white p-5">
            <div className="bg-[#173245] mx-4 lg:mx-32 mt-5 p-2 text-center rounded-xl">
              <h1 className="text-2xl font-bold">Book Details</h1>

              <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4">
                {/* Left Column */}
                <div className="leading-7 flex flex-col items-center gap-2 w-full">
                  <input
                    value={bookData.title || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, title: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Title"
                  />
                  <input
                    value={bookData.author || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, author: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Author"
                  />
                  <input
                    value={bookData.noOfPages == 0 ? "" : bookData.noOfPages}
                    onChange={(e) =>
                      setBookData({ ...bookData, noOfPages: e.target.value })
                    }
                    type="number"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="No of Pages"
                  />
                  <input
                    value={bookData.imageUrl || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, imageUrl: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Image URL"
                  />
                  <input
                    value={
                      bookData.discountPrice == 0 ? "" : bookData.discountPrice
                    }
                    onChange={(e) =>
                      setBookData({ ...bookData, price: e.target.value })
                    }
                    type="number"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Price"
                  />
                  <input
                    value={
                      bookData.discountPrice == 0 ? "" : bookData.noOfPages
                    }
                    onChange={(e) =>
                      setBookData({
                        ...bookData,
                        discountPrice: e.target.value,
                      })
                    }
                    type="number"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Discount Price"
                  />

                  {/* Abstract visible here only on large screens */}
                  <textarea
                    value={bookData.abstract || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, abstract: e.target.value })
                    }
                    placeholder="Abstract"
                    className="hidden lg:block textarea border w-full border-gray-400 rounded-2xl h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
                  ></textarea>
                </div>

                {/* Right Column */}
                <div className="leading-7 flex flex-col items-center gap-2 w-full">
                  <input
                    value={bookData.publisher || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, publisher: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Publisher"
                  />
                  <input
                    value={bookData.language || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, language: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Language"
                  />
                  <input
                    value={bookData.isbn || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, isbn: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="ISBN"
                  />
                  <input
                    value={bookData.category || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, category: e.target.value })
                    }
                    type="text"
                    className="input border w-full border-gray-400 rounded-md p-1 text-center"
                    placeholder="Category"
                  />

                  {/* Abstract visible here only on small screens */}
                  <textarea
                    value={bookData.abstract || ""}
                    onChange={(e) =>
                      setBookData({ ...bookData, abstract: e.target.value })
                    }
                    placeholder="Abstract"
                    className="block lg:hidden textarea border w-full border-gray-400 rounded-2xl h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
                  ></textarea>

                  {/* File upload section */}

                  <div className="flex flex-col justify-center items-center mt-5">
                    <input
                      onChange={(e) => handleFileChange(e)}
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg"
                    />

                    <label
                      htmlFor="fileUpload"
                      className="block  p-1 w-30 text-center rounded-full cursor-pointer "
                    >
                      <img
                        src={
                          preview
                            ? preview
                            : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                        }
                        alt="Preview"
                        className=" object-cover rounded-2xl"
                      />
                    </label>

                    <div
                      className="flex flex-wrap bg-gray-800 rounded-xl justify- items-center
                    "
                    >
                      {preview
                        ? previewList?.map((eachPreview) => (
                            <img
                              className="w-20 h-20 object-cover m-2 rounded "
                              src={eachPreview}
                              alt="Preview"
                            />
                          ))
                        : ""}
                      {previewList.length < 3 && previewList.length > 0 ? (
                        <label
                          htmlFor="fileUpload"
                          className="inline-block   px-2  text-center rounded-full cursor-pointer "
                        >
                          <input
                            onChange={(e) => handleFileChange(e)}
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            accept="image/png,image/jpeg,image/jpg"
                          />
                          <div className="bg-gray-500 font-bold  hover:bg-gray-400 active:bg-gray-300 p-1 text-3xl flex justify-center items-center rounded-full w-10 h-10   shadow-lg">
                            +
                          </div>
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    {previewList.length < 3 ? (
                      <h1>choose file to upload</h1>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-2 gap-2 pb-4">
                <button
                  onClick={handleReset}
                  className="bg-red-700 hover:bg-red-800 text-lg p-2 w-20 rounded-lg cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-700 hover:bg-green-800 text-lg p-2 w-20 rounded-lg cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {bookFlag && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 place-items-center ">
            {userBooks?.map((eachBooks) => (
              <Card
                key={eachBooks._id}
                className="max-w-sm flex flex-col  h-full transform cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`${BaseUrl}/uploads/${eachBooks.uploadedImages[0]}`}
                  alt={eachBooks.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="flex-1 flex flex-col p-4">
                  <h5 className="text-2xl font-bold text-gray-800">
                    {eachBooks.title}
                  </h5>
                  <h6 className="text-xl font-bold text-gray-800 mt-1">
                    $ {eachBooks.price}
                  </h6>
                  <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 mt-2">
                    {eachBooks.abstract}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
        
          <div className="">
            {purchaseFlag && <div className="">
          
          {
            purchasedBook?.length>0?<div className="p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {
                purchasedBook.map((eachBooks)=>(
                  <Card
                key={eachBooks._id}
                className="max-w-sm flex flex-col  h-full transform cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`${BaseUrl}/uploads/${eachBooks.uploadedImages[0]}`}
                  alt={eachBooks.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="flex-1 flex flex-col p-4">
                  <h5 className="text-2xl font-bold text-gray-800">
                    {eachBooks.title}
                  </h5>
                  <h6 className="text-xl font-bold text-gray-800 mt-1">
                    $ {eachBooks.price}
                  </h6>
                  <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 mt-2">
                    {eachBooks.abstract}
                  </p>
                </div>
              </Card>

                ))
              }

            </div>:<h1>No Purchase history found</h1>
          }
          </div>}
          </div>
        </div>
      
    </>
  );
};

export default ProfilePage;
