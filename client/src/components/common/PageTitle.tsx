import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Button } from './Button'
import { Space } from 'antd'

type TPageTitle = {
     title: String,
     ButtonLabel?: String,
     showNewButton?: boolean,
     actionsButtons?: ReactNode
}

const PageTitle = ({ title = 'title', ButtonLabel = 'New', showNewButton = true, actionsButtons }: TPageTitle) => {
     return (
          <Space className='flex justify-between place-items-center mb-5'>
               <div className='text-2xl font-semibold'>{title}</div>
               {showNewButton ?
                    <div>
                         <Link href={'/users/newUser'}>
                              <Button className='px-5' fontSize='xs' >{ButtonLabel}</Button>
                         </Link>
                    </div>
                    :
                    <div>
                         {actionsButtons}
                    </div>
               }
          </Space>
     )
}

export default PageTitle