import React from "react";
import Cookies from "js-cookie";
import LoginPage from "../Pages/Login";
import myWindow from "../store/window";
import { Redirect } from "react-router-dom";
const auth = (el: React.FC) => {
  if (Cookies.get("access-token")) return el;

  const h: React.FC = () => {
    return <Redirect to="/login" />;
  };
  return h;
};

export default auth;
