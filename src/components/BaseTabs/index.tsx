import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import { TabsStore } from '../../store/tabs';

type TargetKey =  string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return { label: `Tab ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id };
});

const BaseTabs = observer<{tabStore:TabsStore}>(({tabStore}) => {
  // const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  // const [items, setItems] = useState(defaultPanes);
  // const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    // setActiveKey(key);
    tabStore.setActiveKey(key);
  };

  const add = () => {
    const keyNum = tabStore.tabsArray.length+1
    const newActiveKey = `newTab${keyNum}`;
    tabStore.addOneTab({ label: 'New Tab'+keyNum, children: 'New Tab Pane'+keyNum, key: newActiveKey })
  };

  const remove = (targetKey: TargetKey) => {
    debugger
    tabStore.deleteOneTab(targetKey)

  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={tabStore.activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={tabStore.tabsArray}
      />
    </div>
  );
});

export default BaseTabs;