import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRoutes from "../../api";

export const getPosts = createAsyncThunk(
  "posts/get",
  async (data, { rejectWithValue }) => {
    try {
      const responsePost = await apiRoutes.get("/posts");
      const responseUser = await apiRoutes.get("/users");
      const data = responsePost.map((postValue) => {
        const userValue = responseUser.find(
          (userValue) => userValue.id === postValue.userId
        );
        return {
          user: { ...userValue },
          post: { ...postValue },
        };
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/get",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await apiRoutes.get("/comments", {
        params: {
          postId,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await apiRoutes.delete("/posts", postId);
      console.log(response);
      return postId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: [],
    comments: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((v) => v.post.id !== action.payload);
    });
  },
});

export const { setPosts, addPost } = postSlice.actions;

export const postSelector = (state) => state.post.posts;
export const commentSelector = (state) => state.post.comments;

export default postSlice.reducer;
