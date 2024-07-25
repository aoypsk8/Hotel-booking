// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login,logout } from "../slice/userSlice";
import { doLogin, doRegisterCustomer } from "./authApi";

export const loginUser = (phone, password) => async (dispatch) => {
  try {
    const user = await doLogin(phone, password);
    if (user.status == "ok") {
      Swal.fire("Login !", user.message, "success");
      
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user.data));
      localStorage.setItem('token', user.token);
      dispatch(login({ user: user.data, token: user.token }));
      console.log(user.data.type);
      if (user.data.type === "admin") {
        return "/admin";
      }else{
        return "/";
      }
    } else {
      Swal.fire("ເບີ ຫລື ລະຫັດຜ່ານບໍ່ຖືກ");
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const registerUser =
  (First_name, Last_name, Phone_Number, Email, Passport, Password) => async (dispatch) => {
    try {
      await doRegisterCustomer(First_name, Last_name, Phone_Number, Email, Passport, Password);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

// Logout function to clear data from local storage
export const logoutUser = () => (dispatch) => {
  try {
    // Clear user data and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Dispatch logout action to Redux store
    dispatch(logout());
    
    
    Swal.fire("Logged out!", "You have been logged out.", "success");
  } catch (error) {
    Swal.fire("An error occurred", error.message, "error");
  }
};

export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};