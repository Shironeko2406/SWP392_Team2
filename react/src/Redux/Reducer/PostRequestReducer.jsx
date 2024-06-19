import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_AUTHOR, getDataTextStorage } from "../../Utils/UtilFuction";

const initialState = {
  postListUserLogin: []
};

const PostRequestReducer = createSlice({
  name: "PostRequestReducer",
  initialState,
  reducers: {
    getPostListUserLogin: (state, action) => {
      state.postListUserLogin = action.payload;
    },
  },
});

export const { getPostListUserLogin } = PostRequestReducer.actions;

export default PostRequestReducer.reducer;

//--------------Call API post request-------------
export const CreatePostActionAsync = (postData) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        "https://tutorlinkproject.azurewebsites.net/PostRequest/add-post-request",
        // "https://localhost:7194/PostRequest/add-post-request",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetPostListUserLoginActionAsync = () => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.get(
        "https://tutorlinkproject.azurewebsites.net/PostRequest/post-request-user-login",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const action = getPostListUserLogin(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
