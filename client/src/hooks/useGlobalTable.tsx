import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface TableDataItem {
     // Define your table data item type here
}

interface GlobalTableHookProps {
     initialData: TableDataItem[];
}

interface GlobalTableHookState {
     filteredInfo: Record<string, FilterValue | null>;
     sortedInfo: SorterResult<TableDataItem> | null;
     data: TableDataItem[];
     handleChange: (pagination: any, filters: any, sorter: SorterResult<TableDataItem>) => void;
     clearFilters: () => void;
     clearAll: () => void;
}

const useGlobalTable = ({ initialData }: GlobalTableHookProps): GlobalTableHookState => {
     const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
     const [sortedInfo, setSortedInfo] = useState<SorterResult<TableDataItem> | null>(null);
     const [data, setData] = useState<TableDataItem[]>(initialData);

     const handleChange = (pagination: any, filters: any, sorter: SorterResult<TableDataItem>) => {
          setFilteredInfo(filters);
          setSortedInfo(sorter);
     };

     const clearFilters = () => {
          setFilteredInfo({});
     };

     const clearAll = () => {
          setFilteredInfo({});
          setSortedInfo(null); // Updated to null
     };

     return {
          filteredInfo,
          sortedInfo,
          data,
          handleChange,
          clearFilters,
          clearAll,
     };
};

export default useGlobalTable;
