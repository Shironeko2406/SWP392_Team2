import { createSlice } from "@reduxjs/toolkit";
import { getDataJSONStorage, HOST_DOMAIN, USER_LOGIN } from "../../Utils/UtilFuction";
import { message } from "antd";

const initialState = {
  tutorList: [],
  tutorProfile: {},
  viewTutorId: {},
};

const TutorReducer = createSlice({
  name: "TutorReducer",
  initialState,
  reducers: {
    setTutorList: (state, action) => {
      state.tutorList = action.payload;
    },
    setTutorProfile: (state, action)=>{
      state.tutorProfile = action.payload
    },
    setViewTutorId: (state, action)=>{
      state.viewTutorId = action.payload
    },
    resetViewTutorId: (state)=>{
      state.viewTutorId = {}
    }
  },
});

export const { setTutorList, setTutorProfile, setViewTutorId, resetViewTutorId } = TutorReducer.actions;

export default TutorReducer.reducer;

//---------API call-------------
export const RegisterTuTorActionAsync = (dataUser, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${HOST_DOMAIN}/Tutor/add-tutor`, dataUser, {
        headers: {
          "content-Type": "application/json",
        },
      });
      console.log(res);
      message.success("Register tutor success");
      navigate("/")
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

export const GetTutorProfileActionAsync = () => {
  return async (dispatch) => {
    try {
      const tutor = getDataJSONStorage(USER_LOGIN)
      const res = await axios.get(`${HOST_DOMAIN}/Tutor/tutor-by-id/${tutor.UserId}`);

      const action = setTutorProfile(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const UpdateTutorProfileByIdActionAsync = (id, dataUpdate) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${HOST_DOMAIN}/Tutor/update-tutor/${id}`, dataUpdate);
      console.log(res)

      const actionAsync = GetTutorProfileActionAsync();
      dispatch(actionAsync);
      message.success("Update profile success!");
    } catch (error) {
      console.error(error);
    }
  };
};

export const ViewTutorByIdActionAsync = (tutorId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${HOST_DOMAIN}/Tutor/tutor-by-id/${tutorId}`);

      const action = setViewTutorId(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};