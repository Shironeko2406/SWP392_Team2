import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  resetPostByIdAction,
  updatePostByIdActionAsync,
} from "../../../Redux/Reducer/PostRequestReducer";
import { getCurrentDateTime } from "../../../Utils/UtilFuction";

const ModalEditPost = () => {
  const dispatch = useDispatch();
  const { postById } = useSelector((state) => state.PostRequestReducer);
  console.log(postById);

  useEffect(() => {
    return () => {
      dispatch(resetPostByIdAction());
    };
  }, [dispatch]);

  const formUpdatePost = useFormik({
    initialValues: {
      postId: "",
      description: "",
      location: "",
      schedule: "",
      preferredTime: "",
      mode: 1,
      gender: "",
      status: 1,
      requestSkill: "",
    },
    onSubmit: (postUpdate) => {
      const currentTime = getCurrentDateTime();
      const valuesToSend = {
        ...postUpdate,
        gender: parseInt(postUpdate.gender) || 0, // Chuyển giá trị gender thành số nguyên
        createdDate: currentTime,
      };
      const actionAsync = updatePostByIdActionAsync(
        valuesToSend.postId,
        valuesToSend
      );
      dispatch(actionAsync);
    },
  });

  const handleSubmit = () => {
    formUpdatePost.handleSubmit(); // Kích hoạt submit của formik
  };

  useEffect(() => {
    if (postById) {
      formUpdatePost.setValues({
        postId: postById.postId || "",
        description: postById.description || "",
        location: postById.location || "",
        schedule: postById.schedule || "",
        preferredTime: postById.preferredTime || "",
        gender: postById.gender || "",
        requestSkill: postById.requestSkill || "",
      });
    }
  }, [postById]);

  return (
    <div>
      {/* Modal trigger button */}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalId"
        style={{ display: "none" }}
      >
        Launch
      </button>
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalId"
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
                Post Infomation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={formUpdatePost.handleSubmit}>
                <div className="form-group mb-3">
                  {" "}
                  {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="postId">PostId</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postId"
                    name="postId"
                    readOnly
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.postId}
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
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.description}
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
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.location}
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
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.schedule}
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
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.preferredTime}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.gender}
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
                    onChange={formUpdatePost.handleChange}
                    value={formUpdatePost.values.requestSkill}
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

export default ModalEditPost;
