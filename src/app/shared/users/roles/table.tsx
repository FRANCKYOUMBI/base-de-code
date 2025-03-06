"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useColumn } from "@/hooks/use-column";
import { useTableAsync } from "@/hooks/use-table-async.ts";
import { fetchRoles } from "./action";
import { getColumns } from "./columns";
import ControlledTable from "@/components/controlled-table";
// import { getColumns } from "./columns";

const TableFooter = dynamic(() => import("@/components/table-footer"), {
  ssr: false,
});

export const rolesList = [
  {
    uuid: 1,
    name: "admin",
    description: "Administrateur",
  },
  {
    uuid: 2,
    name: "manager",
    description: "Gestionnaire",
  },
  {
    uuid: 3,
    name: "sales",
    description: "Vendeur(se)",
  },
];

export  function RolesTable() {
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
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
    //@ts-ignore
    
  } = useTableAsync<any>([], pageSize,fetchRoles, {});

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        data: rolesList,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);
  return (
    <ControlledTable
      isAsync={true}
      variant="modern"
      isLoading={isLoading}
      showLoadingText={true}
      data={rolesList}
      // @ts-ignore
      columns={visibleColumns}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: (page: number) => handlePaginate(page),
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch("");
        },
        onSearchChange: (event) => {
          handleSearch(event.target.value);
        },
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
        enableDrawerFilter: true,
      }}
      tableFooter={
        <TableFooter
          checkedItems={selectedRowKeys}
          handleDelete={(ids: string[]) => {
            setSelectedRowKeys([]);
            handleDelete(ids);
          }}
        ></TableFooter>
      }
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
}
