// 设计一个父子组件界面，父组件上面是一个按钮，下面是子组件的内容区域，要求：
// - 父组件点击按钮时，子组件发起网络请求，GET 请求 https://www.baidu.com 的首页数据
// - 然后子组件将请求返回的数据渲染在子组件自己的 div 里面
import React from "react";
const Parent = () => {
    const [data, setData] = React.useState({});
    const handleClick = () => {
        setData({});
    };
    return (
        <div>
            <button onClick={handleClick}>fetch</button>
            <Child update={data} />
        </div>
    );
};

const Child = (props) => {
    const { update } = props;
    const [data, setData] = React.useState("");
    React.useEffect(() => {
        fetch("https://www.baidu.com")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, [update]);
    return (
        <div>
            {data}

            <html>
                <header></header>
            </html>
        </div>
    );
};
export default Parent;
