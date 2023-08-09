import axios from "axios";
import JwtService from "./TokenServices";

const ApiServices = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

ApiServices.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${JwtService.getToken()}`;
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiServices;
