import { createSlice } from "@reduxjs/toolkit";
import {
  HOST_DOMAIN,
  TOKEN_AUTHOR,
  getDataTextStorage,
} from "../../Utils/UtilFuction";

const initialState = {
  postListUserLogin: [
    {
      postId: "efaac2b4-f5fe-4305-ae80-342296d8072a",
      description: "Tìm gia sư kèm thái lan lan lan",
      location: "quan 3",
      schedule: "3 session/week",
      preferredTime: "2h",
      mode: 0,
      gender: 2,
      status: 0,
      requestSkill: "ielts",
      createdBy: "545cae62-66ee-4c8f-aeee-a93d5164ff8e",
      createdDate: "2024-06-19T19:58:38",
      applies: [],
    },
    {
      postId: "51353f28-6dc6-4a86-8d4b-3c063c932ed7",
      description: "Tìm gia sư kèm tiếng anh",
      location: "quan 3",
      schedule: "3 session/week",
      preferredTime: "2hour",
      mode: 0,
      gender: 1,
      status: 0,
      requestSkill: "ielts 7.",
      createdBy: "9ef8c67c-5bf6-4093-ba63-0d820ff38978",
      createdDate: "2024-06-25T23:40:38",
      applies: [],
    },
  ],
  postById: {},
  postListPending: [],
  postList:[],
  postListUserId: [],
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
    setPostListPending: (state, action) => {
      state.postListPending = action.payload;
    },
    setPostList: (state, action)=>{
      state.postList = action.payload
    },
    setPostListUserId: (state, action)=>{
      state.postListUserId = action.payload
    }
  },
});

export const {
  setPostListUserLogin,
  setPostById,
  resetPostByIdAction,
  setPostListPending,
  setPostList,
  setPostListUserId,
} = PostRequestReducer.actions;

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

export const GetPostListPendingActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        // "https://tutorlinkproject.azurewebsites.net/PostRequest/post-request-user-login",
        `${HOST_DOMAIN}/PostRequest/post-requests`
      );
      const filteredData = res.data.filter((post) => post.status === 0);
      const action = setPostListPending(filteredData);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetPostListActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        // "https://tutorlinkproject.azurewebsites.net/PostRequest/post-request-user-login",
        `${HOST_DOMAIN}/PostRequest/post-requests`
      );
      const action = setPostList(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetPostListUserByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        // "https://tutorlinkproject.azurewebsites.net/PostRequest/post-request-user-login",
        `${HOST_DOMAIN}/PostRequest/post-request-user/${id}`
      );
      const action = setPostListUserId(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
