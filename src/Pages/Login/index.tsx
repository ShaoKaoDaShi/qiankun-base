import BackImage from "./upload-cuate.svg";
import React from "react";
import { Card } from "antd";
import styles from "./index.module.css";
import { observer } from "mobx-react-lite";
import LoginForm from "../../components/LoginForm";
import myWindowStore from "../../store/window";
const LoginPage = observer<{
    myWindow?: { innerWidth: number; innerHeight: number };
}>(({ myWindow = myWindowStore }) => {
    return (
        <div className={styles.container}>
            <img
                src={BackImage}
                width={myWindow.innerWidth}
                height={myWindow.innerHeight}
            />
            {/* <BackImage
                width={myWindow.innerWidth}
                height={myWindow.innerHeight}
            /> */}

            <Card className={styles.loginForm} hoverable>
                <LoginForm />
            </Card>
        </div>
    );
});

export default LoginPage;
