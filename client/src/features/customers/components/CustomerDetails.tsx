import React from 'react'
import { EXCLUDED_CUSTOMER_FIELDS } from '../constants/fields';

interface CustomerDetailsProps {
     customer: Record<string, any>; // You can specify a more specific type if needed
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
     return (
          <div>
               {Object.keys(customer || {}).filter((item => !EXCLUDED_CUSTOMER_FIELDS.includes(item))).map((item: any, index) => (
                    <div key={index} className='flex gap-2'>
                         <span>{item}</span>:<span className="font-semibold">{customer[item]}</span>
                    </div>
               ))}
          </div>
     )
}

export default CustomerDetails