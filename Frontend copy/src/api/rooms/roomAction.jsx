// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createUnit, deleteRoom, getAllRoom } from "./roomApi";
import { addRoom } from "../../slice/roomSlice";


export const GetAllRoom = () => async (dispatch) => {
  try {
    const room = await getAllRoom();
    console.log(room);
    if (room.status == "ok") {
      dispatch(addRoom(room.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const DeleteRoom = async (id) => {
  try {
    const room = await deleteRoom(id);
    if (room.status === "ok") {
      Swal.fire("success", room.message, "success");
      dispatch(GetAllRoom());
      return true;
    } else {
      Swal.fire(room.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const CreateUnit = async (unit_n) => {
  try {

    const unit = await createUnit(unit_n);
    if (unit.status == "ok") {
      return { message: unit.message, success: true };
    } else {
      return { message: unit.message, success: false };
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};