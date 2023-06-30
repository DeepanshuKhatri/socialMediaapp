import React from "react";
import "../assets/styles/styles.css";
import { Button, Divider, Form, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
const SignUp = () => {
  return (
    <div className="signup-page">
      <div className="navbar">
        <nav className="signup-nav">
          <img
            className="signup-logo"
            src={require("../assets/images/LinkedInLogo.png")}
            alt=""
          />
        </nav>
      </div>
      <div>
        <h1  className="signup-text">Make the most of your professional life</h1>
      </div>
      <div className="signup-container">
        <div>
          <Form layout="vertical" className="signup-form">
            <Form.Item
              label="Email or phone number"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address or mobile number.",
                },
              ]}
            >
              <Input className="signup-inp" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password.",
                },
              ]}
            >
              <Input className="signup-inp" type="password" />
            </Form.Item>
            <Form.Item>
              <p>By clicking Agree & Join, you agree to the Linked.<span> </span>
              <a href="#">User Agreement, Privacy Policy</a> and <a href="#">Cookie Policy</a>.</p>
            </Form.Item>
            <Form.Item>
              <Button className="agree-join">Agree & Join</Button>
            </Form.Item>
            <Form.Item>
              <Divider> or </Divider>
            </Form.Item>
            <Form.Item htmlType="submit">
              <Button className="continue-with-google">
                <GoogleOutlined /> Continue With Google
              </Button>
            </Form.Item>
            <Form.Item>
                <h3 className="already-signup">Already on LinkedIn? <a href="/"> Sign in</a></h3>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <p className="look-signup">Looking to create a page for a business? Get help</p>
      </div>
      <footer className="footer-signup">
        <div className="footer-signup1">

        <p>© 2023</p>
        <p>About </p>
        <p> Accessibility</p>
        <p>User Agreement</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Copyright Policy</p>
        <p>Brand Policy</p>
        <p>Guest Controls</p>
        <p>Community Guidelines</p>
        <p>Language  </p>
      
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
