import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, googleLogin, loginUser } from "../services/AllApi";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/authContext";


const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();
  const {saveToken} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const registerUser = async () => {
    try {
      let apiResponse = await createUser(formData);
      if (apiResponse.status == 201) {
        toast("Registration SuccessFull");
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      username: "",
      password: "",
      email: "",
    });
  };
  const loginButtonClick = async () => {
    try {
      let apiResponse = await loginUser(formData);
      if (apiResponse.status == 200) {
        toast("Successfully Logged in");
        console.log(apiResponse);
        // localStorage.setItem("token", apiResponse.data.token);
        saveToken(apiResponse.data.token )
        localStorage.setItem("user", JSON.stringify(apiResponse.data.user));
        if (apiResponse.data.user.email == "adhilmajeed737@gmail.com") {
          navigate("/admin-home");
          // navigate to admin home
        } else {
          // navigate to user home
          navigate("/");
        }
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGAuthDecode = async (googleToken) => {
    const decoded = jwtDecode(googleToken);
    //console.log(decoded);
    let reqBody = {
      username: decoded.name,
      email: decoded.email,
      profile: decoded.picture,
    };
    let apiResponse = await googleLogin(reqBody);
    if (apiResponse.status == 200 || apiResponse.status == 201) {
      localStorage.setItem("token", apiResponse.data.token);
      localStorage.setItem("user", JSON.stringify(apiResponse.data.user));
      if (apiResponse.data.user.email == "adhilmajeed737@gmail.com") {
          navigate("/admin-home");
          // navigate to admin home
        } else {
          // navigate to user home
          navigate("/");
        }
      
    } else {
      toast(apiResponse.response.data.message);
    }
  };

  return (
    <>
      <div id="AuthBg" className="">
        <div className=" ">
          <h1 className="text-center text-white text-4xl font-bold p-8">
            Book Store
          </h1>
        </div>
        <div className=" flex items-center justify-center  leading-7 text-white ">
          <div className="form-bg max-w-md w-full  rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold  mb-6 text-center">
              {insideRegister ? "Sign Up" : "Sign In"}
            </h2>
            <div className="text-center mb-4 text-4xl">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="space-y-4">
              {insideRegister ? (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    User Name
                  </label>
                  <input
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    type="text"
                    autoComplete="username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Bear Grills"
                  />
                </div>
              ) : (
                ""
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="beargrills@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Password
                </label>
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm ">Remember me</span>
                </label>
                {insideRegister ? (
                  ""
                ) : (
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              {/* For-Google-Authentication */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  //console.log(credentialResponse);
                  handleGAuthDecode(credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              {insideRegister ? (
                <button
                  onClick={registerUser}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={loginButtonClick}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {insideRegister ? (
              <div className="mt-6 text-center text-sm ">
                Already have an account ?
                <Link
                  to={"/login"}
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  {" "}
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="mt-6 text-center text-sm ">
                Don't have an account ?
                <Link
                  to={"/register"}
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  {" "}
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Auth;
