import React from 'react'
import {  Empty } from 'antd';
import { Button } from './Button';
const CustomEmpty = () => {
     return (
          <Empty
               image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
               imageStyle={{ height: 100 }}
               description={
               <Button fontSize='sm' label='Upload cover Image'/>
               }
          >
          </Empty>
     )
}

export default CustomEmpty