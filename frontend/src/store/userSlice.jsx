import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    currentUserData: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentUserData: (state, action) => {
      state.currentUserData = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserData } = userSlice.actions;
export default userSlice.reducer;
