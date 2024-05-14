import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { EXCLUDED_CUSTOMERS_TABLE_COLUMNS } from "../constants/tables";
import { CustomerColumn, SorterResultDataType } from "@/types/global";

export const generateColumns = (
  customers: any,
  customersKeysArray: string[],
  filteredInfo: Record<string, FilterValue | null>,
  sortedInfo: SorterResult<SorterResultDataType>
): CustomerColumn[] => {
  return customersKeysArray
    .filter((column) => EXCLUDED_CUSTOMERS_TABLE_COLUMNS.includes(column))
    .map<CustomerColumn>((column) => {
      const uniqueValues = Array.from(
        new Set(customers.map((customer: any) => customer[column]))
      ).filter((value) => value !== undefined && value !== null);

      return {
        title: column,
        dataIndex: column,
        key: column,
        filters: uniqueValues.map((value) => ({ text: value, value })),
        filteredValue: filteredInfo[column] || null,
        sorter: (a: any, b: any) => {
          const aValue = a[column];
          const bValue = b[column];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
          }

          return aValue.localeCompare(bValue);
        },
        onFilter: (value: any, record: any) =>
          record[column]?.toString() === value,
        sortOrder:
          sortedInfo.columnKey === column ? sortedInfo.order : undefined,
        ellipsis: true,
      };
    });
};
