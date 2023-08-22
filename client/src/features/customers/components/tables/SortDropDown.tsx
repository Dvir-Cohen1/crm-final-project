import { Button, Popover, Space } from 'antd'
import React, { useState } from 'react'
import { HiPlusSmall, HiOutlineArrowsUpDown } from "react-icons/hi2";
import SortSelect from './SortSelect';

type TSortDropDown = {
     title?: string,
     ButtonTitle?: string,
     icon?: any,
     clearAll: Function,
     setSort: Function,
     customersKeysArray: any,
}


const MAX_SELECT_SORT = 5

const SortDropDown = ({ title = "Sort by", ButtonTitle = 'Sort', icon = <HiOutlineArrowsUpDown />, clearAll, customersKeysArray, setSort }: TSortDropDown) => {
     const [sortSelectCount, setSortSelectCount] = useState(0); // Initialize the counter to 1


     const addNewSortSelect = () => {
          if (sortSelectCount >= MAX_SELECT_SORT) {
               return
          }

          setSortSelectCount((prevCount: number) => prevCount + 1); // Increment the counter when adding a new component
     };

     const handleSortSelectChange = (sortOrder: string, column: string) => {
          // Do something with the selected sort order and column
          setSort(sortOrder, column)
          // console.log(`Selected Sort Order: ${sortOrder}, Selected Column: ${column}`);
     };

     const sortSelectComponents = Array.from({ length: sortSelectCount }, (_, index) => (
          <SortSelect customersKeysArray={customersKeysArray} key={`sortSelect-${index}`} onChange={handleSortSelectChange} />
     ));


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
               <div className='flex flex-col gap-2'>
                    <p>
                         {ButtonTitle} your items by priority, creation date, price or
                         <br />
                         any column you have on your board.
                    </p>

                    {sortSelectComponents}
                    {sortSelectCount < MAX_SELECT_SORT &&

                         <Button
                              className={`flex items-center gap-2 mb-2 ${sortSelectCount >= 1 ? 'mt-5' : 'mt-2'}`}
                              onClick={addNewSortSelect}
                              type='text'
                              size='middle'>
                              <HiPlusSmall />
                              Add new {ButtonTitle.toLocaleLowerCase()}
                         </Button>

                    }
               </div>
          </div>
     );

     return (
          <Popover placement='bottomRight' content={SortDropDownContent} trigger='click'>
               <Button type='text' size='middle' className='flex items-center gap-2'>
                    {icon}
                    {ButtonTitle}
               </Button>
          </Popover>
     );

}

export default SortDropDown