/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatRows } from "./format-rows";

interface FilterCondition {
  field: string;
  operator: string;
  value: string | string[];
}

interface fetchTableRowPageProps {
  qDoc: any;
  tableObjectId: any;
  page?: number;
  pageSize?: number;
  filters?: FilterCondition[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function fetchTableRowsPage<T>({
  qDoc,
  tableObjectId,
  page = 1,
  pageSize = 10,
  filters = [],
  sortBy,
  sortOrder = "asc",
}: fetchTableRowPageProps) {
  const appObject = await qDoc.getObject(tableObjectId);
  const layout = await appObject.getLayout();

  console.log(page, pageSize, filters, sortBy, sortOrder)

  // Apply filters if provided
  // if (filters.length > 0) {
  //   const filterExpressions = filters.map(filter => {
  //     if (Array.isArray(filter.value)) {
  //       // Handle multi-select filters
  //       const values = filter.value.map(v => `'${v}'`).join(',');
  //       return `{${filter.field}} in (${values})`;
  //     } else {
  //       // Handle single value filters
  //       if (filter.operator === 'contains') {
  //         return `contains({${filter.field}}, '${filter.value}')`;
  //       } else if (filter.operator === 'equals') {
  //         return `{${filter.field}} = '${filter.value}'`;
  //       } else {
  //         return `{${filter.field}} = '${filter.value}'`;
  //       }
  //     }
  //   });

  //   const combinedFilter = filterExpressions.join(' and ');
  //   await appObject.applyPatches([{
  //     qPath: '/qHyperCubeDef/qDimensions/0/qDef/qFieldDefs/0',
  //     qOp: 'add',
  //     qValue: combinedFilter
  //   }]);
  // }

  // // Apply sorting if provided
  // if (sortBy) {
  //   await appObject.applyPatches([{
  //     qPath: '/qHyperCubeDef/qDimensions/0/qDef/qSortCriterias/0',
  //     qOp: 'add',
  //     qValue: JSON.stringify({
  //       qSortByAscii: sortOrder === 'asc' ? 1 : -1,
  //       qSortByExpression: 0,
  //       qSortByNumeric: 0,
  //       qSortByState: 0
  //     })
  //   }]);
  // }

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
