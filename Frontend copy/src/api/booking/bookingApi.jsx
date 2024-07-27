import axios from "axios";
import { BASE_URL } from "../api";
export const getAllBooking = async () => {
  const response = await axios.get(`${BASE_URL}/booking`);
  console.log(`response ${response}`);
  return response.data;
};
export const getAllHistory = async (id) => {
  const response = await axios.get(`${BASE_URL}/history/${id}`);
  console.log(`response ${response}`);
  return response.data;
};

export const getAllPay = async () => {
  const response = await axios.get(`${BASE_URL}/payment`);
  console.log(`response ${response}`);
  return response.data;
};

export const getAllBookingWait = async () => {
  const response = await axios.get(`${BASE_URL}/bookingWait`);
  console.log(`response ${response}`);
  return response.data;
};
export const getAllBookingWaitCheckIn = async () => {
  const response = await axios.get(`${BASE_URL}/bookingWaitCheckIn`);
  console.log(`response ${response}`);
  return response.data;
};
export const getAllBookingWaitCheckOut = async () => {
  const response = await axios.get(`${BASE_URL}/bookingWaitCheckOut`);
  console.log(`response ${response}`);
  return response.data;
};
// export const deleteRoom = async (id) => {
//   const response = await axios.delete(`${BASE_URL}/rooms/${id}`);
//   console.log(response);
//   return response.data;
// };

export const createBooking = async (Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status) => {
  const response = await axios.post(
    `${BASE_URL}/booking`,
    {
      "Type_ID": Type_ID,
      "Cus_ID": Cus_ID,
      "Type_Booking": Type_Booking,
      "Check_IN": Check_IN,
      "Check_OUT": Check_OUT,
      "Status": Status
    }
  );
  console.log(response.data);

  return response.data;
};

export const updateBooking = async (
  Booking_ID, Room_ID, Status
) => {
  const response = await axios.put(
    `${BASE_URL}/booking/${Booking_ID}`,
    {
      "Room_ID": Room_ID,
      "Status": Status
    }

  );
  console.log(response);
  console.log(response.data);

  return response.data;
};

export const updateBookingStatus = async (
  Booking_ID, Status
) => {
  const response = await axios.put(
    `${BASE_URL}/bookingStatus/${Booking_ID}`,
    {
      "Status": Status
    }

  );
  console.log(response);
  console.log(response.data);

  return response.data;
};




export const updateBookingStatusCheckOut = async (
  Booking_ID, updatedData
) => {
  console.log(Booking_ID);
  console.log(updatedData.Status);
  const equipmentIds = updatedData.equipmentIds.map(equipment => equipment.EquipmentID);

  // Prepare the data to be sent
  const dataToSend = {
    Status: updatedData.Status,
    equipmentIds: equipmentIds
  };
  const response = await axios.put(
    `${BASE_URL}/bookingStatusCheckOut/${Booking_ID}`,
    dataToSend


  );
  console.log(response);
  console.log(response.data);

  return response.data;
};

