/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatRows } from "./format-rows";

interface fetchTableRowPageProps {
  qDoc: any;
  tableObjectId: any;
  page?: number;
  pageSize?: number;
}

export async function fetchTableRowsPage<T>({
  qDoc,
  tableObjectId,
  page = 1,
  pageSize = 100,
}: fetchTableRowPageProps) {
  const appObject = await qDoc.getObject(tableObjectId);
  const layout = await appObject.getLayout();

  const totalRows = layout.qHyperCube.qSize.qcy;
  const count = layout.qHyperCube.qGrandTotalRow[0]?.qText;
  const width = layout.qHyperCube.qSize.qcx;
  const qTop = Math.max(0, page - 1) * pageSize;

  const pageDef = [
    {
      qTop,
      qLeft: 0,
      qHeight: Math.min(pageSize, totalRows - qTop),
      qWidth: width,
    },
  ];

  const dataPages = await appObject.getHyperCubeData("/qHyperCubeDef", pageDef);

  const formattedRows = formatRows(layout, dataPages[0].qMatrix);

  return {
    totalRows,
    count: Number(count || 0),
    page,
    pageSize,
    rows: formattedRows as T,
  };
}
