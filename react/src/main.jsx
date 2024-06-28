import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./User/Pages/Login.jsx";
import Register from "./User/Pages/Register.jsx";
import Home from "./User/Pages/Home.jsx";
import PostContent from "./User/Component/PostContent.jsx";
import UserDetail from "./User/Pages/UserDetail.jsx";
import AppointmentSchedule from "./User/Pages/AppoimentSchedule.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";
import FormTestKhac from "./User/Pages/FormTestKhac.jsx";
import RegisterTutor from "./Tutor/Pages/RegisterTutor.jsx";
import TuTorHome from "./Tutor/Pages/TuTorHome.jsx";
import TemplateUI from "./User/TempUIUser/TemplateUI.jsx";
import PostUserContent from "./User/Pages/PostUserContent.jsx";
import CreatePost from "./User/Component/Modal/CreatePost.jsx";
import TempUITutor from "./Tutor/TemplateUITutor/TempUITutor.jsx";
import TempAdmin from "./Admin/TempUIAdmin/TempAdmin.jsx";
import ManageUser from "./Admin/Pages/ManageUser.jsx";
import Form from "./Admin/Pages/Form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="" element={<Login></Login>} />
        <Route path="register" element={<Register />} />
        <Route path="register-tutor" element={<RegisterTutor />} />
        {/* <Route path="home" element={<Home></Home>}>
          <Route path="" element={<PostContent></PostContent>}></Route>
          <Route path="user-detail" element={<UserDetail></UserDetail>}></Route>
          <Route
            path="appointment-schedule"
            element={<AppointmentSchedule></AppointmentSchedule>}
          ></Route>
        </Route> */}
        <Route path="admin" element={<TempAdmin></TempAdmin>}>
          <Route path="" element={<ManageUser></ManageUser>}></Route>
          <Route path="form" element={<Form></Form>}></Route>
        </Route>
        <Route path="testForm" element={<FormTestKhac></FormTestKhac>} />
        <Route path="tutor" element={<TempUITutor></TempUITutor>} >
        <Route path="" element={<TuTorHome></TuTorHome>}></Route>
        </Route>
        <Route path="home" element={<TemplateUI></TemplateUI>}>
          <Route path="" element={<PostUserContent></PostUserContent>}></Route>
          <Route path="appointment-schedule" element={<AppointmentSchedule></AppointmentSchedule>}></Route>
          <Route path="user-detail" element={<UserDetail></UserDetail>}></Route>
        </Route>
        <Route path="testModal" element={<CreatePost></CreatePost>} />

      </Routes>
    </Provider>
  </BrowserRouter>
);
