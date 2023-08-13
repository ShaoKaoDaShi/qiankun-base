import BackImage from "./Image upload-cuate.svg";
import React from "react";
import { Image, Button, Card } from "antd";
import styles from "./index.module.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import myWindowStore from "../../store/window";
const LoginPage = observer<{
  myWindow?: { innerWidth: number; innerHeight: number };
}>(({ myWindow=myWindowStore }) => {
  const style = {
    width: myWindow.innerWidth + "px",
    height: myWindow.innerHeight + "px",
    // position: "absolute",
  };

  return (
    <div style={style} className={styles.container}>
      <BackImage width={myWindow.innerWidth} height={myWindow.innerHeight} />

      <Card className={styles.loginForm} hoverable>
        <LoginForm />
      </Card>
    </div>
  );
});

export default LoginPage;
