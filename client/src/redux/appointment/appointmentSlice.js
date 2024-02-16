import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAppointments: [],
};

const userSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    getAppointmentSuccess: (state, action) => {
      state.currentAppointments = action.payload;
    },
  },
});

export const { getAppointmentSuccess } = userSlice.actions;

export default userSlice.reducer;
