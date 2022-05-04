import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },

    logout(state) {
      state.user = null;
    },
  },
});

export default UserSlice;
