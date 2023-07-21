import { Button, Tabs } from 'antd'
import React from 'react'

const ActivityTabs = ({ comments }: any) => (
     <section className='md:me-14 mb-5'>
          <h2 className='mb-5'>Activity</h2>
          <div className="flex gap-3 place-items-center">
               <span>Show:</span>
               <Button
                    size='small'
                    type='ghost'
                    className='font-semibold custom-ghost-button'
               >
                    Comments
               </Button>
               <Button
                    size='small'
                    type='ghost'
                    className='font-semibold custom-ghost-button'
               >
                    History
               </Button>
          </div>
          <div className='my-5'>

               {comments?.map((item: { _id: string; content: string }) => {
                    return (
                         <div key={item._id}>{item.content}</div>
                    )
               })}

          </div>
          <hr className='xs:block sm:block lg:hidden my-6 ' />

          <Tabs defaultActiveKey="1">
               <Tabs.TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
               </Tabs.TabPane>
               <Tabs.TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
               </Tabs.TabPane>
               <Tabs.TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
               </Tabs.TabPane>
          </Tabs>
     </section>
)

export default ActivityTabs