import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LightRays from "../style/LightRays";
import BookCard from "../style/Card";
import Testimonials from "../style/Testimonials";
import { Search } from "lucide-react";
import { getHomeBooks } from "../services/AllApi";
import { BaseUrl } from "../services/BaseUrl";

const Landing = () => {
  const [bookData, setBookData] = useState([]);
  const books = [
    {
      image:
        "https://m.media-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
      title: "The Great Gatsby",
      author: "Eric Rice",
      price: "10.99",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
      title: "The Great Gatsby",
      author: "Eric Rice",
      price: "10.99",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
      title: "The Great Gatsby",
      author: "Eric Rice",
      price: "10.99",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg",
      title: "The Great Gatsby",
      author: "Eric Rice",
      price: "10.99",
    },
  ];
  useEffect(() => {
    loadBooks();
  }, []);
  const loadBooks = async () => {
    let apiResponse = await getHomeBooks();
    let data = apiResponse.data;
    setBookData(data);
  };

  return (
    <div className="container w-full min-h-screen overflow-x-hidden">
      <Header />
      <div className="hero-section relative">
        <div className="banner relative overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={2.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
          <div className="banner-head">
            <h1
              className="text-white mt-12 font-bold"
              style={{
                background: "linear-gradient(90deg, #fff, #00bfff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "3rem",
              }}
            >
              Silent Pages
            </h1>
            <h3 className="text-white mt-4">
              Where imagination whispers through every word.
            </h3>
            <div className="relative w-full max-w-md mx-auto mt-10">
              <input
                type="text"
                placeholder="Search your favorite books..."
                className="w-full sm:w-80 md:w-96 lg:w-[28rem] lg:placeholder:text-lg md:placeholder:text-sm py-2 placeholder:text-[9px] pl-5 pr-12 text-white placeholder-gray-400 bg-gray-900/70 border border-gray-700 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-md transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-white font-bold text-3xl mt-12 mx-2">
          <h3>
            New <br className="lg:hidden" />{" "}
            <span className="loading-text">Arrivals</span>
          </h3>
          <h1>
            Explore Our Latest <br className="lg:hidden" />{" "}
            <span className="loading-text">Collection</span>
          </h1>
        </div>

        {/* <div className="card-section grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 lg:px-8 mx-7">
          {bookData.map((eachBooks, index) => (
            <div key={index} className="w-full">
              <BookCard
                image={eachBooks.uploadedImages}
                title={eachBooks.title}
                author={eachBooks.author}
                price={eachBooks.price}
              />
            </div>
          ))}
        </div> */}
        {bookData?.length > 0 ? (
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8 px-4 sm:px-6 lg:px-8 justify-items-center">
    {bookData.map((eachBooks, index) => (
      <BookCard
        key={index}
        image={`${BaseUrl}/uploads/${eachBooks.uploadedImages[0]}`}
        title={eachBooks.title}
        author={eachBooks.author}
        price={eachBooks.price}
      />
    ))}
  </div>
) : (
  <h1 className="text-center mt-8 text-2xl font-bold">No Books Found!</h1>
)}


        <div className="text-center my-10">
          <button
            className="cursor-pointer px-6 py-3 rounded-full shadow-lg text-white 
               bg-[#1f4d66] hover:bg-[#236b8e] 
               transition-all duration-300 
               hover:shadow-[0_0_20px_4px_rgba(35,107,142,0.6)]"
          >
            Explore More..
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-white p-8 overflow-hidden">
          <div className="text-center mt-0 leading-loose">
            <h4 className="font-bold text-2xl">Featured Author</h4>
            <h1 className="font-bold text-4xl">Captivates with every word</h1>
            <p className="mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
              sapiente, quaerat reprehenderit accusamus obcaecati nisi tempora
              id natus recusandae minima maiores iure doloribus blanditiis in,
              aut deleniti quidem! Voluptate laborum est non, nisi adipisci
              nesciunt enim quod amet quisquam? Dolor voluptate neque nesciunt
              in omnis, nisi animi doloribus numquam dicta odit excepturi ut!
              Incidunt ipsa molestiae in inventore. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Repellat minima, autem reprehenderit
              maiores exercitationem, corporis reiciendis quas quis, officia
              voluptate incidunt provident magnam laboriosam mollitia
              perspiciatis obcaecati ea culpa delectus! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Sed, nemo magni consectetur
              odio reprehenderit fugiat minus? Non qui perspiciatis mollitia
              omnis! Magni quo rem sint unde impedit qui vero cupiditate.
            </p>
          </div>
          <div className="flex justify-center ">
            <img
              src="https://images.pexels.com/photos/34192102/pexels-photo-34192102.jpeg"
              alt="Author Image"
              className="rounded-2xl shadow-lg h-120 object-cover w-full max-w-xs md:max-w-md transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        <div>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Landing;
