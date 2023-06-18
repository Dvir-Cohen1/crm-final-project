import React from 'react'

const Footer = () => {
     const currentDate = new Date();
     const currentYear = currentDate.getFullYear();
     return (
          <footer className='mt-auto'>
               <p>&copy; {currentYear} Dvir Cohen - All rights reserved.</p>
          </footer>
     )
}

export default Footer