import React, { ReactNode } from 'react'

type SeporatorWrapperProps = {
     title?: string
}

const SeporatorWrapper = ({ title = "" }: SeporatorWrapperProps) => {
     return (
          <div className="flex items-center gap-2 my-8">
               <hr className="border-t w-full" />
               <span className="text-center text-sm text-gray-500 w-full font-medium">{title}</span>
               <hr className="border-t w-full" />
          </div>
     )
}

export default SeporatorWrapper