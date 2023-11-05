import React, { useEffect } from "react";
import styles from "./style.module.css";
import GoogleButton from "react-google-button";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../configs/firebase.configs";
import { useNavigate } from "react-router-dom";
function LogIn({ loading, setLoading }) {
  const navigate = useNavigate();
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/dashboard");
        localStorage.setItem(
          "userLogin",
          JSON.stringify(currentUser.providerData[0])
        );
        setLoading(!loading);
      }
    });
    JSON.parse(localStorage.getItem("userLogin"));
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.register} style={{ marginTop: "20px" }}>
        <div className={styles.formRegisterEmail}>
          <div className={styles.title}>
            <h1>Sign In</h1>
          </div>
          <GoogleButton onClick={() => googleSignIn()} />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
