import { createSlice } from "@reduxjs/toolkit";
import { HOST_DOMAIN } from "../../Utils/UtilFuction";
import { GetPostListActionAsync, setPostList } from "./PostRequestReducer";
import { message } from "antd";

const initialState = {
  applyList: [],
};

const ApplyReducer = createSlice({
  name: "ApplyReducer",
  initialState,
  reducers: {
    setApplyList: (state, action) => {
      state.applyList = action.payload;
    },
  },
});

export const { setApplyList } = ApplyReducer.actions;

export default ApplyReducer.reducer;
//-------API Call------------

export const ApplyPostRequestActionAsync = (tutorId, postId, dataApply) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/api/apply/${tutorId}/${postId}`,
        dataApply
      );
      console.log(res.data);
      message.success("Apply Success!");
      const actionAsync = GetPostListActionAsync();
      dispatch(actionAsync);
    } catch (error) {
      console.error(error);
    }
  };
};
