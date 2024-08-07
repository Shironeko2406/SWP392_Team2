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
import ManageTutor from "./Admin/Pages/ManageTutor.jsx";
import ManagePostByUser from "./Admin/Pages/ManagePostByUser.jsx";
import ManagePostPending from "./Admin/Pages/ManagePostPending.jsx";
import ManageSubject from "./Admin/Pages/ManageSubject.jsx";
import ManageRole from "./Admin/Pages/ManageRole.jsx";
import ManagePostDetailUser from "./Admin/Pages/ManagePostDetailUser.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TutorProfile from "./Tutor/Pages/TutorProfile.jsx";
import AdminProfile from "./Admin/Pages/AdminProfile.jsx";
import ViewTutor from "./User/Component/Modal/ViewTutor.jsx";
import CreateAppointment from "./User/Pages/CreateAppointment.jsx";
import AppointmentScheduleTutor from "./Tutor/Pages/AppointmentScheduleTutor.jsx";
import ManageAppointment from "./Admin/Pages/ManageAppointment.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={
      "1077302126764-5egr59hd2g3k5lqo3nl9stkrn6hko56v.apps.googleusercontent.com"
    }
  >
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="" element={<Login></Login>} />
          <Route path="register" element={<Register />} />
          <Route path="modal" element={<ViewTutor></ViewTutor>} />
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
            <Route path="appointment" element={<ManageAppointment></ManageAppointment>}></Route>
            <Route path="tutor" element={<ManageTutor></ManageTutor>}></Route>
            <Route
              path="post-by-user"
              element={<ManagePostByUser></ManagePostByUser>}
            ></Route>
            {/* <Route path="post-by-user/:id" element={<ManagePostDetailUser></ManagePostDetailUser>}></Route> */}
            <Route
              path=":id"
              element={<ManagePostDetailUser></ManagePostDetailUser>}
            ></Route>
            <Route
              path="pending"
              element={<ManagePostPending></ManagePostPending>}
            ></Route>
            <Route
              path="subject"
              element={<ManageSubject></ManageSubject>}
            ></Route>
            <Route path="role" element={<ManageRole></ManageRole>}></Route>
            <Route
              path="profile"
              element={<AdminProfile></AdminProfile>}
            ></Route>
          </Route>
          <Route path="testForm" element={<FormTestKhac></FormTestKhac>} />
          <Route path="tutor" element={<TempUITutor></TempUITutor>}>
            <Route path="" element={<TuTorHome></TuTorHome>}></Route>
            <Route
              path="tutor-profile"
              element={<TutorProfile></TutorProfile>}
            ></Route>
            <Route
              path="appointment-schedule"
              element={<AppointmentScheduleTutor></AppointmentScheduleTutor>}
            ></Route>
          </Route>
          <Route path="home" element={<TemplateUI></TemplateUI>}>
            <Route
              path="create-appointment"
              element={<CreateAppointment></CreateAppointment>}
            ></Route>
            <Route
              path=""
              element={<PostUserContent></PostUserContent>}
            ></Route>
            <Route
              path="appointment-schedule"
              element={<AppointmentSchedule></AppointmentSchedule>}
            ></Route>
            <Route
              path="user-detail"
              element={<UserDetail></UserDetail>}
            ></Route>
          </Route>
          <Route path="testModal" element={<CreatePost></CreatePost>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
