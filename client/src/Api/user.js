import ApiServices from "@/services/ApiServices";
import JwtService from "@/services/TokenServices";

const userAuth = {
  login: async (data) => {
    const response = await ApiServices.post("/login", data);
    JwtService.setToken(response.data.data.token);
    return response;
  },
  signup: async (data) => {
    const response = await ApiServices.post("/sign-up", data);
    JwtService.setToken(response.data.token);
    return response;
  },
  signOut: async () => {
    const response = await ApiServices.post("/sign-out");
    return response;
  },
  getUser: async () => {
    const response = await ApiServices.post("/user", {
      token: JwtService.getToken(),
    });
    JwtService.setToken(response.data.token);
    return response;
  },
};

export default userAuth;
