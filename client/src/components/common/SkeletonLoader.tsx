import React from 'react'
import {Skeleton } from 'antd';


type LoaderProps = {
	isLoading?: boolean
}


const SkeletonLoader = ({ isLoading }: LoaderProps) => {
  return (
     <>
     <Skeleton
          loading={isLoading}
          active
          paragraph={{ rows: 4 }}
          avatar>
     </Skeleton>
     <br />
     <br />
     <Skeleton
          loading={isLoading}
          active
          round={false}
          paragraph={{ rows: 4 }}
          avatar>

     </Skeleton>
</>
  )
}

export default SkeletonLoader