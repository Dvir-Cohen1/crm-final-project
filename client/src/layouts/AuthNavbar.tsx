import React from 'react'
import AppLogo from '@/components/common/AppLogo'
const AuthNavbar = () => {
     return (
          <nav className='bg-navBackgroundColor-primary border-b border-borderColor-primary h-14 flex place-items-center items-center'>
               <AppLogo className="font-semibold" fontSize='xl' title="CRM" />
          </nav>
     )
}

export default AuthNavbar