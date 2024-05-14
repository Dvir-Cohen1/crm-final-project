import Link from 'next/link'
import React, { ReactNode } from 'react'
// import { Button } from './Button'
import { Space, Button } from 'antd'

type TPageTitle = {
     title: String,
     href?: string
     ButtonLabel?: String,
     showNewButton?: boolean,
     actionsButtons?: ReactNode
     onClick?: Function
}

const PageTitle = ({ title = 'title', ButtonLabel = 'New', showNewButton = true, actionsButtons = null, href = '', onClick = () => null }: TPageTitle) => {
     return (
          <Space className='flex justify-between place-items-center mb-5'>
               <div className=' flex items-center gap-3 text-2xl font-semibold'>
                    {title}

                    {showNewButton &&
                         <div>
                              <Link href={href}>
                                   {/* <Button onClick={() => onClick()} className='px-5' fontSize='xs' >{ButtonLabel}</Button> */}
                                   <Button onClick={() => onClick()} type='default' >{ButtonLabel}</Button>
                              </Link>
                         </div>
                    }

               </div>
               {actionsButtons &&
                    <div>
                         {actionsButtons}
                    </div>
               }
          </Space>
     )
}

export default PageTitle