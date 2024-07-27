// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createRoom, deleteRoom, getAllRoom, updateRoom } from "./roomApi";
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

export const DeleteRoom = (id) => async (dispatch) => {
  try {
    console.log(id);
    const room = await deleteRoom(id);
    console.log(room);
    console.log(room);
    console.log(room.status);
    if (room.status === "ok") {
      Swal.fire("success", room.message, "success");
      dispatch(GetAllRoom());
      return true;
    } else {
      Swal.fire(room.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message);
    return false;
  }
};


export const UpdateRoom =
  (data, Room_ID) =>
    async (dispatch) => {
      try {
        // Show loading popup
        const room = await updateRoom(
          Room_ID, data
        );
        console.log(room);
        if (room.status === "ok") {
          dispatch(GetAllRoom());
          Swal.fire("Success", room.message, "success");
          return true;
        } else {
          Swal.fire("Error", room.message, "error");
          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const CreateRoom =
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

      const room = await createRoom(data);
      if (room.status === "ok") {
        dispatch(GetAllRoom());
        Swal.fire("Success", room.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", room.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };