import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pay: [],
  loadding: false,
  error: null,
};

const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    addPay: (state, action) => {
      state.pay = action.payload;
    },

  },
});

export const { addPay, } = paySlice.actions;
export default paySlice.reducer;