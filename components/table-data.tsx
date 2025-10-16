"use client";

import { useEffect, useState } from "react";
import { useQlikStore } from "@/hooks/qlik-store";
import { Button } from "@/components/ui/button";

interface QlikTableProps {
  objectId: string; // Qlik object ID (table)
}

export const TableData = ({ objectId }: QlikTableProps) => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20; // rows per page
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (!qDoc) return;

    let obj: any;

    const fetchData = async () => {
      obj = await qDoc.getObject(objectId);
      const layout = await obj.getLayout();
      const hc = layout.qHyperCube;

      // Set headers
      const headerNames = hc.qDimensionInfo.map((d: any) => d.qFallbackTitle)
        .concat(hc.qMeasureInfo.map((m: any) => m.qFallbackTitle));
      setHeaders(headerNames);

      // Total number of rows
      setTotalRows(hc.qSize.qcy);

      // Fetch first page
      await fetchPage(1, hc.qSize.qcx, hc.qSize.qcy);
    };

    const fetchPage = async (pageNumber: number, width: number, total: number) => {
      const top = (pageNumber - 1) * pageSize;
      const height = Math.min(pageSize, total - top);
      if (height <= 0) return;

      const dataPages = await obj.getHyperCubeData("/qHyperCubeDef", [
        { qTop: top, qLeft: 0, qHeight: height, qWidth: width },
      ]);

      const pageRows = dataPages[0].qMatrix.map((row: any) =>
        row.map((cell: any) => cell.qText)
      );
      setRows(pageRows);
    };

    fetchData();

    return () => {
      obj?.close?.();
    };
  }, [qDoc, objectId]);

  const totalPages = Math.ceil(totalRows / pageSize);

  const handlePageChange = async (newPage: number) => {
    if (!qDoc) return;
    setPage(newPage);

    const obj = await qDoc.getObject(objectId);
    const layout = await obj.getLayout();
    const hc = layout.qHyperCube;

    const top = (newPage - 1) * pageSize;
    const height = Math.min(pageSize, hc.qSize.qcy - top);

    const dataPages = await obj.getHyperCubeData("/qHyperCubeDef", [
      { qTop: top, qLeft: 0, qHeight: height, qWidth: hc.qSize.qcx },
    ]);

    const pageRows = dataPages[0].qMatrix.map((row: any) =>
      row.map((cell: any) => cell.qText)
    );
    setRows(pageRows);
  };

  return (
    <div className="overflow-auto border rounded p-2">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {headers.map((h, idx) => (
              <th
                key={idx}
                className="border px-2 py-1 text-left text-sm font-medium"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              {r.map((c, cIdx) => (
                <td key={cIdx} className="border px-2 py-1 text-sm">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-2">
        <Button
          size="sm"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </Button>
        <span className="text-sm px-2 py-1">
          Page {page} of {totalPages}
        </span>
        <Button
          size="sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
