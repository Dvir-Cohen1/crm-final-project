import React, { useEffect, useState } from 'react';
import { RootState, SorterResultDataType } from '@/types/global';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Input, Space, Table, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from '../redux/customerSlice';
import { FaSortAlphaUp, FaSortAlphaUpAlt, FaFilter } from "react-icons/fa";
import { generateColumns } from '../utils/tables';

const CustomerTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<SorterResultDataType>>({});
  const { customers, isLoading } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const customersKeysArray = Object.keys(customers[0]);

  useEffect(() => {
    dispatch<any>(getAllCustomers());
  }, [dispatch]);

  const handleChange: TableProps<SorterResultDataType>['onChange'] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<SorterResultDataType>);
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



  const customerSortButton = [
    { id: 1, label: 'Sort Name', icon: <FaSortAlphaUp />, onClick: setAgeSort },
    { id: 2, label: 'Clear filters', icon: <FaSortAlphaUpAlt />, onClick: clearFilters },
    { id: 3, label: 'Clear filters and sorters', icon: <FaFilter />, onClick: clearAll },
  ]


  return (
    <>
      <Space className='w-full flex justify-between' style={{ marginBottom: 16 }}>
        <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />
        <div className='flex gap-2'>
          {customerSortButton?.map(button => {
            return <Button
              key={button.id}
              type='ghost'
              size='middle'
              className='flex items-center gap-2 custom-ghost-button'
              onClick={button.onClick}
            >
              <FaSortAlphaUp />
              {button.label}
            </Button>
          })}
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
