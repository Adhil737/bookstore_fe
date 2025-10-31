import axios from "axios";

const commonApi = async (reqMethod, url, reqBody, reqHeader) => {
  let configObj = {
    method: reqMethod,
    data: reqBody,
    url: url,
    headers: reqHeader,
  };
  console.log(configObj)

  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export default commonApi;
