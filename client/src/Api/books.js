import ApiServices from "@/services/ApiServices";

const books = {
  get: async (id) => {
    const response = await ApiServices.get(`/books/${id}`);
    return response;
  },
  delete: async (userId, bookId) => {
    const response = await ApiServices.delete(`/books/${userId}/${bookId}`);
    return response;
  },
  update: async (userId, bookId, data) => {
    const response = await ApiServices.put(`/books/${userId}/${bookId}`, data);
    return response;
  },
};

export default books;
