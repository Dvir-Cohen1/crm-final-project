import { Button, Popover } from 'antd'
import React from 'react'
import { HiPlusSmall, HiOutlineArrowsUpDown } from "react-icons/hi2";

type TSortDropDown = {
     title?: string,
     ButtonTitle?: string,
     icon?: any,
     clearAll: Function
}


const SortDropDown = ({ title = "Sort by", ButtonTitle = 'Sort', icon = <HiOutlineArrowsUpDown />, clearAll }: TSortDropDown) => {
     const SortDropDownContent = (
          <div className='w-72'>
               <div className='flex justify-between place-items-center mb-3'>
                    <span className='font-semibold'>
                         {title}
                    </span>
                    <Button type='link' className='text-xs' onClick={() => clearAll()}>
                         Clear All
                    </Button>
               </div>
               <div>
                    <p>
                         {ButtonTitle} your items by priority, creation date, price or
                         <br />
                         any column you have on your board.
                    </p>
                    <Button
                         className='flex items-center gap-2'
                         type='text'
                         size='middle'>
                         <HiPlusSmall />
                         Add new {ButtonTitle.toLocaleLowerCase()}
                    </Button>
               </div>
          </div>
     );
     return (
          <Popover placement="bottomRight" content={SortDropDownContent} trigger="click">
               <Button
                    type='text'
                    size='middle'
                    className='flex items-center gap-2 '
               >
                    {icon}
                    {ButtonTitle}
               </Button>
          </Popover>
     )

}

export default SortDropDown