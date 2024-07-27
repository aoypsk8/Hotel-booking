// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { createRoom, deleteRoom, updateRoom } from "./roomApi";
import { addEmployee } from "../../slice/employeeSlice";
// import { createEquipment, deleteEquipment, getAllEquipment, updateQuipment } from "./equipmentApi";
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from "./employeeApi";


export const GetAllEmployee = () => async (dispatch) => {
  try {
    const employee = await getAllEmployee();
    console.log(employee);
    if (employee.status == "ok") {
      dispatch(addEmployee(employee.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const DeleteEmployee = (id) => async (dispatch) => {
  try {
    console.log(id);
    const employee = await deleteEmployee(id);
    if (employee.status === "ok") {
      Swal.fire("success", employee.message, "success");
      dispatch(GetAllEmployee());
      return true;
    } else {
      Swal.fire(room.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message);
    return false;
  }
};


export const UpdateEmployee =
  (Cus_ID, formData) =>
    async (dispatch) => {
      try {
        const employee = await updateEmployee(
          Cus_ID, formData
        );
        console.log(employee);
        if (employee.status === "ok") {
          dispatch(GetAllEmployee());
          Swal.fire("Success", employee.message, "success");
          return true;
        } else {
          Swal.fire("Error", employee.message, "error");
          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const CreateEmployee =
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

      const employee = await createEmployee(data);
      if (employee.status === "ok") {
        dispatch(GetAllEmployee());
        Swal.fire("Success", employee.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", employee.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };