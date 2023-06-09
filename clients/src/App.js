import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { app } from "./config/firebase.config.js";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { Dashboard, Login, Main } from "./containers";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { Alert, MainLoader, CheckOutSuccess, UserOrders } from "./components";
import { setCartItems } from "./context/actions/cartAction.js";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
