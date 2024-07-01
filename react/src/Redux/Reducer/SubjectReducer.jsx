import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjectList: [
    { languageId: 1, languageName: "Japanese" },
    { languageId: 2, languageName: "Chinese" },
    { languageId: 3, languageName: "French" },
    { languageId: 4, languageName: "English" },
    { languageId: 5, languageName: "Korean" },
  ],
};

const SubjectReducer = createSlice({
  name: "SubjectReducer",
  initialState,
  reducers: {},
});

export const {} = SubjectReducer.actions;

export default SubjectReducer.reducer;
