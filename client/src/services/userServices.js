const UserServices = {
    getUser: () => {
      return localStorage.getItem('user'); 
    },
    setUser: (user) => {
      return localStorage.setItem('user', JSON.stringify(user)); 
    },
    destroyUser: () => {
      return localStorage.removeItem('user');
    },
  };
  
  export default UserServices;
