import { makeAutoObservable } from "mobx"
import  { TabsProps } from "antd"
import type { PropertyType, ArrayElementType } from "../utils/typeTools"
type TabArray = PropertyType<TabsProps,"items">
type Tab = ArrayElementType<TabArray>
type TargetKey =  string;
const tab = { label: '首页', children: 'New Tab Pane', key: '00000', closeIcon:false }
class TabsStore {
    tabsArray:TabArray=[tab];
    activeKey: TargetKey='00000'

    constructor() {

        makeAutoObservable(this)
    }

    addOneTab(tab:Tab) {
      if (this.activeKey==="") this.activeKey = tab.key
      this.tabsArray=[...this.tabsArray, tab]
    }

    isTabExist(targetKey:TargetKey){
      return Boolean(this.tabsArray.find((tab)=>tab.key === targetKey))
    }

    deleteOneTab(targetKey:TargetKey){
      this.tabsArray = this.tabsArray.filter((tab)=>tab.key !== targetKey)
    }

    setActiveKey(key:TargetKey){
      this.activeKey = key
    }
}
const instance = new TabsStore()
export {TabsStore}
export default instance