import React, { useEffect, useState } from "react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPencilAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { updateProfile } from "../services/AllApi";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [userDetails, setUserDetails] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [token,setToken] = useState('')
  const [id,setId] = useState('')
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setId(user._id)
    if (user) {
      setUserDetails(user);
    }
    let tokenMaster = localStorage.getItem('token')
    setToken(tokenMaster)
  }, []);
  const handleFileChange = (file) => {
    console.log(file);
    setUserDetails({ ...userDetails, profile: file });
    let url = URL.createObjectURL(file);
    setPreview(url);
  };
  const handleSave =async()=>{
    if(password==confirmPassword){
        setUserDetails({...userDetails,password:password})
        // Proceed to api call

        let reqHeader = {
            authorization: `Bearer ${token}`,
        }
        
        if(preview){
            // proceed as formData
            
            let reqBody = new FormData()
            for(let key in userDetails){
                reqBody.append(key,userDetails[key])
            }
            let apiResponse = await updateProfile(reqBody,reqHeader,id)
            console.log(apiResponse)
        }else{
            let {bio,email,password,profile,username} = userDetails
            let apiResponse = await updateProfile({bio,email,password,profile,username},reqHeader,id)
            console.log(apiResponse)
            // Proceed as normal json Data
        }

    }else{
        alert("Password Mismatch")
    }
  }
  return (
    <div className="">
      <div className="lg:ml-[1100px] ">
        <button
          className="bg-blue-700 mt-4 lg:mt-80 mx-4 hover:bg-blue-800 p-2 rounded-md  text-white text-lg"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
        </button>
      </div>
      <div className="min-h-[50vh] "></div>
      <Drawer className="p-0" open={isOpen} onClose={handleClose}>
        <div className="flex justify-between bg-gray-900 p-4">
          <h1 className="text-white text-3xl font-bold">Edit Profile</h1>
          <button
            onClick={handleClose}
            className="bg-red-600 w-8 h-8 rounded-full cursor-pointer text-white font-extrabold hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className=" pt-5 bgEdit min-h-[90.6%]">
          {preview ? (
            <img
              className="rounded-full w-40 h-40 p-[10px] mx-auto border-4 border-gray-600 shadow-lg"
              src={preview}
              alt="preview Image"
            />
          ) : (
            <img
              src={userDetails?.profile}
              alt="User"
              className="rounded-full w-40 h-40 p-[10px] mx-auto border-4 border-gray-600 shadow-lg"
            />
          )}
          <div className="flex justify-center mt-2">
            <input
              onChange={(e) => handleFileChange(e.target.files[0])}
              type="file"
              id="fileUpload"
              className="hidden"
              accept="image/png,image/jpeg,image/jpg"
            />
            <label
              htmlFor="fileUpload"
              className=" block bg-gray-700 hover:bg-gray-600 text-white p-2 w-20  text-center rounded-2xl cursor-pointer shadow-lg"
            >
              {" "}
              <FontAwesomeIcon icon={faPencilAlt} />
            </label>
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              value={userDetails?.username}
              type="text"
              placeholder="User Name"
              className="input text-white border border-gray-500 rounded-2xl w-60 text-center mb-4  bg-transparent placeholder-gray-400"
            />
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails?.email}
              type="email"
              placeholder="Email"
              className="input text-white border border-gray-500 rounded-2xl w-60 text-center mb-4 bg-transparent placeholder-gray-400"
            />
            <input
              value={userDetails?.password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="input text-white border border-gray-500 rounded-2xl w-60 text-center mb-4 bg-transparent placeholder-gray-400"
            />
            <input
              value={userDetails?.password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm New Password"
              className="input text-white border border-gray-500 rounded-2xl w-60 text-center mb-4 bg-transparent placeholder-gray-400"
            />
            <textarea
              onChange={(e) =>
                setUserDetails({ ...userDetails, bio: e.target.value })
              }
              value={userDetails?.bio}
              placeholder="Bio"
              className="textarea border border-gray-500 rounded-2xl w-60 h-28 text-white bg-transparent placeholder-gray-400 text-center mb-4"
            ></textarea>
          </div>
          <div className="flex items-center justify-center p-2 gap-2 pb-4">
            <button className="bg-red-600 hover:bg-red-700 text-lg p-2 w-20 rounded-lg cursor-pointer">
              Reset
            </button>
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-lg p-2 w-20 rounded-lg cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default EditProfile;
