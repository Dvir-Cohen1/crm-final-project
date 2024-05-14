import { Button, Dropdown, MenuProps } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react'
import { HiBars2, HiBars3, HiBars4 } from "react-icons/hi2";
type TColumnsSizeDropDown = {
     title?: string,
     columnsSize?: SizeType,
     ColumnsSizeDropDownItems?: any
     onClickFunction: Function
}



const ColumnsSizeDropDown = ({ title = 'Columns Size', columnsSize = 'small', onClickFunction }: TColumnsSizeDropDown) => {

     // return key based on columnsSize for default selected
     const generateDefaultSelectedKeys = () => {
          switch (columnsSize) {
               case 'small':
                    return '1'

               case 'middle':
                    return '2'

               case 'large':
                    return '3'

               default:
                    return '1'
          }
     }

     // Dropdown items
     const ColumnsSizeDropDownItems: MenuProps['items'] = [
          {
               key: '1',
               label: (
                    <div onClick={() => onClickFunction('small')}>
                         Single
                    </div>
               ),
               icon: <HiBars2 />,
          },
          {
               key: '2',
               label: (
                    <div onClick={() => onClickFunction('middle')}>
                         Double
                    </div>
               ),
               icon: <HiBars3 />,
          },
          {
               key: '3',
               label: (
                    <div onClick={() => onClickFunction('large')}>
                         Triple
                    </div>
               ),
               icon: <HiBars4 />,
          },
     ];



     return <Dropdown
          trigger={['click']}
          menu={{
               items: ColumnsSizeDropDownItems,
               selectable: true,
               defaultSelectedKeys: [generateDefaultSelectedKeys()],
          }}
     >
          <Button
               type='text'
               size='middle'
               className='flex items-center gap-2 '
          >
               {columnsSize === 'small' && <HiBars2 />}
               {columnsSize === 'middle' && <HiBars3 />}
               {columnsSize === 'large' && <HiBars4 />}

               {title}

          </Button>
     </Dropdown>
}

export default ColumnsSizeDropDown