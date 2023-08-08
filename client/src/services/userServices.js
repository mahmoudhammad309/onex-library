const UserServices = {
    getUser: () => {
      return JSON.parse(localStorage.getItem('user')); 
    },
    setUser: (user) => {
      return localStorage.setItem('user', JSON.stringify(user)); 
    },
    destroyUser: () => {
      return localStorage.removeItem('user');
    },
  };
  
  export default UserServices;
