import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  return (
    <>
      <AdminHeader>
        <div>
          <div className="flex flex-col items-center gap-4 justify-evenly lg:flex-row">
            <div className="box bg-blue-800 rounded-xl flex items-center">
              <FontAwesomeIcon className="text-5xl " icon={faBook} />
              <h2 className="text-center text-[20px] lg:text-[15px] ml-3">
                Total Number of Users <br /> 100+
              </h2>
            </div>
            <div className="box bg-green-800 rounded-xl flex items-center">
              <FontAwesomeIcon className="text-5xl ml-2" icon={faUsers} />
              <h2 className="text-center text-[20px] lg:text-[15px] ml-3">
                Total Number of Books <br /> 100+
              </h2>
            </div>
            <div className="box bg-amber-800 rounded-xl flex items-center">
              <FontAwesomeIcon className="text-5xl " icon={faUser} />
              <h2 className="text-center text-[20px] lg:text-[15px] ml-3">
                Total Number of Employees <br /> 100+
              </h2>
            </div>
          </div>
        </div>
      </AdminHeader>
    </>
  );
};

export default AdminHome;
