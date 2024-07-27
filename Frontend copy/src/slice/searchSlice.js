import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
  loadding: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },

  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;