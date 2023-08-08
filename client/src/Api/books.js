import ApiServices from "@/services/ApiServices";
import UserServices from "@/services/userServices";
import JwtService from "@/services/TokenServices";

const books = {
  get: async (id) => {
    const response = await ApiServices.get(`/books/${id}`);
    return response;
  },
  delete: async (userId, bookId) => {
    const response = await ApiServices.delete(`/books/${userId}/${bookId}`);
    return response;
  },
  signup: async (data) => {
    const response = await ApiServices.post("/sign-up", data);
    UserServices.setUser(response.data);
    JwtService.setToken(response.data.token);
    return response;
  },
};

export default books;
