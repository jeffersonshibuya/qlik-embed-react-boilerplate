"use client"

import { fetchTableRowsPage } from "@/features/qix/fetch-table-rows-page";
import { QlikDataTableResponseType } from "@/features/types";
import { useQlikStore } from "@/hooks/qlik-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface UseQlikDataParams {
  page?: number;
  pageSize?: number;
  woFilter?: string;
  statusFilter?: string[];
  typeFilter?: string[];
  programFilter?: string[];
  workGroupFilter?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const useGetData = (params: UseQlikDataParams = {}) => {
  const { qDoc } = useQlikStore();

  const query = useQuery({
    enabled: !!qDoc,
    queryKey: ["qlik-data", params],
    queryFn: async () => {
      const { count, rows, totalRows } = await fetchTableRowsPage<
        QlikDataTableResponseType[]
      >({ qDoc, tableObjectId: "QyKt", ...params })
      return {
        count,
        totalRows,
        values:
          rows.map((row) => {
            const statusDate =
              row["Status Date"] === "-" ? null : row["Status Date"];
            const year = parseInt((statusDate || "").slice(0, 4), 10);
            const month = parseInt((statusDate || "").slice(4, 6), 10) - 1;
            const day = parseInt((statusDate || "").slice(6, 8), 10);
            return {
              WO: row.WO,
              description: row["Desc."],
              polSub: row["Pol. Sub."],
              program: row.Program,
              scheduledGroup: row["SCHD GRP"],
              status: row["WO Status"],
              statusDate: format(
                new Date(`${year}/${month}/${day}`),
                "MMM dd, yyyy"
              ),
              type: row["WO Type"],
              workGroup: row["Wrk Grp"],
            };
          }) || [],
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return query;
};
