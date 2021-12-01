import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRoutes from "../../api";

export const getPosts = createAsyncThunk(
  "posts/get",
  async (page = 1, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true));
    try {
      const responsePost = await apiRoutes.get("/posts", {
        params: {
          _page: page,
          _limit: 15,
        },
      });
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
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      dispatch(setLoading(false));

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

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await apiRoutes.delete("/comments", id);
      return id;
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
    page: 0,
    loading: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = state.page + 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      if (!state.loading) {
        state.posts = [...state.posts, ...action.payload];
      }
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((v) => v.post.id !== action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((v) => v.id !== action.payload);
    });
  },
});

export const {
  setPosts,
  setComments,
  addPost,
  addComment,
  setPage,
  setLoading,
} = postSlice.actions;

export const postSelector = (state) => state.post.posts;
export const commentSelector = (state) => state.post.comments;
export const pageSelector = (state) => state.post.page;
export const loadingSelector = (state) => state.post.loading;

export default postSlice.reducer;
