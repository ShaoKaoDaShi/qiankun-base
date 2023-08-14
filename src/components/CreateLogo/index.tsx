import domToImage from "dom-to-image";
import React, { useRef, useEffect } from "react";
import styles from "./index.css";
import logoHtml from "./logo";
const CreateLogo = () => {
  const ref = useRef<HTMLDivElement>();
  const mask = useRef<HTMLDivElement>();
  useEffect(() => {
    ref.current.innerHTML = logoHtml;
    const content = ref.current.firstElementChild as HTMLDivElement;
    const logoChilds = Array.from(content.children).map(
      (child) => child as HTMLDivElement
    );
    const tops = logoChilds.map(
      (child) =>
        parseFloat(child.style.top) - parseFloat(logoChilds[0].style.top)
    );
    const lefts = logoChilds.map(
      (child) =>
        parseFloat(child.style.left) - parseFloat(logoChilds[0].style.left)
    );
    logoChilds.forEach((child, index) => {
      child.style.left = lefts[index] + "px";
      child.style.top = tops[index] + "px";
    });
    content.style.boxShadow = "";
    content.style.margin = "0";
    setTimeout(() => {
      domToImage.toSvg(content).then((dataUrl) => {
        console.log(dataUrl);
        const aDom = document.createElement("a");
        aDom.download = "true";
        aDom.href = dataUrl;
        // aDom.click()
      });
      domToImage
        .toPng(content, { bgcolor: "rgba(255,255,255,0)" })
        .then((dataUrl) => {
          console.log(dataUrl);
          const aDom = document.createElement("a");
          aDom.download = "true";
          aDom.href = dataUrl;
          // aDom.click()
        });
    }, 1000);
  }, [ref]);
  return (
    <div className={styles.logoMask} ref={mask}>
      <div className={styles.logoContainer} ref={ref}></div>
    </div>
  );
};

export default CreateLogo;
