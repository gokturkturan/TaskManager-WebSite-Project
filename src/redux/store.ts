import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loadersSlice";
import { usersSlice } from "./usersSlice";

const store = configureStore({
  reducer: {
    loaders: loaderSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
