import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  HOST_DOMAIN,
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
  setDataTextStorage,
} from "../../Utils/UtilFuction";
import { message } from "antd";

const initialState = {
  tokenUser: getDataTextStorage(TOKEN_AUTHOR),
  userLogin: getDataJSONStorage(USER_LOGIN),
  userList: [],
  userProfile: {},
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    getTokenAction: (state, action) => {
      state.tokenUser = action.payload;
    },
    getUserLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserListAction: (state, action) => {
      state.userList = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { getTokenAction, getUserLoginAction, setUserListAction, setUserProfile } =
  UserReducer.actions;

export default UserReducer.reducer;

//-----------API Call-------------
export const RegisterUserActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/Account/add-account`,
        dataUser
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
};

export const LoginActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        // "https://tutorlinkproject.azurewebsites.net/api/Auth/login",
        `${HOST_DOMAIN}/api/Auth/login`,
        dataUser
      );
      console.log(res.data.data.accessTokenToken);

      const token = res.data.data.accessTokenToken;
      setDataTextStorage(TOKEN_AUTHOR, token);
      const user = jwtDecode(token);
      setDataTextStorage(USER_LOGIN, JSON.stringify(user));

      const action1 = getTokenAction(token);
      const action2 = getUserLoginAction(user);
      dispatch(action1);
      dispatch(action2);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetUserManageActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${HOST_DOMAIN}/Account/list`);

      const action = setUserListAction(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const DeleteUserByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${HOST_DOMAIN}/Account/delete/${id}`, id);
      console.log(res.data);
      const action = GetUserManageActionAsync();
      dispatch(action);
      message.success("Success!");
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetUserProfileActionAsync = () => {
  return async (dispatch) => {
    try {
      const user = getDataJSONStorage(USER_LOGIN)
      const res = await axios.get(`${HOST_DOMAIN}/Account/get/${user.UserId}`);

      const action = setUserProfile(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const UpdateUserProfileByIdActionAsync = (id, dataUpdate) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${HOST_DOMAIN}/Account/update/${id}`, dataUpdate);
      console.log(res)

      const action = GetUserProfileActionAsync();
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};