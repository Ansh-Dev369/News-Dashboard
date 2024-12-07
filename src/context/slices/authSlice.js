import { createSlice } from "@reduxjs/toolkit";

// initial state for the auth slice
const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducer to set the user
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    // reducer to set the loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // reducer to clear the user
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, clearUser } = authSlice.actions;
export default authSlice.reducer;
