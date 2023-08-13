import React, { useEffect, useState } from 'react';
import { RootState, SorterResultDataType } from '@/types/global';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Input, Space, Table, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers, searchCustomers } from '../redux/customerSlice';
import { generateColumns } from '../utils/tables';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { HiOutlineFunnel } from "react-icons/hi2";
import ColumnsSizeDropDown from './tables/ColumnsSizeDropDown';
import SortDropDown from './tables/SortDropDown';


const CustomerTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<SorterResultDataType>>({});
  const { customers, isLoading } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const customersKeysArray = Object.keys(customers[0] || {});

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

  const onSearch = (keywords: string) => {

    if (keywords.length === 0) {
      return dispatch<any>(getAllCustomers());
    }

    if (keywords.length <= 1) {
      return
    }
    dispatch<any>(searchCustomers(String(keywords)));
  }

  const [columnsSize, setColumnsSize] = useState<SizeType>('small');

  const handleSetColumnsSize = (size: SizeType = 'small') => {
    setColumnsSize(size)
  }

  const customerSortButton = [
    { id: 1, isDropdown: true, component: <SortDropDown title='Filter by' ButtonTitle={'Filter'} icon={<HiOutlineFunnel />} clearAll={clearFilters} />, title: 'Filter', label: 'Filter', icon: '', onClick: () => { } },
    { id: 2, isDropdown: true, component: <SortDropDown clearAll={clearAll} />, title: 'Sort', label: 'Sort', icon: '', onClick: () => { } },
    { id: 3, isDropdown: true, component: <ColumnsSizeDropDown columnsSize={columnsSize} onClickFunction={handleSetColumnsSize} />, title: 'Change columns size', label: 'Columns size' },
  ]

  return (
    <>
      <Space className='w-full flex justify-between' style={{ marginBottom: 16 }}>
        <Input.Search className='no-search-icon' enterButton={false} placeholder="Search" onSearch={onSearch} allowClear style={{ width: 200 }} />
        <div className='flex gap-2'>

          {customerSortButton?.map(button => {
            if (button.isDropdown === true) {
              return button.component
            }

            return <Button
              key={button.id}
              title={button.title}
              type='text'
              size='middle'
              className='flex items-center gap-2 '
              onClick={() => button.onClick && button.onClick()}
            >
              {button.icon}
              <span style={{ color: '#172B4D' }}>
                {button.label}
              </span>
            </Button>
          })}
        </div>
      </Space>
      <Table size={columnsSize}
        scroll={{ x: 1500 }}
        rowSelection={{}}
        bordered={true}
        loading={isLoading}
        columns={generateColumns(customers, customersKeysArray, filteredInfo, sortedInfo)}
        dataSource={customers}
        onChange={handleChange}
      />
    </>
  );
};

export default CustomerTable;
