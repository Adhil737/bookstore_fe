import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../../context/authContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    } else {
      setUserDetails({});
    }
    console.log(userDetails.profile);
  }, [logout]);
  const onLogoutClick = () => {
    logoutUser();
    setLogout(true);
    navigate("/");
  };
  return (
    <header className=" text-white overflow-hidden">
      {/* Top Section */}
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 ">
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

        {/* Social icons + Login (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-5 text-lg ">
          <FontAwesomeIcon
            icon={faInstagram}
            className="hover:text-pink-400 cursor-pointer transition"
          />
          <FontAwesomeIcon
            icon={faXTwitter}
            className="hover:text-sky-400 cursor-pointer transition"
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className="hover:text-blue-500 cursor-pointer transition"
          />
          {isLoggedIn ? (
            <div className="relative ">
              <img
                src={userDetails.profile}
                alt=""
                className="w-15 rounded-full absolute ml-25"
              />

              <Dropdown
                className="text-2xl   text-transparent cursor-pointer ml-10"
                label="Options"
                dismissOnClick={false}
              >
                <div className="">
                  <DropdownItem className="">
                  <Link className="" to={"/profile"}>Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <button className="cursor-pointer " onClick={onLogoutClick}>
                    Sign out
                  </button>
                </DropdownItem>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-2xl hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button (visible on mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "max-h-60  opacity-100" : "max-h-0 opacity-0"
        } md:max-h-full md:opacity-100  overflow-hidden transition-all duration-300  md:bg-transparent `}
      >
        <div className="flex justify-center items-center">
          <ul
            className={`flex flex-col md:flex-row w-xs justify-center items-center gap-4 nav-links md:gap-10 py-4 md:py-2 text-lg font-medium ${
              menuOpen ? "animate-links" : ""
            }`}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Books
            </Link>
            <Link
              to="/careers"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Careers
            </Link>
            <Link
              to="/contacts"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Contact
            </Link>

            {/* Login for mobile */}
            {isLoggedIn ? (
              <div className="block md:hidden">
                <div className="relative ">
              <img
                src={userDetails.profile}
                alt=""
                className="w-15 rounded-full absolute ml-15 mt-[-5px]"
              />

              <Dropdown
                className="text-2xl mt-[-15px]  text-transparent cursor-pointer ml-10"
                label="Options"
                dismissOnClick={false}
              >
                <div className="">
                  <DropdownItem className="">
                  <Link className="" to={"/profile"}>Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <button className="cursor-pointer " onClick={onLogoutClick}>
                    Sign out
                  </button>
                </DropdownItem>
                </div>
              </Dropdown>
            </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="md:hidden flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-2xl hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Login</span>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
