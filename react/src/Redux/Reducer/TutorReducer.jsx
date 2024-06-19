import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    testField: null
};

const TutorReducer = createSlice({
  name: "TutorReducer",
  initialState,
  reducers: {},
});

export const {} = TutorReducer.actions;

export default TutorReducer.reducer;

//---------API call-------------
export const RegisterTuTorActionAsync = (dataUser) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          "https://tutorlinkproject.azurewebsites.net/Tutor/add-tutor",
          dataUser, {
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        console.log(res)
      } catch (error) {
        console.error(error);
      }
    };
  };
