import { createSlice } from '@reduxjs/toolkit'
import { HOST_DOMAIN } from '../../Utils/UtilFuction';
import { GetTutorProfileActionAsync } from './TutorReducer';
import { message } from 'antd';

const initialState = {

}

const QualificationReducer = createSlice({
  name: "QualificationReducer",
  initialState,
  reducers: {}
});

export const {} = QualificationReducer.actions

export default QualificationReducer.reducer
//---------API Call-----------
export const AddQualificationActionAsync = (tutorId, data) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          `${HOST_DOMAIN}/Qualification/add-qualification-for-tutor?tutorId=${tutorId}`,
          data
        );
        console.log(res.data);
        message.success(`${res.data}`);
        const actionAsync = GetTutorProfileActionAsync();
        dispatch(actionAsync);
      } catch (error) {
        console.error(error);
      }
    };
  };