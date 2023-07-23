import { formatDateTimeToString } from '@/utils/date';
import { Avatar, Button, Empty } from 'antd'
import { FaAngleDoubleRight } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";

import React, { useState } from 'react'
import PriorityTags from './PriorityTags';
import { MdKeyboardDoubleArrowRight, MdOutlineArrowRightAlt } from "react-icons/md";
import Link from 'next/link';

const NUMBER_TO_DISPLAY = 5

const ActivityTabs = ({ comments, history }: any) => {

     // Handle number of items to display
     const [numberOfItems, setNumberOfItems] = useState(NUMBER_TO_DISPLAY);
     const handleSetOfNumbers = () => {
          if (history.length <= numberOfItems) {
               setNumberOfItems(NUMBER_TO_DISPLAY);
          } else {
               setNumberOfItems(prev => prev + NUMBER_TO_DISPLAY);
          }
     }

     // Handle toggle all sections
     const handleToggleAll = () => {
          setShowComments(true);
          setShowHistory(true);
     };

     // Handle toggle Comments section
     const [showComments, setShowComments] = useState(true);
     const handleToggleComments = () => {
          setShowComments(true);
          setShowHistory(false);
     };

     // Handle toggle History section
     const [showHistory, setShowHistory] = useState(false);
     const handleToggleHistory = () => {
          setShowComments(false);
          setShowHistory(true);
     };

     return (
          <section className='md:me-14 mb-5'>
               <h2 className='mb-5'>Activity</h2>
               <div className="flex gap-3 place-items-center">
                    <span>Show:</span>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showComments && showHistory ? 'active-activity-button' : ''}`}
                         onClick={handleToggleAll}
                    >
                         All
                    </Button>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showComments ? 'active-activity-button' : ''}`}
                         onClick={handleToggleComments}
                    >
                         Comments
                    </Button>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showHistory ? 'active-activity-button' : ''}`}
                         onClick={handleToggleHistory}
                    >
                         History
                    </Button>
               </div>

               {(showComments || showHistory) && (
                    <div className='my-5 h-64 task-comments-container'>
                         {showComments &&
                              <div>
                                   {comments?.map((item: { _id: string; content: string }) => (
                                        <div key={item._id}>{item.content}</div>
                                   ))}
                                   <div className="block md:hidden lg:hidden xl:hidden">
                                        <hr />
                                   </div>
                              </div>
                         }
                         {showHistory &&
                              <div>
                                   {history?.slice(0, numberOfItems).map((item: any) => {
                                        return (
                                             <div className='my-5 flex gap-3 items-center' key={item._id}>
                                                  <Link href={`/users/${item.updated_by?._id}`}>
                                                       <Avatar src={item.updated_by.imgSRC} size={'large'} icon={<UserOutlined />} />
                                                  </Link>
                                                  <div>
                                                       <div className='flex flex-wrap gap-2 my-5'>
                                                            <span className="font-semibold">{item.updated_by.firstName} {item.updated_by.lastName}</span>
                                                            updated field
                                                            <span className="font-semibold">{item.fieldName}</span>
                                                            <span>{formatDateTimeToString(item.createdAt)}</span>
                                                       </div>
                                                       {item.fieldName !== "status" && item.fieldName !== "assignee" && item.fieldName !== "due_date" && item.fieldName !== "followers" &&
                                                            <div className='flex gap-3 items-center'>
                                                                 <div>  <span className="font-semibold">{item.fromValue}</span></div>
                                                                 <MdOutlineArrowRightAlt />
                                                                 <div> <span className="font-semibold">{item.toValue}</span></div>
                                                            </div>
                                                       }
                                                       {item.fieldName === "status" &&
                                                            <div className='flex gap-3 items-center'>


                                                                 <div className='text-sm' style={{ backgroundColor: item.fromValue.color, padding: "2px 8px", borderRadius: "3px", color: '#fff', fontWeight: '600' }}> {item.fromValue.label}</div>


                                                                 <MdOutlineArrowRightAlt />


                                                                 <div className='text-sm' style={{ backgroundColor: item.toValue.color, padding: "2px 8px", borderRadius: "3px", color: '#fff', fontWeight: '600' }}> {item.toValue.label}</div>
                                                            </div>
                                                       }
                                                       {item.fieldName === "assignee" &&
                                                            <div className='flex gap-3 font-semibold'>

                                                                 {item.fromValue.map((assignee: any, indexId: any) => (
                                                                      <div className='flex gap-2' key={indexId}>
                                                                           {/* <Avatar src={assignee?.imgSRC} size={'small'} icon={<UserOutlined />} /> */}
                                                                           <Link href={`/users/${assignee?._id}`}>
                                                                                {`${assignee?.firstName} ${assignee?.lastName}`}
                                                                           </Link>
                                                                      </div>
                                                                 ))}

                                                                 <MdOutlineArrowRightAlt />

                                                                 {item.toValue.map((assignee: any, indexId: any) => (
                                                                      assignee &&
                                                                      <div className='flex gap-2' key={indexId}>
                                                                           <Link href={`/users/${assignee?._id}`}>

                                                                                {/* <Avatar src={assignee?.imgSRC} size={'small'} icon={<UserOutlined />} /> */}
                                                                                {`${assignee?.firstName} ${assignee?.lastName}`}
                                                                           </Link>
                                                                      </div>
                                                                 ))}
                                                            </div>
                                                       }
                                                       {item.fieldName === "due_date" &&
                                                            <div className='flex gap-3'>
                                                                 <div> <span className="font-semibold">
                                                                      {formatDateTimeToString(item.fromValue)}
                                                                 </span></div>
                                                                 <MdOutlineArrowRightAlt />
                                                                 <div> <span className="font-semibold">
                                                                      {formatDateTimeToString(item.toValue)}
                                                                 </span></div>
                                                            </div>
                                                       }
                                                       {item.fieldName === "priority" &&
                                                            <div className='flex gap-3'>
                                                                 <div> <span className="font-semibold">
                                                                      {PriorityTags(item.fromValue)}
                                                                 </span></div>
                                                                 {/* <FaAngleDoubleRight /> */}
                                                                 <div> <span className="font-semibold">
                                                                      {PriorityTags(item.toValue)}</span></div>
                                                            </div>
                                                       }
                                                  </div>

                                                  <br />

                                             </div>
                                        )
                                   })}
                                   {history?.length > NUMBER_TO_DISPLAY &&


                                        <Button type='text' title='Show more' className='w-full' onClick={() => handleSetOfNumbers()} >
                                             {history.length <= numberOfItems ? "Show less" : "Show more"}
                                        </Button>

                                   }
                              </div>}
                    </div>
               )}

          </section>
     );
}

export default ActivityTabs