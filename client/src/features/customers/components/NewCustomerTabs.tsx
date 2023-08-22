

import { Tabs, type TabsProps } from 'antd';
import NewCustomerForm from './forms/NewCustomerForm';

const NewCustomerTabs = () => {


     const onChange = (key: string) => {
          console.log(key);
     };

     const items: TabsProps['items'] = [
          {
               key: '1',
               label: `Customer information`,
               children: <NewCustomerForm />,
          },
          {
               key: '2',
               label: `Custom fields`,
               children: `Content of Tab Pane 2`,
          },
          {
               key: '3',
               label: `Settings`,
               children: `Content of Tab Pane 3`,
          },
     ];

     return (
          <Tabs tabPosition='left' defaultActiveKey="1" items={items} onChange={onChange} />
     )
}

export default NewCustomerTabs