const JwtService = {
  getToken: () => {
    return localStorage.getItem("token");
  },
  setToken: (token) => {
    return localStorage.setItem("token", token);
  },
  destroyToken: () => {
    return localStorage.removeItem("token");
  },
};

export default JwtService;
