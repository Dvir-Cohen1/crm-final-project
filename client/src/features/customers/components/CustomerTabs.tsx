import React from 'react'
import CustomerDetails from './CustomerDetails';
import { Tabs, TabsProps } from 'antd';

const CustomerTabs = ({ customer }: any) => {

     const onChange = (key: string) => {
          // console.log(key);
     };

     const CustomerTabsItems: TabsProps['items'] = [
          {
               key: '1',
               label: 'General information',
               children: <CustomerDetails customer={customer} />,
          },
          {
               key: '2',
               label: 'Departments',
               children: 'Content of Tab Pane 3',
          },
          {
               key: '3',
               label: 'Roles',
               children: 'Content of Tab Pane 3',
          },
          {
               key: '4',
               label: 'Members',
               children: 'Content of Tab Pane 3',
          },
          {
               key: '5',
               label: 'Custom fields',
               children: 'Content of Tab Pane 2',
          },
          {
               key: '6',
               label: 'Settings',
               children: 'Content of Tab Pane 3',
          },
     ];
     return (
          <Tabs
               tabPosition='left'
               defaultActiveKey="1"
               items={CustomerTabsItems}
               onChange={onChange} />
     )
}

export default CustomerTabs