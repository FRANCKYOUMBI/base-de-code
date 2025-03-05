"use client";

import React from "react";
import dynamic from "next/dynamic";
import isEmpty from "lodash/isEmpty";
import type { TablePaginationProps } from "@/components/controlled-table/table-pagination";
import type { TableFilterProps } from "@/components/controlled-table/table-filter";
import Table, { TableProps } from "@/components/table";
import cn from "@/ui/class-names";

const TableFilter = dynamic(() => import("@/components/controlled-table/table-filter"), {
  ssr: false,
});
const TablePagination = dynamic(
  () => import("@/components/controlled-table/table-pagination"),
  { ssr: false }
);

type ControlledTableProps = {
  isLoading?: boolean;
  isAsync?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
  t?: (key: string) => string | undefined;
} & TableProps;

export default function ControlledTable({
  isLoading,
  isAsync,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  data,
  t,
  ...tableProps
}: ControlledTableProps) {

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div className="relative">
        <Table
          isLoading={isLoading}
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          data={isLoading ? Array(paginatorOptions?.pageSize ?? 10).fill(0).map((_, index) => ({})) : data}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          t={t}
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
}
