import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  equipment: [],
  loadding: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    addEquipment: (state, action) => {
      state.equipment = action.payload;
    },
  },
});

export const { addEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;