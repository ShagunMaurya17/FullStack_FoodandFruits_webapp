import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FaEnvelope, FcGoogle, FaLock } from "../assets/icons";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
    } else {
      if (password === confirm_password) {
        setUserEmail("");
        setPassword("");
        setConfirm_password("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
    }
  };

  return (
    <div className=" w-screen h-screen relative overflow-hidden flex">
      {" "}
      {/* { Background Image} */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />
      <div className=" flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* top logo section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor  font-semibold text-2xl">City</p>
        </div>
        {/* welcome text */}
        <p className=" text-3xl font-semibold text-headingColor">
          Welcome Back
        </p>
        <p className=" text-xl -mt-6 text-textColor">
          {" "}
          {isSignUp ? "Sign-Up" : "Sign-In"} with following
        </p>
        <div className=" w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Enter Your Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            inSignUp={isSignUp}
          />

          <LoginInput
            placeholder={"Enter Your Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            inSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Your Password Here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type="password"
              inSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Don't have an Account{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline bg-transparent cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                {" "}
                Create new one
              </motion.button>{" "}
            </p>
          ) : (
            <p>
              Already have an Account{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline bg-transparent cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                {" "}
                Sign-in here
              </motion.button>{" "}
            </p>
          )}
          {/* Button Section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              onClick={signUpWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150 "
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150 "
            >
              Sign In
            </motion.button>
          )}
          <div className=" flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">Or</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>
          <motion.div
            {...buttonClick}
            onClick={loginWithGoogle}
            className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4 "
          >
            <FcGoogle className="text-3xl" />
            <p className="capitalize text-base text-headingColor">
              Sign in with Google
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
