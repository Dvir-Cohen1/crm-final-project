import React, { useState } from 'react'
import { Select, Space } from 'antd';
import { EXCLUDED_CUSTOMERS_TABLE_COLUMNS } from '../../constants/tables';

// const handleChange = (value: string) => {
//      console.log(`selected ${value}`);
// };

const SortSelect = ({ customersKeysArray,onChange  }: any) => {

     const [selectedColumn, setSelectedColumn] = useState<string | undefined>(customersKeysArray[0]);
     const [selectedSortOrder, setSelectedSortOrder] = useState<string>('descend');

     const handleColumnChange = (value: string) => {
          setSelectedColumn(value);
          onChange(selectedSortOrder, value);
     };

     const handleSortOrderChange = (value: string) => {
          setSelectedSortOrder(value);
          onChange(value, selectedColumn);
     };
     return (
          <Space wrap>
          <Select
            value={selectedColumn}
            style={{ width: 200 }}
            onChange={handleColumnChange}
            options={customersKeysArray.filter((column: any) => EXCLUDED_CUSTOMERS_TABLE_COLUMNS.includes(column)).map((item: any) => ({ value: item, label: item }))}
          />
          <Select
            value={selectedSortOrder}
            style={{ width: 100 }}
            onChange={handleSortOrderChange}
            options={[
              { value: 'desc', label: 'descend' },
              { value: 'asc', label: 'ascend' },
            ]}
          />
        </Space>
     )
}

export default SortSelect