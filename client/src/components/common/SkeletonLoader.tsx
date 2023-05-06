import React from 'react'
import { Skeleton } from 'antd';


type LoaderProps = {
     isLoading?: boolean
     amount?: number
}


const SkeletonLoader = ({ isLoading, amount = 1 }: LoaderProps) => {
     const skeletons = [];
     for (let i = 0; i < amount; i++) {
          skeletons.push(
               <Skeleton
                    key={i}
                    loading={isLoading}
                    active
                    paragraph={{ rows: 4 }}
                    avatar
               />
          );
     }
     return (
          <>
               {skeletons}
          </>
     )
}

export default SkeletonLoader