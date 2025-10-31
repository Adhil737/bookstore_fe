import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
import {
  faHome,
  faBook,
  faBriefcase,
  faCog,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
const AdminHeader = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className=" text-white admin-header text-xl ">
        {/* Top Section */}
        <div className="flex justify-between items-center px-4 sm:px-8 py-3">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img
              className="w-14 sm:w-20 rounded-xl"
              src="https://cdn-icons-png.flaticon.com/512/4541/4541151.png"
              alt="Header Logo"
            />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Book Store
            </h1>
          </div>
          <button className=" flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-2xl hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={faUser} />
            <span>Logout</span>
          </button>
        </div>

        {/* Navigation Links */}
      </header>
      <div className="admin-home-bg min-h-screen text-white">
        {/* 🔹 Top Marquee (Always Visible) */}
        <div className="marque-tag p-2 flex items-center">
          {/* Hamburger only on small screens */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white mr-2"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>

          <marquee className="flex-1">
            Welcome Home Mr.Admin, You’re all set to manage and monitor the
            system — let’s get back to work!
          </marquee>
        </div>

        {/* 🔹 Main Layout */}
        <div className="md:grid md:grid-cols-[auto_1fr] lg:grid-cols-[260px_1fr] min-h-screen bg-[#0f2533]">
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-[#173245] text-white transform transition-transform duration-300 ease-in-out z-50
      md:static md:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:rounded-2xl md:mt-8 md:ml-5
    `}
          >
            <div className="p-6">
              {/* Profile Section */}
              <div className="text-center">
                <img
                  src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                  alt="User"
                  className="rounded-full w-24 h-24 mx-auto border-4 border-gray-600 shadow-lg"
                />
                <h2 className="pt-4 text-2xl font-semibold">User Name</h2>
              </div>

              {/* Menu Section */}
              <ul className="mt-10 space-y-3 text-lg">
                <li>
                  <Link
                    to="/admin-home"
                    className="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faHome} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-books"
                    className="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBook} />
                    <span>Books / Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-careers"
                    className="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>Careers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-settings"
                    className="flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
              onClick={() => setIsOpen(false)}
            ></div>
          )}

          {/* Main Content */}
          <main className="p-6 md:p-10 md:ml-0 min-h-screen bg-[#0f2533] rounded-t-2xl md:rounded-none">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
