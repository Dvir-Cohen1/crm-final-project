import React, { ReactNode } from 'react';
import { Button, message, Popconfirm } from 'antd';

const confirm = (e: React.MouseEvent<HTMLElement>) => {
     console.log(e);
     message.success('Click on Yes');
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
     console.log(e);
     message.error('Click on No');
};

type PopConfirmProps = {
     children?: ReactNode,
     title?: string,
     description?: string,
     placement?: any,
     okText?: string,
     cancelText?: string,
     confirm?: Function | undefined | any,
     cancel?: Function | undefined | any,

}


const PopConfirm = ({
     children,
     confirm,
     placement = "topRight",
     title = "delete",
     description = "Are you sure you want to delete",
     okText = "yes",
     cancelText = "no" }: PopConfirmProps) => {
     return (
          <Popconfirm
               onConfirm={() => confirm()}
               onCancel={() => { return }}
               title={title}
               placement={placement}
               description={description}
               okText={okText}
               cancelText={cancelText}
          >
               {children}
               {/* <Button type="link">{ButtonText}</Button> */}
          </Popconfirm>
     )
}

export default PopConfirm