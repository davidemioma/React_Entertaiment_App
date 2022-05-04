import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user-slice";
import SearchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    search: SearchSlice.reducer,
  },
});

export const { login, logout } = UserSlice.actions;

export const { setSearchValue } = SearchSlice.actions;

export default store;
