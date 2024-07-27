import axios from "axios";
import { BASE_URL } from "../api";
export const getAllEquipment = async () => {
  const response = await axios.get(`${BASE_URL}/equipment`);
  console.log(`response ${response}`);
  return response.data;
};

export const deleteEquipment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/equipment/${id}`);
  console.log(response);
  return response.data;
};

export const createEquipment = async ( selectedName, selectedAmount, selectedPrice) => {
  const response = await axios.post(
    `${BASE_URL}/equipment`,
    {
      "EquipmentName": selectedName,
      "price": selectedAmount,
      "amount": selectedPrice
    }
  );
  console.log(response.data);

  return response.data;
};

export const updateQuipment = async (
  EquipmentID, selectedName, selectedAmount, selectedPrice
) => {
  const response = await axios.put(
    `${BASE_URL}/equipment/${EquipmentID}`,
    {
      "EquipmentName": selectedName,
      "price": selectedAmount,
      "amount": selectedPrice
    }
  );
  console.log(response);
  console.log(response.data);

  return response.data;
};
