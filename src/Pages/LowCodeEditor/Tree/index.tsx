import React from "react";
// 实现一个多层级目录树组件
// 使用 react 封装一个 tree 组件, 点击 收起(-) /展开(+) 节点， 要求暴露给父组件一个事件，点击时候，父组件能通过监听对应的事件，知道点击了哪个节点

const ExpandIcon = (props) => {
    const { onExpand } = props;
    const [isExpand, setIsExpand] = React.useState(false);
    const handleExpandIconClick = () => {
        setIsExpand(!isExpand);
        onExpand(!isExpand);
    };

    return (
        <div onClick={handleExpandIconClick}>
            {isExpand ? <button>-</button> : <button>+</button>}
        </div>
    );
};

const Tree = () => {
    const node = [
        {
            id: "1", // 节点ID
            text: "hello world", // 节点展示文案
            children: [
                {
                    // 节点子元素
                    id: "1-1",
                    text: "hello world",
                    children: [],
                },
            ],
        },
        {
            id: "2",
            text: "hello world",
        },
    ];
    const handleExpand = (isExpand, item) => {
        console.log(isExpand, item);
    };
    // ''.includes{
    //   text.split('search')[0,1,2 ]
    //   return

    // }
    const renderTreeNode = (nodeList) => {
        return nodeList.map((item, index) => {
            if (item.children && item.children.length > 0) {
                // debugger;
                return (
                    <div key={index}>
                        <ExpandIcon
                            onExpand={(isExpand) =>
                                handleExpand(isExpand, item)
                            }
                        />
                        <span>{item.text + item.id}</span>
                        {renderTreeNode(item.children)}
                    </div>
                );
            }
            return (
                <div key={index}>
                    <ExpandIcon
                        onExpand={(isExpand) => handleExpand(isExpand, item)}
                    />
                    <span>{item.text + item.id}</span>
                </div>
            );
        });
    };
    return <div>{renderTreeNode(node)}</div>;
};

export default Tree;
