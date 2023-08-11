import React from "react";
import Cookies from "js-cookie";
import LoginPage from "../Pages/Login";
import myWindow from "../store/window";
const auth = (el: React.FC) => {
  console.log(
    Cookies.get("access-token") + "123123awerfeqwr" + document.cookie
  );
  if (Cookies.get("access-token")) return el;

  const h: React.FC = () => {
    return <LoginPage myWindow={myWindow} />;
  };
  return h;
};

export default auth;
