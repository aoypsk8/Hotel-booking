import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "./api.jsx"
export const doLogin = async (Phone_Number, Password) => {
  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      Phone_Number: Phone_Number,
      Password: Password,
    }
  );

  return response.data;
};


export const doRegisterCustomer = async (First_name, Last_name, Phone_Number, Email, Passport, Password) => {
  await axios.post(`${BASE_URL}/customers/create`, {
    First_name: First_name,
    Last_name: Last_name,
    Phone_Number: Phone_Number,
    Email: Email,
    Password: Password,
    Passport: Passport,
  })
    .then((res) => {
      Swal.fire(res.data.message);
    })
    .catch((error) => {
      Swal.fire(error.message);
    });
};
