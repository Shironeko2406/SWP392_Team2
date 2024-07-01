import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";
import PostRequestReducer from "./Reducer/PostRequestReducer";
import TutorReducer from "./Reducer/TutorReducer";
import RoleReducer from "./Reducer/RoleReducer";
import SubjectReducer from "./Reducer/SubjectReducer";

export const store = configureStore({
  reducer: {
    UserReducer,
    PostRequestReducer,
    TutorReducer,
    RoleReducer,
    SubjectReducer,
  },
});
