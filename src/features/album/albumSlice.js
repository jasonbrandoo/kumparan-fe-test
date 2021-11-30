import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRoutes from "../../api";

export const getAlbums = createAsyncThunk(
  "album/get",
  async (data, { rejectWithValue }) => {
    try {
      const responseAlbum = await apiRoutes.get("/albums");
      const responseUser = await apiRoutes.get("/users");
      const data = responseUser.map((responseValue) => {
        const albumValue = responseAlbum.find(
          (albumValue) => albumValue.userId === responseValue.id
        );
        return {
          album: { ...albumValue },
          user: { ...responseValue },
        };
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPhotos = createAsyncThunk(
  "photos/get",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await apiRoutes.get("/photos", {
        params: {
          albumId,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const albumSlice = createSlice({
  name: "albumSlice",
  initialState: {
    albums: [],
    photos: [],
  },
  reducers: {
    setAlbum: (state, action) => {
      state.albums = action.payload;
    },
    setPhoto: (state, action) => {
      state.photos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos = action.payload;
    });
  },
});

export const { setAlbum, setPhoto } = albumSlice.actions;

export const albumSelector = (state) => state.album.albums;
export const photoSelector = (state) => state.album.photos;

export default albumSlice.reducer;
