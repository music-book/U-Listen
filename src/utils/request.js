import axios from "axios";

const baseURL = "http://49.234.52.12:3000/";

const request = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json",
  validateStatus: status => {
    return status >= 200 && status < 500;
  }
});

export default request;
