// frontend/src/utils/localStorageUtil.js
const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));

    // Automatic deletion of user object after 1 hour 
    setTimeout(() => {
      localStorage.removeItem('user');
    }, 60 * 60 * 1000); 
  };
  
  export { saveUserDataToLocalStorage };
  