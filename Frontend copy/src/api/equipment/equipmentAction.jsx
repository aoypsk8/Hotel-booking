// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { createRoom, deleteRoom, updateRoom } from "./roomApi";
import { addEquipment } from "../../slice/equipmentSlice";
import { createEquipment, deleteEquipment, getAllEquipment, updateQuipment } from "./equipmentApi";


export const GetAllEquipment = () => async (dispatch) => {
  try {
    const equipment = await getAllEquipment();
    console.log(equipment);
    if (equipment.status == "ok") {
      dispatch(addEquipment(equipment.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const DeleteEquipment = (id) => async (dispatch) => {
  try {
    console.log(id);
    const equipment = await deleteEquipment(id);
    console.log(equipment);
    console.log(equipment);
    console.log(equipment.status);
    if (equipment.status === "ok") {
      Swal.fire("success", equipment.message, "success");
      dispatch(GetAllEquipment());
      return true;
    } else {
      Swal.fire(room.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message);
    return false;
  }
};


export const UpdateEquipment =
  (EquipmentID, selectedName, selectedAmount, selectedPrice) =>
    async (dispatch) => {
      try {
        // Show loading popup
        const equipment = await updateQuipment(
          EquipmentID, selectedName, selectedAmount, selectedPrice
        );
        console.log(equipment);
        if (equipment.status === "ok") {
          dispatch(GetAllEquipment());
          Swal.fire("Success", equipment.message, "success");
          return true;
        } else {
          Swal.fire("Error", equipment.message, "error");
          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const CreateEquipment =
  (selectedName, selectedAmount, selectedPrice) => async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const equipment = await createEquipment( selectedName, selectedAmount, selectedPrice);
      if (equipment.status === "ok") {
        dispatch(GetAllEquipment());
        Swal.fire("Success", equipment.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", equipment.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };