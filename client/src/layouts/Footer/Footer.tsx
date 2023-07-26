import React from 'react'

const Footer = () => {
     const currentDate = new Date();
     const currentYear = currentDate.getFullYear();
     return (
          <footer className='mt-auto'>
               <div className='mt-14'>
                    <p>&copy; {currentYear} Dvir Cohen - All rights reserved.</p>
               </div>
          </footer>
     )
}

export default Footer