import { createSlice } from "@reduxjs/toolkit";
import {
  getDataJSONStorage,
  HOST_DOMAIN,
  USER_LOGIN,
} from "../../Utils/UtilFuction";
import { message } from "antd";

const initialState = {
  dataAppointment: {},
  appointmentListByUserId: [],
  appointmentListByTutorId: [],
  appointmentList: [],
};

const AppointmentReducer = createSlice({
  name: "AppointmentReducer",
  initialState,
  reducers: {
    setDataAppointment: (state, action) => {
      state.dataAppointment = action.payload;
    },
    setAppointmentListByUserId: (state, action) => {
      state.appointmentListByUserId = action.payload;
    },
    setAppointmentListByTutorId: (state, action) => {
      state.appointmentListByTutorId = action.payload;
    },
    setAppointmentList: (state, action) => {
      state.appointmentList = action.payload;
    },
  },
});

export const {
  setDataAppointment,
  setAppointmentListByUserId,
  setAppointmentListByTutorId,
  setAppointmentList,
} = AppointmentReducer.actions;

export default AppointmentReducer.reducer;

//----------API call-----------
export const CreateAppointmentActionAsync = (form, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/AppointmentFeedback/book-appointment`,
        form
      );
      console.log(res.data);

      message.success(`${res.data.message}`);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(
          "You cannot set a calendar smaller than the current date"
        );
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };
};

export const GetAppointmentListByUserIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/AppointmentFeedback/appointments/account/${id}`
      );

      const action = setAppointmentListByUserId(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetAppointmentListByTutorIdActionAsync = () => {
  return async (dispatch) => {
    try {
      const user = getDataJSONStorage(USER_LOGIN);

      const res = await axios.get(
        `${HOST_DOMAIN}/AppointmentFeedback/appointments/tutor/${user.UserId}`
      );
      const action = setAppointmentListByTutorId(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const ConfirmAppointmentActionAsync = (
  tutorId,
  appointmentId,
  canToGo
) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/AppointmentFeedback/handle-tutor-confirmation?tutorId=${tutorId}&appointmentId=${appointmentId}&canGoToAppointment=${canToGo}`
      );
      const action = GetAppointmentListByTutorIdActionAsync(res.data);
      dispatch(action);
      message.success(`${res.data}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetAppointmentActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/AppointmentFeedback/appointments`
      );

      const action = setAppointmentList(res.data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
