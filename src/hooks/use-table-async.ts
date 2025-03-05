import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServerMessage } from "@/services/types";
import toast from "react-hot-toast";
import { debounce } from "lodash";

interface AnyObject {
  [key: string]: any;
}

export interface FetchDataOptions {
  skip: number;
  take: number;
  keyword?: string;
  stockUuid?: string; // Ajoutez stockUuid ici
  uuid?: string;
  sortBy?: {
    role?: "ASC" | "DESC";
    email?: "ASC" | "DESC";
    firstName?: "ASC" | "DESC";
    lastName?: "ASC" | "DESC";
    name?: "ASC" | "DESC";
    company?: "ASC" | "DESC";
    country?: "ASC" | "DESC";
    address?: "ASC" | "DESC";
    city?: "ASC" | "DESC";
  };
}

export function useTableAsync<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  fetchData: (options: FetchDataOptions) => Promise<{ data: T[], totalCount: number } | ServerMessage>,
  initialFilterState?: Partial<Record<string, any>>,
  stockUuid?: string, // Ajoutez stockUuid ici,
  uuid?:string
) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermForServer, setSearchTermForServer] = useState<string>("");
  const [filters, setFilters] = useState<AnyObject>(initialFilterState || {});

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.uuid));
    }
  };

  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });
  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return sortData(data, sortConfig.key, sortConfig.direction);
  }, [sortConfig, data]);

  function handleSort(key: string) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  function handleSearch(searchValue: string) {
    setSearchTerm(searchValue);
  }

  function searchedData() {
    return sortedData;
  }

  function handleReset() {
    setData(initialData);
    handleSearch("");
    setFilters(initialFilterState || {});
  }

  function updateFilter(key: string, value: any) {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  }

  function applyFilters() {
    let filteredData = data;
    // Todo: Implement filter logic with backend
    /*Object.keys(filters).forEach((key) => {
      filteredData = filteredData.filter((item) =>
          isString(filters[key])
              ? String(item[key]).toLowerCase().includes(String(filters[key]).toLowerCase())
              : item[key] === filters[key]
      );
    });*/
    return filteredData;
  }

  const handleDelete = useCallback((id: string | string[]) => {
    setData((data) => {
      console.log({ data })
      return Array.isArray(id)
        ? data.filter((item) => !id.includes(item.uuid))
        : data.filter((item) => item.uuid !== id);
    });
  }, [data]);

  const isFiltered = useMemo(() => Object.keys(filters).length > 0, [filters]);
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();
  const paginatedData = (data: T[]) => {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;
    return data; /*.slice(start, end)*/
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const result = await fetchData({
        skip: (currentPage - 1) * countPerPage,
        take: countPerPage,
        keyword: searchTermForServer,
        stockUuid: stockUuid, // Ajoutez stockUuid ici
        uuid: uuid
      });
      if ("statusCode" in result) {
        toast.error(result.message)
        setData([]);
      } else {
        setData(result.data);
        setTotalItems(result.totalCount);
      }
      setLoading(false);
    };
    fetchDataAsync();
  }, [currentPage, countPerPage, searchTermForServer, fetchData, stockUuid]); // Ajoutez stockUuid ici

  useEffect(() => {
    // convert handleSearch to debounce
    const handleSearch = debounce((keyword: string) => {
      setSearchTermForServer(keyword);
    }, 500);
    handleSearch(searchTerm);
  }, [searchTerm]);

  return {
    isLoading,
    tableData: paginatedData(filteredAndSearchedData),
    currentPage,
    totalItems,
    handlePaginate: setCurrentPage,
    handleSort,
    sortConfig,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    searchTerm,
    handleSearch,
    handleReset,
    updateFilter,
    isFiltered,
    filters,
    handleDelete,
    setSelectedRowKeys,
  };
}