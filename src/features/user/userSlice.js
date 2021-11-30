import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRoutes from "../../api";

export const getUsers = createAsyncThunk(
  "user/get",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiRoutes.get("/users");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setUsers } = userSlice.actions;

export const userSelector = (state) => state.user.users;

export default userSlice.reducer;
