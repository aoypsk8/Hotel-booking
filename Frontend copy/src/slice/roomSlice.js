import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: [],
  loadding: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { addRoom } = roomSlice.actions;
export default roomSlice.reducer;