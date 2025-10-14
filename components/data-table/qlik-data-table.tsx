"use client";

import { useEffect } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { useQlikDataTable } from "@/hooks/use-qlik-data-table";
import { DataTable } from "./data-table";
import { DataTableAdvancedToolbar } from "./data-table-advanced-toolbar";
import { DataTableFilterList } from "./data-table-filter-list";
import { DataTableSortList } from "./data-table-sort-list";
import { DataTableFilterMenu } from "./data-table-filter-menu";
import { DataTableActionBar } from "./data-table-action-bar";
import { DataTableViewOptions } from "./data-table-view-options";
import type { ColumnDef } from "@tanstack/react-table";

interface QlikDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  getRowId: (row: TData) => string;
  enableAdvancedFilter?: boolean;
  debounceMs?: number;
  children?: React.ReactNode;
}

export function QlikDataTable<TData>({
  columns,
  getRowId,
  enableAdvancedFilter = true,
  debounceMs = 300,
  children,
}: QlikDataTableProps<TData>) {
  const {
    data,
    totalPages,
    isLoading,
    error,
    queryStates,
    updateFilters,
    updateSorting,
    filterParams,
    sortParams,
  } = useQlikDataTable({
    enableAdvancedFilter,
    debounceMs,
  });

  const { table } = useDataTable({
    data: data as TData[],
    columns,
    pageCount: totalPages,
    initialState: {
      sorting: [{ id: sortParams.sortBy as Extract<keyof TData, string>, desc: sortParams.sortOrder === "desc" }],
    },
    getRowId,
    // enableAdvancedFilter,
    // debounceMs,
  });



  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse bg-muted rounded" />
          <div className="h-8 w-32 animate-pulse bg-muted rounded" />
        </div>
        <div className="border rounded-lg">
          <div className="h-96 animate-pulse bg-muted" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="text-center text-red-600">
            Error loading data: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterMenu table={table} />
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <DataTableViewOptions table={table} />
        </DataTableAdvancedToolbar>

        {children}

        <DataTableActionBar table={table}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} row(s) selected
            </span>
          </div>
        </DataTableActionBar>
      </DataTable>
    </div>
  );
}
