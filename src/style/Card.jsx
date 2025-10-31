// BookCard.jsx
import React from "react";

const BookCard = ({ image, title, author, price }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 m-2 w-[280px] lg:w-full  flex flex-col">
      
      {/* Book Image */}
      <div className="relative w-full h-72 lg:h-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2">{title}</h2>
          <p className="mt-1 text-indigo-600 font-semibold">{author}</p>
          <p className="mt-2 text-indigo-600 font-semibold text-lg">${price}</p>
        </div>

        <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BookCard;
