import axios from "axios";
import { BASE_URL } from "../api";
export const getAllEmployee = async () => {
  const response = await axios.get(`${BASE_URL}/employees`);
  console.log(`response ${response}`);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/employees/${id}`);
  console.log(response);
  return response.data;
};

export const createEmployee = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/employees/registerUser`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateEmployee = async (
  Cus_ID, formData
) => {
  const response = await axios.put(
    `${BASE_URL}/employees/${Cus_ID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response);
  console.log(response.data);

  return response.data;
};
