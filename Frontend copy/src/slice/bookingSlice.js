import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: [],
  loadding: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.booking = action.payload;
    },

  },
});

export const { addBooking, } = bookingSlice.actions;
export default bookingSlice.reducer;