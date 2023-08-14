import React, { useRef, useState, useMemo } from "react";
import { Button, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { TabsStore } from "../../store/tabs";
import { theme } from "antd";
import { toJS } from "mobx";
type TargetKey = string;
const style = { fontWeight: "bold" };
import useHistoryGo from "../../router/useHistoryGo";

const BaseTabs = observer<{ tabStore: TabsStore }>(({ tabStore }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const go = useHistoryGo();
    const tabsArray = toJS(tabStore.tabsArray);

    // const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
    // const [items, setItems] = useState(defaultPanes);
    // const newTabIndex = useRef(0);

    const onChange = (key: string) => {
        // setActiveKey(key);
        tabStore.setActiveKey(key);
        go(key);
    };

    const add = () => {
        const keyNum = tabStore.tabsArray.length + 1;
        const newActiveKey = `newTab${keyNum}`;
        tabStore.addOneTab({
            label: <span style={style}>{`Tab ${keyNum}`}</span>,
            children: <span style={style}>{"New Tab Pane" + keyNum}</span>,
            key: newActiveKey,
        });
    };

    const remove = (targetKey: TargetKey) => {
        // throw new Error('alskdf;ljk')
        const nextTargetKey = tabStore.deleteOneTab(targetKey);
        go(nextTargetKey);
        // return nextTargetKey;
    };

    const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <div
            style={{
                // margin: "24px 16px",
                padding: 4,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={tabStore.activeKey}
                type="editable-card"
                onEdit={onEdit}
                items={tabsArray}
            />
        </div>
    );
});
export default BaseTabs;
