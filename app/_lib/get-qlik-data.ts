import { fetchTableRowsPage } from "@/features/qix/fetch-table-rows-page";
import { QlikDataTableResponseType, QlikDataTableType } from "@/features/types";
import { format } from "date-fns";

interface FilterCondition {
  field: string;
  operator: string;
  value: string | string[];
}

interface GetQlikDataParams {
  qDoc: any; // Add qDoc parameter
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

interface QlikDataResponse {
  data: QlikDataTableType[];
  totalRows: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getQlikData(params: GetQlikDataParams): Promise<QlikDataResponse> {
  try {
    const { qDoc, ...filterParams } = params;

    // Build filters for Qlik
    const filters: FilterCondition[] = [];

    if (filterParams.woFilter) {
      filters.push({
        field: "WO",
        operator: "contains",
        value: filterParams.woFilter
      });
    }

    if (filterParams.statusFilter?.length) {
      filters.push({
        field: "WO Status",
        operator: "in",
        value: filterParams.statusFilter
      });
    }

    if (filterParams.typeFilter?.length) {
      filters.push({
        field: "WO Type",
        operator: "in",
        value: filterParams.typeFilter
      });
    }

    if (filterParams.programFilter?.length) {
      filters.push({
        field: "Program",
        operator: "in",
        value: filterParams.programFilter
      });
    }

    if (filterParams.workGroupFilter?.length) {
      filters.push({
        field: "Wrk Grp",
        operator: "in",
        value: filterParams.workGroupFilter
      });
    }

    // Map sort field names to Qlik field names
    const sortFieldMap: Record<string, string> = {
      "WO": "WO",
      "description": "Desc.",
      "type": "WO Type",
      "status": "WO Status",
      "program": "Program",
      "workGroup": "Wrk Grp",
      "statusDate": "Status Date"
    };

    const qlikSortBy = filterParams.sortBy ? sortFieldMap[filterParams.sortBy] || filterParams.sortBy : undefined;

    // Fetch data from Qlik with filters and sorting
    const { count, rows, totalRows } = await fetchTableRowsPage<QlikDataTableResponseType[]>({
      qDoc,
      tableObjectId: "QyKt",
      page: filterParams.page || 1,
      pageSize: filterParams.pageSize || 10,
      filters,
      sortBy: qlikSortBy,
      sortOrder: filterParams.sortOrder || "asc",
    });

    // Transform data
    const transformedData = rows.map((row) => {
      const statusDate = row["Status Date"] === "-" ? null : row["Status Date"];
      let formattedDate = null;

      if (statusDate) {
        const year = parseInt(statusDate.slice(0, 4), 10);
        const month = parseInt(statusDate.slice(4, 6), 10) - 1;
        const day = parseInt(statusDate.slice(6, 8), 10);
        formattedDate = format(new Date(`${year}/${month}/${day}`), "MMM dd, yyyy");
      }

      return {
        WO: row.WO,
        description: row["Desc."],
        polSub: row["Pol. Sub."],
        program: row.Program,
        scheduledGroup: row["SCHD GRP"],
        status: row["WO Status"],
        statusDate: formattedDate,
        type: row["WO Type"],
        workGroup: row["Wrk Grp"],
      };
    });

    return {
      data: transformedData,
      totalRows,
      page: filterParams.page || 1,
      pageSize: filterParams.pageSize || 10,
      totalPages: Math.ceil(totalRows / (filterParams.pageSize || 10)),
    };

  } catch (error) {
    console.error("Error fetching Qlik data:", error);
    throw new Error("Failed to fetch Qlik data");
  }
}
