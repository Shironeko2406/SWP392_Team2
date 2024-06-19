import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
  setDataJSONStorage,
  setDataTextStorage,
} from "../../Utils/UtilFuction";

const initialState = {
  tokenUser: getDataTextStorage(TOKEN_AUTHOR),
  userLogin: getDataJSONStorage(USER_LOGIN),
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
  },
});

export const { getTokenAction, getUserLoginAction } = UserReducer.actions;

export default UserReducer.reducer;

//-----------API Call-------------
export const RegisterUserActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://tutorlinkproject.azurewebsites.net/Account/add-account",
        dataUser
      );
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };
};

export const LoginActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "https://tutorlinkproject.azurewebsites.net/api/Auth/login",
        // "https://localhost:7194/api/Auth/login",
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
