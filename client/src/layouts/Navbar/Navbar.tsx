import React from 'react'
import SecondaryItems from './components/SecondaryItems';
import MainItems from './components/MainItems';
import Link from 'next/link';

const Navbar = () => {
     return (
          <nav className='flex items-center shadow shadow-shadowColor px-4'>
               <MainItems />
               <SecondaryItems />
          </nav>
     )
}

export default Navbar