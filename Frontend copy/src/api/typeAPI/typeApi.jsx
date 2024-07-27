import axios from "axios";
import { BASE_URL } from "../api";

export const getAllType = async () => {
  const response = await axios.get(`${BASE_URL}/type`);
  console.log(`response ${response}`);

  return response.data;
};

export const search = async (fromDate, toDate, typeroom_id) => {
  const response = await axios.post(`${BASE_URL}/searchAvailableRooms`, {
    "fromDate": fromDate,
    "toDate": toDate,
    "typeRoom_ID": typeroom_id
  }
  );
  console.log(`response ${response.data}`);

  return response.data;
};

export const createType = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/type/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);

  return response.data;
};
export const deleteType = async (id) => {
  const response = await axios.delete(`${BASE_URL}/type/${id}`);
  return response.data;
};

export const updateType = async (
  Type_ID, formData
) => {
  const response = await axios.put(
    `${BASE_URL}/type/${Type_ID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);

  return response.data;
};
