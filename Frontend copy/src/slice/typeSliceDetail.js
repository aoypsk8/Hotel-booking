import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeDetail: [],
  loadding: false,
  error: null,
};

const typeDetailSlice = createSlice({
  name: "typeDetail",
  initialState,
  reducers: {
    addTypeDetail: (state, action) => {
      state.typeDetail = action.payload;
    },
    clearTypeDetail: (state) => {
      state.typeDetail = [];
    },
  },
});

export const { addTypeDetail,clearTypeDetail } = typeDetailSlice.actions;
export default typeDetailSlice.reducer;