"use client";

import { useCallback, useEffect } from "react";
import { parseAsJson, useQueryStates } from "nuqs";
import { parseAsArrayOf, parseAsString, parseAsInteger } from "nuqs";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useGetData } from "../api/use-get-data";
import z from "zod";

interface UseQlikDataTableOptions {
  enableAdvancedFilter?: boolean;
  debounceMs?: number;
}

const SortSchema = z.array(z.object({
  id: z.string(),
  desc: z.boolean(),
})).optional();

const FilterSchema = z.array(z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
})).optional();

export function useQlikeSearchData<TData>(options: UseQlikDataTableOptions = {}) {
  const { enableAdvancedFilter = true, debounceMs = 300 } = options;

  // Query states for URL synchronization - using the same keys as the data table
  const [queryStates, setQueryStates] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    sort: parseAsJson(SortSchema.parse).withDefault([]),
    filters: parseAsJson(FilterSchema.parse).withDefault([]),
    WO: parseAsString.withDefault("")
  });

  // Parse complex filter and sort objects from URL
  const parseFilters = useCallback(() => {
    if (!queryStates.filters) return {};

    const filterParams: Record<string, string[]> = {};

    try {
      queryStates.filters.forEach((filter) => {
        if (filter.id && filter.value !== undefined) {
          if (Array.isArray(filter.value)) {
            filterParams[filter.id] = filter.value;
          } else {
            filterParams[filter.id] = [filter.value];
          }
        }
      });
    } catch (error) {
      console.error("Error parsing filters:", error);
    }

    return filterParams;
  }, [queryStates.filters]);

  // const parseSorting = useCallback(() => {
  //   if (!queryStates.sort || queryStates.sort.length === 0) return { sortBy: "WO", sortOrder: "asc" as const };

  //   try {
  //     const sortObj = typeof queryStates.sort[0] === 'string' ? JSON.parse(queryStates.sort[0]) : queryStates.sort[0];
  //     return {
  //       sortBy: sortObj.id || "WO",
  //       sortOrder: sortObj.desc ? "desc" as const : "asc" as const
  //     };
  //   } catch (error) {
  //     console.error("Error parsing sorting:", error);
  //     return { sortBy: "WO", sortOrder: "asc" as const };
  //   }
  // }, [queryStates.sort]);

  const filterParams = parseFilters();
  console.log(queryStates.WO)
  // const sortParams = parseSorting();
  // console.log(typeof sortParams, sortParams.sortBy)

  // Fetch data from server
  const { data, isLoading, error } = useGetData({
    page: queryStates.page,
    pageSize: queryStates.pageSize,
    woFilter: filterParams.WO?.[0] || undefined,
    statusFilter: filterParams.status || undefined,
    typeFilter: filterParams.type || undefined,
    programFilter: filterParams.program || undefined,
    workGroupFilter: filterParams.workGroup || undefined,
    // sortBy: sortParams.sortBy,
    // sortOrder: sortParams.sortOrder,
  });

  // Function to update filters from data table
  // const updateFilters = useCallback((filters: ColumnFiltersState) => {
  //   const filterString = JSON.stringify(filters);
  //   setQueryStates({ filters: filterString, page: 1 });
  // }, [setQueryStates]);

  // // Function to update sorting from data table
  // const updateSorting = useCallback((sorting: SortingState) => {
  //   if (sorting.length > 0) {
  //     const sortStrings = sorting.map(sort => JSON.stringify(sort));
  //     setQueryStates({ sort: sortStrings, page: 1 });
  //   }
  // }, [setQueryStates]);

  return {
    data: data?.values || [],
    totalPages: Math.ceil(data?.totalRows / queryStates.pageSize),
    isLoading,
    error,
    queryStates,
    // updateFilters,
    // updateSorting,
    filterParams,
    // sortParams,
    enableAdvancedFilter,
    debounceMs,
  };
}
