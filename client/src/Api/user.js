import ApiServices from "@/services/ApiServices";
import UserServices from "@/services/userServices";
import JwtService from "@/services/TokenServices";

const userAuth = {
  login: async (data) => {
    const response = await ApiServices.post("/login", data);
    UserServices.setUser(response.data.data);
    JwtService.setToken(response.data.data.token);
    return response;
  },
  signup: async (data) => {
    const response = await ApiServices.post("/sign-up", data);
    UserServices.setUser(response.data);
    JwtService.setToken(response.data.token);
    return response;
  },
};

export default userAuth;
