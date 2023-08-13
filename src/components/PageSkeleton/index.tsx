import React, { useState, useRef, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./index.css";
const { Header, Sider, Content } = Layout;
import domToImage from "dom-to-image";
import LogoComponent from "./LogoComponent";
import Logo from './logo.png'

const PageSkeleton: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const ref = useRef<HTMLDivElement>();
  const mask = useRef<HTMLDivElement>();
  useEffect(() => {
    // ref.current.style.position = "relative";
    ref.current.innerHTML = `  <div class="work-station-content" style="
    background-color: rgb(255, 255, 255);
    margin-top: 90px;
    box-shadow: rgba(71, 80, 89, 0.15) 0px 5px 20px;
  ">
  <div class="base-component sc-bdVaJa cwoGMT" width="66.79116218208071" height="66.79116218208071" rotate="0" style="
  top: 170.104px;
  left: 99px;
  width: 66.7912px;
  height: 66.7912px;
  transform: rotateZ(0deg);
">
<div class="image-component sc-htpNat enshqJ" width="66.79116218208071" height="66.79116218208071"
style="width: 66.7912px; height: 66.7912px">
<div class="sc-bxivhb fPcvdL">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.com/svgjs" width="100%" height="100%" viewBox="0 0 100 100">
    <g fill="#212121">
      <path d="M24 0h76v76c0 13.255-10.745 24-24 24H0V24C0 10.745 10.745 0 24 0z"></path>
    </g>
  </svg>
</div>
</div>
</div>
<div class="base-component sc-bdVaJa cwoGMT" width="42.59135244483884" height="35.523194383864514" rotate="0" style="
  top: 185.738px;
  left: 111.1px;
  width: 42.5914px;
  height: 35.5232px;
  transform: rotateZ(0deg);
">
<div class="text-component sc-ifAKCX ehsxJr" width="42.59135244483884" height="35.523194383864514"
style="width: 42.5914px; height: 35.5232px">
<div class="sc-EHOje ifTULJ">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.com/svgjs" width="100%" height="100%"
    viewBox="-3.559999942779541 -32.5099983215332 42.59000015258789 35.519996643066406">
    <g fill="#ffffff">
      <path
        d="M30.51 -18.79C30.05 -17.54 29.31 -15.61 28.27 -13C27.24 -10.38 25.46 -6.52 22.94 -1.41L28.36 3.01C30.22 -1.19 31.69 -4.65 32.79 -7.39C33.4 -8.91 34.13 -10.8 35 -13.06C35.87 -15.33 37.21 -19.41 39.03 -25.31L32.51 -30.92C26.86 -22.77 21.61 -15.76 16.78 -9.9C17.66 -15.28 19 -20.85 20.79 -26.63L14.09 -32.51C10.41 -27.71 6.9 -22.6 3.56 -17.19C1.64 -14.06 -0.73 -9.64 -3.56 -3.92L1.32 0.64C2.51 -1.92 3.62 -4.23 4.65 -6.29C7.24 -11.55 10.17 -16.8 13.45 -22.03C12.15 -17.34 10.81 -10.88 9.44 -2.64L14.27 1.55C19.87 -5.14 25.28 -11.92 30.51 -18.79Z">
      </path>
    </g>
  </svg>
</div>
</div>
</div>
</div>`;
    const content = ref.current.firstElementChild as HTMLDivElement;
    const logoChilds = Array.from(content.children).map(child => (child as HTMLDivElement))
    // logoChilds[2].removeChild(logoChilds[2].lastElementChild);
    const tops = logoChilds.map(child => (parseFloat(child.style.top)-parseFloat(logoChilds[0].style.top)))
    const lefts = logoChilds.map(child => (parseFloat(child.style.left)-parseFloat(logoChilds[0].style.left)))
    logoChilds.forEach((child,index) =>{
    child.style.left = lefts[index]+"px"
    child.style.top = tops[index]+"px"
    })
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
      domToImage.toPng(content,{bgcolor:"rgba(255,255,255,0)"}).then((dataUrl) => {
        console.log(dataUrl);
        const aDom = document.createElement("a");
        aDom.download = "true";
        aDom.href = dataUrl;
        // aDom.click()
      });
    }, 1000);
  }, [ref]);
  return (
    <Layout style={{ flex: "auto" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LogoComponent collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
          <div className="logoMask" ref={mask}>
            <div className="logoContainer" ref={ref}></div>
          </div>
          {/* <div ref={mask}>
            <div  ref={ref}></div>
          </div> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageSkeleton;
