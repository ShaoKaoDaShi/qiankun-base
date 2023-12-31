import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Menu as AntMenu } from "antd";
import menuList from "./menuList";
import { MenuStore } from "../../store/menuStore";
import { observer } from "mobx-react-lite";
import * as _ from "lodash";

const Menu = observer<{ menuStore: MenuStore }>(({ menuStore }) => {
    const [list, setList] = useState(menuList);
    const [selectedKey, setSelectedKey] = useState("");
    const location = useLocation();
    const history = useHistory();

    async function historyGo(key: string) {
        history.push(`/${key}`);
    }
    const getOpenKeys = () => {
        const keys = location.pathname.split("/").filter((path) => path);
        keys.pop();
        return keys;
    };
    const getSelectedKey = () => {
        const key = location.pathname
            .split("/")
            .filter((path) => path)
            .join("-");
        return key;
    };
    useEffect(() => {
        console.log("location.pathname", location.pathname, getSelectedKey());
        setSelectedKey(getSelectedKey());
    }, [location.pathname]);
    useEffect(() => {
        if (menuStore.initBool === false) return;
        function containTreeItem(item: string, tree) {
            for (let i = 0; i < tree.length; i++) {
                if (item === tree[i].key) {
                    return true;
                }
                if (tree[i].children && tree[i].children?.length) {
                    if (containTreeItem(item, tree[i].children)) return true;
                }
            }
            return false;
        }
        function filterMenus(target, origin, parentExist = false) {
            if (parentExist) return target;
            return target.filter((item) => {
                let exit = false;
                if (containTreeItem(item.key, origin)) {
                    exit = true;
                    return true;
                } else if (item.children && item.children?.length) {
                    item.children = filterMenus(item.children, origin, exit);
                    if (item.children?.length > 0) return true;
                }

                return false;
            });
        }

        const list = filterMenus(_.cloneDeep(menuList), menuStore.menuList);
        setList(list);
    }, [menuStore.menuList]);

    return (
        <AntMenu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={getOpenKeys()}
            selectedKeys={[selectedKey]}
            onClick={(info) => {
                historyGo(info.key.replace("-", "/"));
            }}
            items={list}
        />
    );
});
export default Menu;
