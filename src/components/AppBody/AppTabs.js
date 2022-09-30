import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import AllTable from "./Table/AllTable";
import Header from "./Header";
import RejectedTable from "./Table/RejectedTable";

const AppTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <Tabs
      color='teal'
      defaultValue='all'
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        <Tabs.Tab value='all'>All</Tabs.Tab>
        <Tabs.Tab value='rejected' color='red'>
          Rejected
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='all' pt='xs' className='overflow-auto'>
        <Header />
        <AllTable />
      </Tabs.Panel>

      <Tabs.Panel value='rejected' pt='xs'>
        <RejectedTable />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AppTabs;
