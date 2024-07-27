// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addCustomer } from "../../slice/customerSlice";
import { createCustomerA, deleteCustomerA, getAllCustomerA, updateCustomerA } from "./customerAApi";

export const GetAllCustomerA = () => async (dispatch) => {
  try {
    const cutomer = await getAllCustomerA();
    console.log(cutomer);
    if (cutomer.status === "ok") {
      dispatch(addCustomer(cutomer.data));
      return true;
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const DeleteCustomerA  = (id) => async (dispatch) => {
  try {
    console.log(id);
    const customer = await deleteCustomerA(id);
    console.log(customer);
    console.log(customer);
    console.log(customer.status);
    if (customer.status === "ok") {
      Swal.fire("success", customer.message, "success");
      dispatch(GetAllCustomerA());
      return true;
    } else {
      Swal.fire(customer.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message);
    return false;
  }
};


export const UpdateCustomerA =
  (Cus_ID,formData) =>
    async (dispatch) => {
      try {
        console.log(Cus_ID);
        console.log(formData);
        const customer = await updateCustomerA(
          Cus_ID, formData
        );
        console.log(customer);
        if (customer.status === "ok") {
          dispatch(GetAllCustomerA());
          Swal.fire("Success", customer.message, "success");
          return true;
        } else {
          Swal.fire("Error", customer.message, "error");
          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const CreateCustomerA =
  (data) => async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const customer = await createCustomerA(data);
      if (customer.status === "ok") {
        dispatch(GetAllCustomerA());
        Swal.fire("Success", customer.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", customer.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };