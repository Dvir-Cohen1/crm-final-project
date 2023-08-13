import PageTitle from '@/components/common/PageTitle'
import CustomerTable from '@/features/customers/components/CustomerTable'
import Layout from '@/layouts/Layout'
import { Button, Space, Dropdown, MenuProps } from 'antd'
import {
     EllipsisOutlined,

} from '@ant-design/icons';
import KanbanBoard from '@/features/customers/components/KanbanBoard';



const settingItems: MenuProps['items'] = [
     {
          key: '1',
          label: (
               <>
                    Move
               </>
          ),
     },
     {
          key: '2',
          label: (

               <div >
                    Clone
               </div>
          ),
     },
     {
          key: '3',
          label: (
               <div>Delete</div>
          ),
     },
     {
          type: 'divider',
     },
     {
          key: '4',
          label: (
               <div onClick={() => window.print()}>
                    Print
               </div>
          ),
     }
];

const Customers = () => {

     return (
          <Layout>
               <PageTitle title={'Customers'}
                    showNewButton={false}
                    actionsButtons={
                         <Space style={{ marginBottom: 16 }}>
                              {/* setting dropdown */}
                              <Dropdown overlayClassName='setting-items-dropdown' menu={{ items: settingItems }} placement="bottomRight" trigger={['click']}>
                                   <Button size='middle' type="text" className='font-semibold' icon={<EllipsisOutlined style={{ fontSize: "1.4rem", color: "#172B4D" }} />} />
                              </Dropdown>
                         </Space>
                    }
               />
               <CustomerTable />
               {/* <KanbanBoard /> */}
          </Layout>
     )
}

export default Customers