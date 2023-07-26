import { formatDateTimeToString } from '@/utils/date';
import { Avatar } from 'antd';
import React from 'react'
import { Input } from 'antd';
import { RootState, UserState } from '@/types/global';
import { useSelector } from 'react-redux';
import Link from 'next/link';

type TCommentsItem = {
     _id: string,
     content: string,
     createdAt: string,
     updatedAt: string,
     postedBy:
     {
          _id: string,
          email: string,
          firstName: string,
          lastName: string,
          role: string,
          imgSRC: string
     },
}

const Comments = ({ comments }: any) => {
     const { user }: UserState = useSelector((state: RootState) => state.auth);
     return (
          <div>
               <div className='flex gap-4 mb-10'>
                    <Avatar size='large' src={user?.imgSRC} />
                    <div className='w-full text-xs'>
                         <Input style={{ borderRadius: '3px' }} size='large' className='mb-2' placeholder="Add a comment..." />
                         <span className="font-semibold">Pro tip:</span> press
                         <span style={{ backgroundColor: '#F1F2F4', margin: '0 2px' }} className="font-semibold"> M </span>
                         to comment
                    </div>
               </div>
               {comments?.map((item: TCommentsItem) => (
                    <div key={item._id} style={{ marginBottom: '2rem' }} className='flex gap-3'>
                         <div><Link href={`/users/${item.postedBy._id}`}>
                              <Avatar size='large' src={item.postedBy.imgSRC} />
                         </Link></div>
                         <div className='flex flex-col gap-3'>
                              <div className='flex gap-4'>
                                   <Link href={`/users/${item.postedBy._id}`}><span className="font-semibold">{item.postedBy.firstName} {item.postedBy.lastName}</span></Link>
                                   {formatDateTimeToString(item.createdAt, true, true)}
                              </div>
                              <div>{item.content}</div>
                              <div><span className="font-semibold">Edit</span> · <span className="font-semibold">Delete</span></div>
                         </div>
                    </div>
               ))}
               <div className="block md:hidden lg:hidden xl:hidden">
                    <hr />
               </div>
          </div>
     )
}

export default Comments