import React from 'react'

const ModalEditPost = () => {
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
            <form>
                <div className="form-group mb-3"> {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="postId">PostId</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postId"                  
                  />
                </div>
                <div className="form-group mb-3"> {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"         
                  />
                </div>
                <div className="form-group mb-3"> {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"       
                  />
                </div>
                <div className="form-group mb-3"> {/* Thêm lớp mb-3 ở đây */}
                  <label htmlFor="schedule">Schedule</label>
                  <input
                    type="text"
                    className="form-control"
                    id="schedule"         
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
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  )
}

export default ModalEditPost