import { createSlice } from "@reduxjs/toolkit";
import { HOST_DOMAIN, TOKEN_AUTHOR, getDataTextStorage } from "../../Utils/UtilFuction";

const initialState = {
  postListUserLogin: [],
  postById: {},
};

const PostRequestReducer = createSlice({
  name: "PostRequestReducer",
  initialState,
  reducers: {
    setPostListUserLogin: (state, action) => {
      state.postListUserLogin = action.payload;
    },
    setPostById: (state, action) => {
      state.postById = action.payload;
    },
    resetPostByIdAction: (state) => {
      state.postById = [];
    },
  },
});

export const { setPostListUserLogin, setPostById, resetPostByIdAction } =
  PostRequestReducer.actions;

export default PostRequestReducer.reducer;

//--------------Call API post request-------------
export const CreatePostActionAsync = (postData) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        // "https://tutorlinkproject.azurewebsites.net/PostRequest/add-post-request",
        `${HOST_DOMAIN}/PostRequest/add-post-request`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const action = GetPostListUserLoginActionAsync();
      dispatch(action);
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
        // "https://tutorlinkproject.azurewebsites.net/PostRequest/post-request-user-login",
        `${HOST_DOMAIN}/PostRequest/post-request-user-login`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const action = setPostListUserLogin(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const DeletePostByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.delete(
        `${HOST_DOMAIN}/PostRequest/post-request-postId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const action = GetPostListUserLoginActionAsync();
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPostRequestByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/PostRequest/post-request-id/${id}`
      );
      console.log(res.data);
      const action = setPostById(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePostByIdActionAsync = (id, dataUpdate) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.put(
        `${HOST_DOMAIN}/PostRequest/update-post-request/${id}`,
        dataUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const action = GetPostListUserLoginActionAsync();
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
