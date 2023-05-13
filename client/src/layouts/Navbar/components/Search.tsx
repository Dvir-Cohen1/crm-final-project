
import { Input, Tooltip } from 'antd'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const searchHotKeySpan = () => {
     return (
          <span>click <span className='bg-slate-600 rounded-sm mx-1 px-1'> . </span>to open search panel</span>
     )
}

const Search = () => {
     const [searchInputWidth, setSearchInputWidth] = useState(180);
     const [dotPressed, setDotPressed] = useState(false);

     const handleKeyDown = (event: any) => {
          if (event.key === ".") {
               setDotPressed(true);
               alert(`Clicked ${event.key}`)
               // perform your action here
          }
     };


     return (
          <>
               <Tooltip arrow={false} title={searchHotKeySpan}>
                    <Input
                         onKeyDown={handleKeyDown}
                         className='hidden lg:flex main-search-input'
                         placeholder="Search"
                         suffix={<FaSearch />}
                         onFocus={() => setSearchInputWidth(500)}
                         onBlur={() => setSearchInputWidth(180)}
                         style={{ borderRadius: "4px", width: searchInputWidth }}
                    />
               </Tooltip>
          </>
     )
}

export default Search