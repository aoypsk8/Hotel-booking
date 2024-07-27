import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  loadding: false,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.history = action.payload;
    },

  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;