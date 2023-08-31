import { makeAutoObservable } from "mobx";
import React from "react";
import type { TabsProps } from "antd";
import type { PropertyType, ArrayElementType } from "../utils/typeTools";
type TabArray = PropertyType<TabsProps, "items">;
type Tab = ArrayElementType<TabArray>;
type TargetKey = string;
// const tab = { label: '主应用', children: <div>主应用</div>, key: 'home', closeIcon:false }
const pathName = window.location.pathname;
import tabFactory from "../components/BaseTabs/tabFactory";

import routeList from "../router/routeList";
class TabsStore {
  tabsArray: TabArray;
  activeKey: TargetKey;

  constructor() {
    const homeTab = tabFactory({
      label: routeList[0].label,
      children: routeList[0].el,
      key: routeList[0].key,
      closeIcon: false,
    });
    const initArr: Tab[] = [homeTab];
    const initActiveKey = pathName;
    this.activeKey = initActiveKey || routeList[0].key;
    if (initActiveKey !== "/login" && this.activeKey !== "/home") {
      const tabActive = routeList.find((tab) => {
        return initActiveKey === tab.key;
      });
      const tabItem = tabFactory({
        label: tabActive?.label,
        children: tabActive?.el,
        key: tabActive?.key,
      });
      initArr.push(tabItem);
    }
    this.tabsArray = initArr;
    makeAutoObservable(this);
  }

  addOneTab(tab: Tab) {
    this.tabsArray = [...this.tabsArray, tab];
    this.activeKey = tab.key;
  }

  isTabExist(targetKey: TargetKey) {
    return Boolean(this.tabsArray.find((tab) => tab.key === targetKey));
  }

  deleteOneTab(targetKey: TargetKey) {
    const index = this.tabsArray.findIndex((tab) => tab.key === targetKey);
    this.tabsArray = this.tabsArray.filter((tab) => tab.key !== targetKey);
    const nextTargetKey =
      this.tabsArray[index]?.key ||
      this.tabsArray[this.tabsArray.length - 1].key;
    this.activeKey = nextTargetKey;
    return nextTargetKey;
  }

  setActiveKey(key: TargetKey) {
    this.activeKey = key;
  }
}
const tabStore1 = new TabsStore();
export { TabsStore };
export default tabStore1;
