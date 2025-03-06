"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useColumn } from "@/hooks/use-column";
import { useTableAsync } from "@/hooks/use-table-async";
import { fetchUsers, deleteUser } from "./actions";
import { User } from "@/services/types/user";
import { getColumns } from "./columns";
import toast from "react-hot-toast";
import ControlledTable from "@/components/controlled-table";

const TableFooter = dynamic(() => import("@/components/table-footer"), {
  ssr: false,
});

export default function UsersTable() {
  const [pageSize, setPageSize] = useState(10) ;
    
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
    handleDelete,
    updateFilter,
    isFiltered,
    filters,
    setSelectedRowKeys,
  } = useTableAsync<User>([], pageSize, fetchUsers, {});

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(async (id: string) => {
    try {
        // @ts-ignore
      const response = await deleteUser(id);
      if (response.message === "User deleted successfully") {
        toast.success("Utilisateur supprimé avec succès");
        handleDelete(id);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Échec de la suppression de l'utilisateur");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMultipleDelete = async (ids: string[]) => {
    try {
      await Promise.all(ids.map(async (id) => {
        const response = await deleteUser(id);
        if (response.message !== "User deleted successfully") {
          throw new Error(`Failed to delete user ${id}`);
        }
      }));
      toast.success("Utilisateurs supprimés avec succès");
      setSelectedRowKeys([]);
      handleDelete(ids);
    } catch (error) {
      console.error("Failed to delete selected items:", error);
      toast.error("Échec de la suppression des utilisateurs");
    }
  };

  const columns = useMemo(
    () =>
      getColumns({
        data: tableData,
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
    <div className="mt-14 ">
      <ControlledTable
        isAsync={true}
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
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
            handleDelete={handleMultipleDelete}
          />
        }
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
