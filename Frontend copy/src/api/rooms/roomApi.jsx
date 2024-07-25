import axios from "axios";
import { BASE_URL } from "../api";
export const getAllRoom = async () => {
  const response = await axios.get("http://localhost:3000/api/rooms");
  console.log(`response ${response}`);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await axios.delete(`${BASE_URL}/rooms/${id}`);
  return response.data;
};
export const createUnit = async (unit_n) => {
  console.log(unit_n);
  try {
    const response = await axios.post(`http://localhost:3000/api/unit/create`,
      {
        data: unit_n,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`error ${error.data}`);
  }
};
