import { createSlice } from "@reduxjs/toolkit";
import { HOST_DOMAIN } from "../../Utils/UtilFuction";

const initialState = {
  roleList: [],
};

const RoleReducer = createSlice({
  name: "RoleReducer",
  initialState,
  reducers: {
    setRoleList: (state, action) => {
      state.roleList = action.payload;
    },
  },
});

export const {setRoleList} = RoleReducer.actions;

export default RoleReducer.reducer;
//---------API cal----------
export const GetRoleManageActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${HOST_DOMAIN}/Role/roles`);
      console.log(res.data);
      const action = setRoleList(res.data)
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
