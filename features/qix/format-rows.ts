/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatRows(layout: any, data: any) {
  const columnTitles = layout.qHyperCube.qDimensionInfo
    .concat(layout.qHyperCube.qMeasureInfo)
    .map((col: any) => col.qFallbackTitle);

  const formattedRows = data.map((row: any) => {
    const rowData = {} as any;
    row.forEach((cell: any, idx: number) => {
      rowData[columnTitles[idx]] = cell.qText;
    });
    return rowData;
  });

  return formattedRows;
}
