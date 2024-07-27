// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { createRoom, deleteRoom, getAllRoom, updateRoom } from "./roomApi";
// import { addRoom } from "../../slice/roomSlice";
import { createBooking, getAllBooking, getAllBookingWait, getAllBookingWaitCheckIn, getAllBookingWaitCheckOut, getAllHistory, updateBooking, updateBookingStatus, updateBookingStatusCheckOut,getAllPay } from "./bookingApi";
import { addHistory } from "../../slice/historySlice";
import { addBooking } from "../../slice/bookingSlice";
import { UpdateRoomStatus } from "../rooms/roomAction";
import { addPay } from "../../slice/paySlice ";


export const GetAllPay = () => async (dispatch) => {
  try {
    const booking = await getAllPay();
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addPay(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const GetAllHistory = (id) => async (dispatch) => {
  try {
    const booking = await getAllHistory(id);
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addHistory(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
export const GetAllBookin = () => async (dispatch) => {
  try {
    const booking = await getAllBooking();
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addBooking(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const GetAllBookingWait = () => async (dispatch) => {
  try {
    const booking = await getAllBookingWait();
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addBooking(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
export const GetAllBookingWaitCheckIn = () => async (dispatch) => {
  try {
    const booking = await getAllBookingWaitCheckIn();
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addBooking(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
export const GetAllBookingWaitCheckOut = () => async (dispatch) => {
  try {
    const booking = await getAllBookingWaitCheckOut();
    console.log(booking);
    if (booking.status == "ok") {
      dispatch(addBooking(booking.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const UpdateBooking =
  (Booking_ID, Room_ID, Status) =>
    async (dispatch) => {
      try {
        // Show loading popup
        const booking = await updateBooking(
          Booking_ID, Room_ID, Status
        );
        if (booking.status === "ok") {
          dispatch(UpdateRoomStatus(Room_ID, 0));
          dispatch(GetAllBookingWait());
          return true;
        } else {

          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const UpdateBookingCheckIn =
  (Booking_ID, updatedData) =>
    async (dispatch) => {
      try {
        // Show loading popup
        const booking = await updateBookingStatus(
          Booking_ID, updatedData
        );
        if (booking.status === "ok") {
          dispatch(GetAllBookingWait());
          return true;
        } else {

          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const UpdateBookingCheckOut =
  (Room_ID, Booking_ID, updatedData) =>

    async (dispatch) => {
      try {
        console.log(Room_ID);
        console.log(Booking_ID);
        console.log(updatedData);
        // Show loading popup
        const booking = await updateBookingStatusCheckOut(
          Booking_ID, updatedData
        );
        if (booking.status === "ok") {
          dispatch(UpdateRoomStatus(Room_ID, 1));
          dispatch(GetAllBookingWaitCheckOut());
          return true;
        } else {

          return false;
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };

export const CreateBooking =
  (Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status) => async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const room = await createBooking(Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status);
      if (room.status === "ok") {
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