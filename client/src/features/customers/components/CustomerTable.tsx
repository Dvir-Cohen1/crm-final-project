import React, { useEffect, useState } from 'react';
import { Button, Input, Row, Space, Table, TableProps } from 'antd';
import type { FilterValue, SortOrder, SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '../redux/customerSlice';
import { RootState } from '@/types/global';
import { EXCLUDED_CUSTOMERS_TABLE_COLUMNS } from '../constants/tabels';
import { FaSortAlphaUp, FaSortAlphaUpAlt, FaFilter } from "react-icons/fa";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type CustomerColumn = {
  title: string;
  dataIndex: string;
  key: string;
  filters: { text: any; value: any }[];
  filteredValue: FilterValue | null;
  onFilter: (value: any, record: any) => boolean;
  sortOrder: SortOrder | undefined;
  ellipsis: boolean;
};

const generateColumns = (
  customers: any,
  customersKeysArray: string[],
  filteredInfo: Record<string, FilterValue | null>,
  sortedInfo: SorterResult<DataType>
): CustomerColumn[] => {

  return customersKeysArray
    .filter(column => EXCLUDED_CUSTOMERS_TABLE_COLUMNS.includes(column))
    .map<CustomerColumn>(column => {
      const uniqueValues = Array.from(
        new Set(customers.map((customer: any) => customer[column]))
      ).filter(value => value !== undefined && value !== null);

      return {
        title: column,
        dataIndex: column,
        key: column,
        filters: uniqueValues.map(value => ({ text: value, value })),
        filteredValue: filteredInfo[column] || null,
        sorter: (a: any, b: any) => {
          const aValue = a[column];
          const bValue = b[column];

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }

          return aValue.localeCompare(bValue);
        },
        onFilter: (value: any, record: any) => record[column]?.toString() === value,
        sortOrder: sortedInfo.columnKey === column ? sortedInfo.order : undefined,
        ellipsis: true,
      };
    });
};

const CustomerTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { customers, isLoading } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const customersKeysArray = Object.keys(customers[0]);

  useEffect(() => {
    dispatch<any>(getAllCustomers());
  }, []);

  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'name',
    });
  };
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <Space className='w-full flex justify-between' style={{ marginBottom: 16 }}>
        <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />

        <div className='flex gap-2'>
          <Button type='ghost' size='middle' className='flex items-center gap-2 custom-ghost-button' onClick={setAgeSort}><FaSortAlphaUp /> Sort Name</Button>
          <Button type='ghost' size='middle' className='flex items-center gap-2 custom-ghost-button' onClick={clearFilters}><FaSortAlphaUpAlt /> Clear filters</Button>
          <Button type='ghost' size='middle' className='flex items-center gap-2 custom-ghost-button' onClick={clearAll}> <FaFilter /> Clear filters and sorters</Button>
        </div>

      </Space>
      <Table size='small'
        scroll={{ x: 1500 }}
        bordered
        loading={isLoading}
        columns={generateColumns(customers, customersKeysArray, filteredInfo, sortedInfo)}
        dataSource={customers}
        onChange={handleChange}
      />
    </>
  );
};

export default CustomerTable;
