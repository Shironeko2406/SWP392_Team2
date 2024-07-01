import { createSlice } from "@reduxjs/toolkit";
import { HOST_DOMAIN } from "../../Utils/UtilFuction";

const initialState = {
  tutorList: [],
};

const TutorReducer = createSlice({
  name: "TutorReducer",
  initialState,
  reducers: {
    setTutorList: (state, action) => {
      state.tutorList = action.payload;
    },
  },
});

export const { setTutorList } = TutorReducer.actions;

export default TutorReducer.reducer;

//---------API call-------------
export const RegisterTuTorActionAsync = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${HOST_DOMAIN}/Tutor/add-tutor`, dataUser, {
        headers: {
          "content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetTutorListManageActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${HOST_DOMAIN}/Tutor/tutors`);
      const action = setTutorList(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
