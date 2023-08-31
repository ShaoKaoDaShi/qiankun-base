import React, { memo } from "react";
import Logo from "./logo.png";
import styles from "./LogoComponent.modules.css";

const LogoComponent = ({ collapsed = false }) => {
  return (
    <div className={styles.logo}>
      <img src={Logo} />
      {<span className={collapsed ? styles.logoSpan : ""}>Micro Admin</span>}
    </div>
  );
};

export default memo(LogoComponent);
