import { useEffect, useState } from 'react';

interface Status {
  key: string;
  label: JSX.Element;
  color: string;
}

const useNormalizeStatusesArray = (tasksStatuses: any, handleChangeStatus: Function): Status[] => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    const normalizeStatusesArray = (statusesData: any[]): Status[] => {
      let normalizedStatuses: Status[] = [];
      statusesData?.forEach((status) => {
        normalizedStatuses.push({
          key: status._id,
          label: (
            <span className='px-4 w-full' onClick={() => handleChangeStatus(status._id)} style={{ borderLeft: `3px solid ${status.color}` }}>
              {status.label}
            </span>
          ),
          color: status.color,
        });
      });
      return normalizedStatuses;
    };

    const normalized = normalizeStatusesArray(tasksStatuses);
    setStatuses(normalized);
  }, [tasksStatuses]);

  return statuses;
};

export default useNormalizeStatusesArray;
