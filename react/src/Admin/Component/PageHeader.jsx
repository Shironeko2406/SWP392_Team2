import React from "react";

const PageHeader = () => {
  return (
    <div className="page-header">
      <h3 className="fw-bold mb-3">DataTables.Net</h3>
      <ul className="breadcrumbs mb-3">
        <li className="nav-home">
          <a href="#">
            <i className="icon-home" />
          </a>
        </li>
        <li className="separator">
          <i className="icon-arrow-right" />
        </li>
        <li className="nav-item">
          <a href="#">Tables</a>
        </li>
        <li className="separator">
          <i className="icon-arrow-right" />
        </li>
        <li className="nav-item">
          <a href="#">Datatables</a>
        </li>
      </ul>
    </div>
  );
};

export default PageHeader;
