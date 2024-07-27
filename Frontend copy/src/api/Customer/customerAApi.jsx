import axios from "axios";
import { BASE_URL } from "../api";
export const getAllCustomerA = async () => {
  const response = await axios.get(`${BASE_URL}/customers`);
  console.log(`response ${response}`);
  return response.data;
};

export const deleteCustomerA = async (id) => {
  const response = await axios.delete(`${BASE_URL}/customers/${id}`);
  console.log(response);
  return response.data;
};

export const createCustomerA = async (formData) => {
  const response = await axios.post(
    `${BASE_URL}/customers/create`,
    formData,
  );
  console.log(response.data);

  return response.data;
};

export const updateCustomerA = async (
  Cus_ID, formData
) => {
  const response = await axios.put(
    `${BASE_URL}/customers/${Cus_ID}`,
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
