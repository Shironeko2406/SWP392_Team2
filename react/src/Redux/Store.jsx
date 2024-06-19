import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";
import PostRequestReducer from "./Reducer/PostRequestReducer";
import TutorReducer from "./Reducer/TutorReducer";

export const store = configureStore({
  reducer: {
    UserReducer, PostRequestReducer, TutorReducer
  },
});
