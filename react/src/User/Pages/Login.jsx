import React, { useEffect } from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginActionAsync, LoginGGActionAsync } from "../../Redux/Reducer/UserReducer";
import { getDataTextStorage, TOKEN_AUTHOR } from "../../Utils/UtilFuction";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Login = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenUser, userLogin } = useSelector((state) => state.UserReducer);
  // console.log(tokenUser);
  // console.log(userLogin)

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const actionAsync = LoginActionAsync(values);
    dispatch(actionAsync);
  };

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response.credential);
    // Thực hiện các hành động khác với token hoặc profile của người dùng
    const tokenGG = {
      "idToken" : response.credential
    }
    const actionAsync = LoginGGActionAsync(tokenGG)
    dispatch(actionAsync)
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };
  useEffect(() => {
    if (getDataTextStorage(TOKEN_AUTHOR)) {
      if (userLogin.Role === "1") {
        navigate("/admin");
      } else if (userLogin.Role === "4") {
        navigate("/home");
      } else if (userLogin.Role === "3") {
        navigate("/tutor");
      }
    }
  }, [[tokenUser]]);

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={styles.footer}>
              <div className="mb-3">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                />
              </div>
              <div className="mb-3">
                <Text style={styles.text}>Don't have an account?</Text>{" "}
                <NavLink to="/register">Sign up now</NavLink>
              </div>
              <div>
                <Text style={styles.text}>Register with by tutor!</Text>{" "}
                <NavLink to="/register-tutor">Sign up now</NavLink>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
