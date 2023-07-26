import { formatDateTimeToString } from '@/utils/date'
import React from 'react'
import PriorityTags from '../PriorityTags'
import { Avatar, Button } from 'antd'
import { FaAngleDoubleRight } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";


import Link from 'next/link'
import { NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME } from '../../constants/main';

const ToArrowIcon = () => (
     <FaAngleDoubleRight style={{ fill: "#8d95a5" }} />
)

const History = ({ history, numberOfItems, handleSetOfNumbers }: any) => {
     return (
          <div>
               {history?.slice(0, numberOfItems).map((item: any) => {
                    return (
                         <div className='mb-4 flex gap-3 items-center' key={item._id}>
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
                                   {item.fieldName !== "status" && item.fieldName !== "assignee" && item.fieldName !== "due_date" && item.fieldName !== "followers" && item.fieldName !== "priority" &&
                                        <div className='flex flex-wrap gap-3 items-center'>
                                             <div>  <span className="font-semibold">{item.fromValue}</span></div>
                                             <ToArrowIcon />
                                             <div> <span className="font-semibold">{item.toValue}</span></div>
                                        </div>
                                   }
                                   {item.fieldName === "status" &&
                                        <div className='flex gap-3 items-center'>
                                             <div className='text-sm' style={{ backgroundColor: item.fromValue.color, padding: "2px 8px", borderRadius: "3px", color: '#fff', fontWeight: '600' }}> {item.fromValue.label}</div>
                                             <ToArrowIcon />
                                             <div className='text-sm' style={{ backgroundColor: item.toValue.color, padding: "2px 8px", borderRadius: "3px", color: '#fff', fontWeight: '600' }}> {item.toValue.label}</div>
                                        </div>
                                   }
                                   {item.fieldName === "assignee" &&
                                        <div className='flex items-center gap-3 font-semibold'>
                                             {item.fromValue.map((assignee: any, indexId: any) => (
                                                  item.fromValue[0] !== null ?
                                                       <div className='flex place-items-center gap-2' key={indexId}>
                                                            <Avatar src={assignee?.imgSRC} size={'small'} icon={<UserOutlined />} />
                                                            <Link href={`/users/${assignee?._id}`}>
                                                                 {`${assignee?.firstName} ${assignee?.lastName}`}
                                                            </Link>
                                                       </div>
                                                       : "Unassigned"
                                             ))}
                                             <ToArrowIcon />
                                             {item.toValue.map((assignee: any, indexId: any) => (
                                                  assignee ?
                                                       <div className='flex place-items-center gap-2' key={indexId}>
                                                            <Avatar src={assignee?.imgSRC} size={'small'} icon={<UserOutlined />} />
                                                            <Link href={`/users/${assignee?._id}`}>
                                                                 {`${assignee?.firstName} ${assignee?.lastName}`}
                                                            </Link>
                                                       </div>
                                                       : "Unassigned"
                                             ))}
                                        </div>
                                   }
                                   {item.fieldName === "followers" &&
                                        <div className='flex items-center gap-3 font-semibold'>
                                             {item.fromValue.map((followers: any, indexId: any) => (
                                                  item.fromValue[0] !== null ?
                                                       <div className='flex place-items-center gap-2' key={indexId}>
                                                            <Avatar src={followers?.imgSRC} size={'small'} icon={<UserOutlined />} />
                                                            <Link href={`/users/${followers?._id}`}>
                                                                 {`${followers?.firstName} ${followers?.lastName}`}
                                                            </Link>
                                                       </div>
                                                       : "Unassigned"
                                             ))}
                                             <ToArrowIcon />
                                             {item.toValue.map((followers: any, indexId: any) => (
                                                  followers ?
                                                       <div className='flex place-items-center gap-2' key={indexId}>
                                                            <Avatar src={followers?.imgSRC} size={'small'} icon={<UserOutlined />} />
                                                            <Link href={`/users/${followers?._id}`}>
                                                                 {`${followers?.firstName} ${followers?.lastName}`}
                                                            </Link>
                                                       </div>
                                                       : "Unassigned"
                                             ))}
                                        </div>
                                   }
                                   {item.fieldName === "due_date" &&
                                        <div className='flex gap-3'>
                                             <div> <span className="font-semibold">
                                                  {formatDateTimeToString(item.fromValue)}
                                             </span></div>
                                             <ToArrowIcon />
                                             <div> <span className="font-semibold">
                                                  {formatDateTimeToString(item.toValue)}
                                             </span></div>
                                        </div>
                                   }
                                   {item.fieldName === "priority" &&
                                        <div className='flex gap-3'>
                                             <div>
                                                  <span className="font-semibold">
                                                       {PriorityTags({ priorityTitle: item.fromValue })}
                                                  </span>
                                             </div>
                                             <ToArrowIcon />
                                             <div>
                                                  <span className="font-semibold">
                                                       {PriorityTags({ priorityTitle: item.toValue })}
                                                  </span>
                                             </div>
                                        </div>
                                   }
                              </div>
                         </div>
                    )
               })}
               {history?.length > NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME &&
                    <Button type='text' title='Show more' className='w-full' onClick={() => handleSetOfNumbers()} >
                         {history.length <= numberOfItems ? "Show less" : "Show more"}
                    </Button>
               }
          </div>
     )
}

export default History