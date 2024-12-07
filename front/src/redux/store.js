import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"
import postsReducer from "./postsSlices"
export const  store = configureStore({
  reducer : {
    users: usersReducer,
    posts: postsReducer,
  }
})
