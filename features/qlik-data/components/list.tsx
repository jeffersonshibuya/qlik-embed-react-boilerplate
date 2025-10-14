"use client";

import { DataTable } from "@/components/data-table/data-table"; // path depends on where DiceUI generated it
import { useDataTable } from "@/hooks/use-data-table";
import { columns } from "./(data-table)/columns";
import { useEffect, useState } from "react";
import { fetchTableRowsPage } from "@/features/qix/fetch-table-rows-page";
import { QlikDataTableResponseType, QlikDataTableType } from "@/features/types";
import { useQlikStore } from "@/hooks/qlik-store";
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { format } from "date-fns";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { useGetData } from "../api/use-get-data";
import { useQlikDataTable } from "@/hooks/use-qlik-data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useQlikeSearchData } from "../hooks/use-qlik-search-data";
import { DataTableFilterMenu } from "@/components/data-table/data-table-filter-menu";

export default function QlikDataTable<TData>() {
  const {
    data,
    totalPages,
    isLoading,
    error,
    queryStates,
    // updateFilters,
    // updateSorting,
    filterParams,
    // sortParams,
  } = useQlikeSearchData({
    debounceMs: 200
  });

  // const [dataResponse, setDataResponse] = useState<{
  //   count: number;
  //   values: QlikDataTableType[] | undefined;
  //   totalRows: number;
  // }>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const { count, rows, totalRows } = await fetchTableRowsPage<
  //         QlikDataTableResponseType[]
  //       >({
  //         qDoc,
  //         tableObjectId: "QyKt",
  //         page,
  //         pageSize,
  //       });

  //       setDataResponse({
  //         count,
  //         totalRows,
  //         values:
  //           rows.map((row) => {
  //             const statusDate =
  //               row["Status Date"] === "-" ? null : row["Status Date"];
  //             const year = parseInt((statusDate || "").slice(0, 4), 10);
  //             const month = parseInt((statusDate || "").slice(4, 6), 10) - 1;
  //             const day = parseInt((statusDate || "").slice(6, 8), 10);
  //             return {
  //               WO: row.WO,
  //               description: row["Desc."],
  //               polSub: row["Pol. Sub."],
  //               program: row.Program,
  //               scheduledGroup: row["SCHD GRP"],
  //               status: row["WO Status"],
  //               statusDate: format(
  //                 new Date(`${year}/${month}/${day}`),
  //                 "MMM dd, yyyy"
  //               ),
  //               type: row["WO Type"],
  //               workGroup: row["Wrk Grp"],
  //             };
  //           }) || [],
  //       });
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         if (error.message === "Session suspended") {
  //           console.log("reconect");
  //           // await reconnect();
  //         }
  //         console.log("Failed to fetch data", error.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (qDoc) {
  //     fetchData();
  //   }
  // }, [qDoc]);

  const { table } = useDataTable({
    data: data as TData[],
    columns: columns as ColumnDef<TData>[],
    pageCount: totalPages,
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={7}
        filterCount={2}
        cellWidths={[
          "10rem",
          "30rem",
          "10rem",
          "10rem",
          "6rem",
          "6rem",
          "6rem",
        ]}
        shrinkZero
      />
    );
  }

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableFilterMenu table={table} />
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
