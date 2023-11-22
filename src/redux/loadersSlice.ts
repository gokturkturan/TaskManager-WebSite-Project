import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loaders",
  initialState: { loading: false },
  reducers: {
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { SetLoading } = loaderSlice.actions;
