import React from 'react'
import SecondaryItems from './components/SecondaryItems';
import MainItems from './components/MainItems';
import Link from 'next/link';

const Navbar = () => {
     return (
          <nav className='flex justify-between lg:items-center border-b border-[#091e4224] px-4'>
               <MainItems />
               <SecondaryItems />
          </nav>
     )
}

export default Navbar