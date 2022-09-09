import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  completed: "",
  color: "",
};

const statusFilterSlice = createSlice({
  name: "statusFilter",
  initialState,
  reducers: {
    statusChange: (state, action) => {
      state.completed = action.payload;
    },
    colorChange: (state, action) => {
      state.color = action.payload;
    },
  },
});
export default statusFilterSlice.reducer;
export const { statusChange, colorChange } = statusFilterSlice.actions;
