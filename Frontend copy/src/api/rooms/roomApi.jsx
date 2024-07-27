import axios from "axios";
import { BASE_URL } from "../api";
export const getAllRoom = async () => {
  const response = await axios.get(`${BASE_URL}/rooms`);
  console.log(`response ${response}`);
  return response.data;
};
export const getAllRoomWhereType = async (Type_ID) => {
  const response = await axios.get(`${BASE_URL}/rooms/${Type_ID}`);
  console.log(`response ${response}`);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await axios.delete(`${BASE_URL}/rooms/${id}`);
  console.log(response);
  return response.data;
};

export const createRoom= async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/rooms`,
    formData,
  );
  console.log(response.data);

  return response.data;
};

export const updateRoom = async (
  Room_ID, formData
) => {
  const response = await axios.put(
    `${BASE_URL}/rooms/${Room_ID}`,
    formData,
  );
  console.log(response);
  console.log(response.data);

  return response.data;
};

export const updateRoomStatus = async (
  Room_ID, status
) => {
   // Show loading popup
   const response = await axios.put(
    `${BASE_URL}/roomsStatus/${Room_ID}`,
    {
      "Status": status
    }
  );

  return response.data;
};
