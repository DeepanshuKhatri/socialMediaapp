import React from "react";
import "../assets/styles/styles.css";
import { auth, db } from "../config/firebase";
import { Button, Divider, Form, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import {addUser} from '../redux/slice/user.slice'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { getFirestore, doc, updateDoc } from "firebase/firestore";


const Login = () => {
  const dispatch = useDispatch();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      const res1 = res.user;
      dispatch(addUser(res1));
      // const q = query(collection(db, "users"), where("uid", "==", res1.uid));
      // console.log(q);
      // const q2 = await getDocs(q);
      // if (q2.empty) {
      //   await addDoc(collection(db, "users"), {
      //     name: res1.displayName,
      //     email: res1.email,
      //     uid: res1.uid,
      //     avatar: res1.photoURL,
      //     online: true,
      //   });
      // }
    });
  };
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
      </div>
      <div className="signup-container">
        <div>
          <Form layout="vertical" className="signup-form">
            <Form.Item>
            <h1  className="login-text">Welcome Back!</h1>

            </Form.Item>
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
              <p><a href="#">Forgot Password?</a></p>
            </Form.Item>
            <Form.Item>
              <Button className="agree-join">Sign in</Button>
            </Form.Item>
            <Form.Item>
              <Divider> or </Divider>
            </Form.Item>
            <Form.Item htmlType="submit">
              <Button className="continue-with-google" onClick={signInWithGoogle}>
                <GoogleOutlined /> Continue With Google
              </Button>
            </Form.Item>
            <Form.Item>
                <h3 className="already-signup">Don't have account? <a href="/signup">Sign up</a></h3>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <p className="look-signup">Looking to create a page for a business? <a href="#">Get help</a></p>
      </div>
      <footer className="footer-signup">
        <div className="footer-signup1">

        <p>© 2023</p>
        <p> About </p>
        <p> Accessibility </p>
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
  )
}

export default Login