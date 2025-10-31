import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { updateProfile } from "../../services/AllApi";

const AdminSettings = () => {
  let user = localStorage.getItem("user");
  let userDetails = JSON.parse(user);
  const [preview, setPreview] = useState("");

  const [profileData, setProfileData] = useState({
    username: userDetails.username,
    email: userDetails.email,
    password: userDetails.password,
    cnfPassword: userDetails.password,
    profile: userDetails.profile,
    bio: userDetails.bio,
  });
  
  const [id,setId]=useState('')
  useEffect(()=>{
    setId(userDetails._id)
  },[])
  const onResetClick = () => {
    setProfileData({
      username: "",
      email: userDetails.email,
      password: "",
      cnfPassword: "",
      profile: "",
      bio: userDetails.bio,
    });
  };
  const handleFileChange = (file) => {
    console.log(file);
    setPreview(URL.createObjectURL(file));
    setProfileData({...profileData,profile:file})
  };

  const onUpdateClick = async () => {
    let reqBody = new FormData();
    reqBody.append("username", profileData.username);
    reqBody.append("email", profileData.email);
    reqBody.append("password", profileData.password);
    reqBody.append("profile", profileData.profile);
    reqBody.append("bio", profileData.bio);

    if (
      profileData.username == "" ||
      profileData.password == "" ||
      profileData.cnfPassword == ""
    ) {
      alert("Please Fill the Form");
    } else {
      if (profileData.password == profileData.cnfPassword) {
        let token = localStorage.getItem("token");
        let reqHeader = {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        let apiResponse = await updateProfile(reqBody,reqHeader,id)
        if(apiResponse.status==200){
          localStorage.setItem("user",JSON.stringify(apiResponse.data))
          alert("Successfully Updated")
        }else{
          alert(apiResponse.data.message)
        }
      } else {
        alert("Password Mismatch");
      }
    }
  };
  return (
    <>
      <AdminHeader>
        <h1 className="text-center font-bold text-4xl">
          Settings <FontAwesomeIcon className="text-3xl" icon={faCog} />
        </h1>
        <div className="grid gap-5 grid-rows-[auto_auto] lg:grid-cols-[1fr_1fr] mt-10">
          <div className="bg-[#173245] rounded-2xl p-2 ">
            <h1 className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              porro possimus ratione quidem vel eligendi beatae ab nulla tempore
              ipsam necessitatibus voluptates, perferendis culpa delectus
              distinctio dolor? Mollitia, natus excepturi. Nobis, repellendus
              totam. Quod possimus distinctio dignissimos ipsa saepe ullam
              pariatur commodi error incidunt facere officia culpa, eos
              voluptatum quia voluptas dolore esse, quo dolor laudantium velit
              nesciunt quisquam eligendi. Quis magnam minus quam quaerat ipsa
              nobis voluptates atque odit aperiam provident totam, doloremque
              enim eius laborum vitae officia! Possimus quis saepe, quo cumque
              amet recusandae? Non placeat molestias nam. Aspernatur
              consequuntur dignissimos quam assumenda asperiores natus
              consectetur ullam nulla eius iste at facilis voluptates, nihil
              quaerat, excepturi libero nobis animi vel. Nulla ut, ipsam non hic
              esse consectetur distinctio! Magni asperiores nesciunt sint? Sit
              placeat atque temporibus expedita doloremque dolore ab sapiente
              commodi nesciunt velit, dolor, perferendis tempore et sint
              consectetur architecto ipsam veritatis ipsum nam, maiores aut qui.
              Ex et ducimus doloribus, officiis ratione dignissimos vitae sed
              amet molestiae ut, repellat deserunt quo repudiandae praesentium.
              In delectus sapiente cum, eaque aspernatur omnis? Veniam ab sed
              officiis omnis. Fugit!
            </h1>
          </div>
          {/* Profile Edit Section */}
          <div className="bg-[#173245] rounded-md">
            <div className="p-4 ">
              {preview ? (
                <img
                  src={preview}
                  alt="User"
                  className="rounded-full w-40 h-40 p-[10px] mx-auto border-4 border-gray-600 shadow-lg"
                />
              ) : (
                <img
                  src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                  alt="User"
                  className="rounded-full w-40 h-40 p-[10px] mx-auto border-4 border-gray-600 shadow-lg"
                />
              )}
              <div className="flex justify-center mt-5">
                <input
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  accept="image/png,image/jpeg,image/jpg"
                  type="file"
                  id="fileUpload"
                  className="hidden"
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
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  value={profileData?.username}
                  type="text"
                  placeholder="User Name"
                  className="input text-white border border-gray-500 rounded-2xl w-80 text-center mb-4 bg-transparent placeholder-gray-400"
                />
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  value={profileData?.password}
                  type="password"
                  placeholder="Password"
                  className="input text-white border border-gray-500 rounded-2xl w-80 text-center mb-4 bg-transparent placeholder-gray-400"
                />
                <input
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      cnfPassword: e.target.value,
                    })
                  }
                  value={profileData?.cnfPassword}
                  type="password"
                  placeholder="Confirm Password"
                  className="input text-white border border-gray-500 rounded-2xl w-80 text-center mb-4 bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center justify-center p-2 gap-2 pb-4">
                <button
                  onClick={onResetClick}
                  className="bg-red-700 hover:bg-red-800 text-lg p-2 w-20 rounded-lg cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={onUpdateClick}
                  className="bg-green-700 hover:bg-green-800 text-lg p-2 w-20 rounded-lg cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminHeader>
    </>
  );
};

export default AdminSettings;
