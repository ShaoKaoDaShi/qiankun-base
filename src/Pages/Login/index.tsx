import img from "../../Happiness-amico.svg";
import React from "react";
import { Image,Button} from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
const LoginPage = observer<{ myWindow:{innerWidth: number; innerHeight: number} }>(
  ({myWindow}) => {
  const style = {
    width: myWindow.innerWidth + "px",
    height: myWindow.innerHeight + "px",
    display:"flex"
  }
    return (
      <div
        style={style}
      >
        <Image src={img} style={{ flex: 1 }} />123
        <div>
        <Link to={'/home'}><Button>home</Button></Link>
        </div>
      </div>
    );
  }
);

export default LoginPage;
