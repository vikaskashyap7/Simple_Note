// redux/boolSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNoteSaved: false, // Initial boolean value
};

const toggleSlice = createSlice({
  name: "bool",
  initialState,
  reducers: {
    toggleNoteSaved: (state) => {
      state.isNoteSaved = !state.isNoteSaved; // Toggle boolean value
    },
    setNoteSaved: (state, action) => {
      state.isNoteSaved = action.payload; // Set boolean value based on payload
    },
  },
});

export const { toggleNoteSaved, setNoteSaved } = toggleSlice.actions;
export const toggleReducer = toggleSlice.reducer;
