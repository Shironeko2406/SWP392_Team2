// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserProfileActionAsync } from "../../Redux/Reducer/UserReducer";

// const AdminProfile = () => {
//   const { userProfile } = useSelector((state) => state.UserReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const actionAsync = GetUserProfileActionAsync();
//     dispatch(actionAsync);
//   }, [dispatch]);

//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <div className="card">
//           <div className="card-header d-flex justify-content-between align-items-center">
//             <h4 className="card-title">User Management</h4>
//             <button className="btn btn-warning btn-lg shadow-sm rounded-pill">
//               <i className="fa fa-edit"></i> Edit
//             </button>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-3 text-center">
//                 <img
//                   src={
//                     userProfile.avatarUrl || "https://via.placeholder.com/150"
//                   }
//                   alt="User Avatar"
//                   className="img-thumbnail"
//                 />
//               </div>
//               <div className="col-md-9">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item">
//                     <strong>Username:</strong> {userProfile.username}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Password:</strong> {userProfile.password}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Full Name:</strong> {userProfile.fullname}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Email:</strong> {userProfile.email}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Phone:</strong> {userProfile.phone}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Address:</strong> {userProfile.address}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Gender:</strong>{" "}
//                     {userProfile.gender === 1 ? "Male" : "Female"}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileActionAsync, UpdateUserProfileByIdActionAsync } from "../../Redux/Reducer/UserReducer";
import EditProfileAdmin from "../Component/Modal/EditProfileAdmin";

const AdminProfile = () => {
  const { userProfile } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const actionAsync = GetUserProfileActionAsync();
    dispatch(actionAsync);
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (values) => {
    // Handle form submission, for example, dispatch an action to update user profile
    console.log("Updated values:", values);
    setIsModalVisible(false);
    const actionAsync = UpdateUserProfileByIdActionAsync(
      userProfile.accountId,
      values
    );
    dispatch(actionAsync);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">User Management</h4>
            <button
              className="btn btn-warning btn-lg shadow-sm rounded-pill"
              onClick={showModal}
            >
              <i className="fa fa-edit"></i> Edit
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 text-center">
                <img
                  src={
                    userProfile.avatarUrl || "https://via.placeholder.com/150"
                  }
                  alt="User Avatar"
                  className="img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Username:</strong> {userProfile.username}
                  </li>
                  <li className="list-group-item">
                    <strong>Password:</strong> {userProfile.password}
                  </li>
                  <li className="list-group-item">
                    <strong>Full Name:</strong> {userProfile.fullname}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {userProfile.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Phone:</strong> {userProfile.phone}
                  </li>
                  <li className="list-group-item">
                    <strong>Address:</strong> {userProfile.address}
                  </li>
                  <li className="list-group-item">
                    <strong>Gender:</strong>{" "}
                    {userProfile.gender === 1 ? "Male" : "Female"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileAdmin
        visible={isModalVisible}
        onOk={handleEdit}
        onCancel={handleCloseModal}
        userProfile={userProfile}
      ></EditProfileAdmin>
    </div>
  );
};

export default AdminProfile;
