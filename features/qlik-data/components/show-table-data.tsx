"use client";

import { fetchTableRowsPage } from "@/features/qix/fetch-table-rows-page";
import { QlikDataTableResponseType, QlikDataTableType } from "@/features/types";
import { useQlikStore } from "@/hooks/qlik-store";

import { useEffect, useState } from "react";
import { DataTable } from "./(data-table)/data-table";
import { columns } from "./(data-table)/columns";

export const ShowTableData = () => {
  const qDoc = useQlikStore((s) => s.qDoc);

  const [data, setData] = useState<{
    count: number;
    values: QlikDataTableType[] | undefined;
    totalRows: number;
  }>();

  useEffect(() => {
    async function fetchData() {
      const { count, rows, totalRows } = await fetchTableRowsPage<
        QlikDataTableResponseType[]
      >({
        qDoc,
        tableObjectId: "QyKt",
      });
      setData({
        count,
        totalRows,
        values:
          rows.map((row) => ({
            WO: row.WO,
            description: row["Desc."],
            polSub: row["Pol. Sub."],
            program: row.Program,
            scheduledGroup: row["SCHD GRP"],
            status: row["WO Status"],
            statusDate:
              row["Status Date"] === "-"
                ? null
                : new Date(row["Status Date"]).toISOString(),
            type: row["WO Type"],
            workGroup: row["Wrk Grp"],
          })) || [],
      });
    }

    if (qDoc) {
      console.log("fetch data", qDoc);
      fetchData();
    }
  }, [qDoc]);

  return (
    <div>
      <h1>Qlik Table Data</h1>
      <DataTable columns={columns} data={data?.values || []} />
    </div>
  );
};
