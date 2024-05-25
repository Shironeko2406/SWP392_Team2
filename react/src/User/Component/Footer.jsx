import React from 'react'
import { FacebookOutlined} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className=" text-light py-4 mt-auto" style={{ backgroundColor: '#30475e' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
            Tutor connection platform
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <FacebookOutlined style={{ fontSize: 32, color: '#1890ff' }} />
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
