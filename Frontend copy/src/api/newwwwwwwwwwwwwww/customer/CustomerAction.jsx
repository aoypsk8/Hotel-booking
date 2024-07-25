// import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../api";

export const UpdateCustomer = (firstName, lastName, phoneNumber, passport, email, password, imageFile, Cus_ID) => async (dispatch) => {
  try {
    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("First_name", firstName);
    formData.append("Last_name", lastName);
    formData.append("Phone_Number", phoneNumber);
    formData.append("Passport", passport);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("image", imageFile);
    const response = await axios.put(
      `${BASE_URL}/customers/${Cus_ID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);

    localStorage.setItem('user', JSON.stringify(response.data.data));
    Swal.close();

    if (response.data.status === "ok") {
      Swal.fire("Success", response.data.message, "success");
      return true;
    } else {
      Swal.fire("Error", response.data.message, "error2");
      return false;
    }
  } catch (error) {
    Swal.close();
    Swal.fire("Error", error.message, "error");
    return false;
  }
};
