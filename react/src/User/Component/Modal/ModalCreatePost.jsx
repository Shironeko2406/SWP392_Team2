import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { CreatePostActionAsync } from "../../../Redux/Reducer/PostRequestReducer";
import { getCurrentDateTime } from "../../../Utils/UtilFuction";

const ModalCreatePost = () => {
  const dispatch = useDispatch();
  // const formCreatePost = useFormik({
  //   initialValues: {
  //     description: "",
  //     location: "",
  //     schedule: "",
  //     preferredTime: "",
  //     mode: 1,
  //     gender: "",
  //     status: 1,
  //     requestSkill: "",
  //     createdDate: "2024-06-17",
  //   },
  //   onSubmit: (value) => {
  //     console.log(value);

  //     const actionAsync = CreatePostActionAsync(value);
  //     dispatch(actionAsync);
  //   },
  // });
  const formCreatePost = useFormik({
    initialValues: {
      description: "",
      location: "",
      schedule: "",
      preferredTime: "",
      mode: 1,
      gender: "",
      status: 1,
      requestSkill: "",
      createdDate: "",
    },
    onSubmit: (values) => {
      const currentTime = getCurrentDateTime();
      const valuesToSend = {
        ...values,
        gender: parseInt(values.gender) || 0, // Chuyển giá trị gender thành số nguyên
        createdDate: currentTime,
      };
      console.log(valuesToSend);

      const actionAsync = CreatePostActionAsync(valuesToSend);
      dispatch(actionAsync);
    },
  });

  const handleSubmit = () => {
    formCreatePost.handleSubmit(); // Kích hoạt submit của formik
  };

  return (
    <div>
      {/* Modal trigger button */}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalIdCreatePost"
        style={{ display: "none" }}
      >
        Launch
      </button>
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalIdCreatePost"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered "
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Create Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={formCreatePost.handleSubmit}>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="postId">PostId</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postId"
                    name="postId"
                    onChange={formCreatePost.handleChange}
                    readOnly
                    placeholder="Id auto random"
                  />
                </div>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={formCreatePost.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    onChange={formCreatePost.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="schedule">Schedule</label>
                  <input
                    type="text"
                    className="form-control"
                    id="schedule"
                    name="schedule"
                    onChange={formCreatePost.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="preferredTime">Preferred Time</label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredTime"
                    name="preferredTime"
                    onChange={formCreatePost.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    onChange={formCreatePost.handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="requestSkill">Request Skill</label>
                  <input
                    type="text"
                    className="form-control"
                    id="requestSkill"
                    name="requestSkill"
                    onChange={formCreatePost.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
};

export default ModalCreatePost;
