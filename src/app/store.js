import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "../features/album/albumSlice";
import menuReducer from "../features/menu/menuSlice";
import postReducer from "../features/post/postSlice";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    post: postReducer,
    user: userSlice,
    album: albumSlice,
  },
});
