import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_AUTHOR, setDataTextStorage } from "../../Utils/UtilFuction";

const initialState = {
  tokenUser: [],
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    getTokenAction: (state, action) => {
      state.tokenUser = action.payload
    },
  },
});

export const {getTokenAction} = UserReducer.actions;

export default UserReducer.reducer;

//-----------API Call-------------
export const LoginActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('https://tutorlinkproject.azurewebsites.net/api/Auth/login', dataUser)
      console.log(res.data.data.accessTokenToken)
      
      setDataTextStorage(TOKEN_AUTHOR, res.data.data.accessTokenToken);
      const action = getTokenAction(res.data.data.accessTokenToken)
      
      dispatch(action)
    } catch (error) {
      console.error(error)
    }
  };
};
