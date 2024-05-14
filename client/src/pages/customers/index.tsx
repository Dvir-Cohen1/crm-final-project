import PageTitle from '@/components/common/PageTitle'
import CustomerTable from '@/features/customers/components/CustomerTable'
import Layout from '@/layouts/Layout'
import { Button, Space, Dropdown, MenuProps, Tooltip } from 'antd'
import { EllipsisOutlined, } from '@ant-design/icons';
import KanbanBoard from '@/features/customers/components/KanbanBoard';
import { useState } from 'react';
import { BsKanban, BsTable } from "react-icons/bs";
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localstorage';


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
     const [isKanbanView, setIsKanbanView] = useState(getLocalStorageItem('isKanbanView') || false)

     const handleSetIsKanbanView = () => {
          setLocalStorageItem('isKanbanView', !isKanbanView)
          setIsKanbanView((prev) => !prev)
     }

     return (
          <Layout>
               <PageTitle title={'Customers'}
                    showNewButton={true}
                    href='/customers/newCustomer'
                    actionsButtons={
                         <Space style={{ marginBottom: 16 }}>
                              {/* setting dropdown */}
                              <Tooltip title={'Options'} placement='top'>
                                   <Dropdown overlayClassName='setting-items-dropdown' menu={{ items: settingItems }} placement="bottomRight" trigger={['click']}>
                                        <Button size='middle' type="text" className='font-semibold' icon={<EllipsisOutlined style={{ fontSize: "1.2rem", color: "#172B4D" }} />} />
                                   </Dropdown>
                              </Tooltip>
                              <Tooltip title={isKanbanView ? 'Table view' : 'Kanban view'} placement='top'>
                                   <Button size='middle' type="link" className='font-semibold' onClick={() => handleSetIsKanbanView()}  >
                                        {isKanbanView ? <BsTable style={{ fontSize: "1.05rem" }} /> : <BsKanban style={{ fontSize: "1.05rem" }} />}
                                   </Button>
                              </Tooltip>
                         </Space>
                    }
               />

               {isKanbanView ? <KanbanBoard /> : <CustomerTable />}

          </Layout >
     )
}

export default Customers