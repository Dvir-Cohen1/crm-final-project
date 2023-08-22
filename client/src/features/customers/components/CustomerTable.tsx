import React, { useEffect, useState } from 'react';
import { RootState, SorterResultDataType } from '@/types/global';
import type { FilterValue, SortOrder, SorterResult } from 'antd/es/table/interface';
import { Button, Input, Space, Table, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers, searchCustomers } from '../redux/customerSlice';
import { generateColumns } from '../utils/tables';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { HiOutlineFunnel } from "react-icons/hi2";
import ColumnsSizeDropDown from './tables/ColumnsSizeDropDown';
import SortDropDown from './tables/SortDropDown';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localstorage';
import { useRouter } from 'next/router';

const CustomerTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<SorterResultDataType>>({});
  const { customers, isLoading } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const customersKeysArray = Object.keys(customers[0] || {});
  const nextRouter = useRouter()

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

  const setSort = (order: SortOrder = 'descend', columnKey: string = 'name') => {
    setSortedInfo({
      order: order,
      columnKey: columnKey,
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


  const [columnsSize, setColumnsSize] = useState<SizeType>(getLocalStorageItem('columnsSize') || 'small');

  const handleSetColumnsSize = (size: SizeType = 'small') => {
    setLocalStorageItem('columnsSize', size)

    setColumnsSize(size)
  }

  const customerSortButton = [
    // { id: 1, title: 'sort', label: 'Sort', icon: sortedInfo.order === 'descend' ? <HiOutlineArrowsUpDown /> : <HiBarsArrowUp />, onClick: setAgeSort },
    // { id: 2, label: 'Clear filters', icon: <HiBars2 />, onClick: clearFilters },
    // { id: 3, title: 'Clear all', label: 'Clear all', icon: <HiOutlineFunnel />, onClick: clearAll },
    // { id: 4, label: 'Columns size', icon: <HiBars2 />, onClick: handleSetColumnsSize },
    // { id: 5, title: 'Change columns size', label: 'Columns size', icon: columnsSize === 'small' ? <HiBars3 /> : <HiBars2 />, onClick: handleSetColumnsSize },
    { id: 1, isDropdown: true, component: <SortDropDown setSort={setSort} customersKeysArray={[]} title='Filter by' ButtonTitle={'Filter'} icon={<HiOutlineFunnel />} clearAll={clearFilters} />, title: 'Filter', label: 'Filter', icon: '', onClick: () => { } },
    { id: 2, isDropdown: true, component: <SortDropDown setSort={setSort} customersKeysArray={customersKeysArray} clearAll={clearAll} />, title: 'Sort', label: 'Sort', icon: '', onClick: () => { } },
    { id: 3, isDropdown: true, component: <ColumnsSizeDropDown columnsSize={columnsSize} onClickFunction={handleSetColumnsSize} />, title: 'Change columns size', label: 'Columns size' },
  ]

  return (
    <>
      <Space className='w-full flex justify-between' style={{ marginBottom: 16 }}>
        <Input.Search className='no-search-icon' enterButton={false} placeholder="Search" onSearch={onSearch} allowClear style={{ width: 200 }} />
        <div className='flex gap-2'>

          {customerSortButton?.map(button => {
            if (button.isDropdown === true) {
              return (

                <div key={button.id}>
                  {button.component}
                </div>
              )
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
        // dataSource={customers}
        dataSource={customers?.map((customer: any) => ({ ...customer, key: customer._id }))}
        // rowKey={(record: { id: string }) => record.id}
        onChange={handleChange}
        onRow={(record: any) => ({
          onClick: () => {
            // Use Next.js Link to navigate to the customer details page
            // Replace 'customerId' with the actual parameter name and record.id with the customer's ID
            nextRouter.push(`/customers/${record._id}`)
          },
        })}
      />
    </>
  );
};

export default CustomerTable;
