import { BaseUrl } from "./BaseUrl";
import commonApi from "./commonAPI";

export const createUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/register`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/login`, reqBody);
};

export const googleLogin = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/googleAuth`, reqBody);
};

export const createBook = async (reqBody, header) => {
  return await commonApi("post", `${BaseUrl}/createBooks`, reqBody, header);
};

export const getAllBooks = async (reqHeader, searchKey) => {
  return await commonApi(
    "get",
    `${BaseUrl}/getAllBook/?search=${searchKey}`,
    "",
    reqHeader
  );
};
export const getHomeBooks = async () => {
  return await commonApi("get", `${BaseUrl}/getHomeBooks`, "");
};
export const updateProfile = async (reqBody, reqHeader, id) => {
  return await commonApi(
    "put",
    `${BaseUrl}/${id}/updateUser`,
    reqBody,
    reqHeader
  );
};

export const getUserBooks = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/getUserBooks`, "", reqHeader);
};

export const getSingleBook = async (id, reqHeader) => {
  return await commonApi(
    "get",
    `${BaseUrl}/${id}/getSingleBook`,
    "",
    reqHeader
  );
};

export const getAllUsers = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/allUsers`, "", reqHeader);
};

export const getAllJobs = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/getAllJobs`, "", reqHeader);
};

export const addNewJob = async (reqBody, reqHeader) => {
  return await commonApi("post", `${BaseUrl}/createJob`, reqBody, reqHeader);
};

export const deleteAllJob = async (id, reqHeader) => {
  return await commonApi("delete", `${BaseUrl}/${id}/deleteJob`, {}, reqHeader);
};

export const applyJob = async(reqBody,reqHeader) =>{
  return await commonApi('post',`${BaseUrl}/addApplication`,reqBody,reqHeader)
}

export const viewApplicants = async(reqHeader)=>{
  return await commonApi('get',`${BaseUrl}/viewApplication`,"",reqHeader)
}

export const makePayment= async(reqBody,reqHeader)=>{
  return await commonApi('put',`${BaseUrl}/makePayment`,reqBody,reqHeader)
}

export const purchaseHistory=async(reqHeader)=>{
  return await commonApi('get',`${BaseUrl}/viewPurchasedBook`,"",reqHeader)
}