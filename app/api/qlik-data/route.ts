import { NextRequest, NextResponse } from "next/server";
import { fetchTableRowsPage } from "@/features/qix/fetch-table-rows-page";
import { QlikDataTableResponseType } from "@/features/types";
import { format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const woFilter = searchParams.get("wo") || "";
    const statusFilter = searchParams.get("status")?.split(",").filter(Boolean) || [];
    const typeFilter = searchParams.get("type")?.split(",").filter(Boolean) || [];
    const programFilter = searchParams.get("program")?.split(",").filter(Boolean) || [];
    const sortBy = searchParams.get("sortBy") || "WO";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    // Get Qlik document from session or context
    // This would need to be implemented based on your authentication setup
    const qDoc = await getQlikDocument(); // You'll need to implement this

    if (!qDoc) {
      return NextResponse.json({ error: "Qlik session not available" }, { status: 401 });
    }

    // Fetch all data from Qlik (you might want to implement server-side filtering in Qlik)
    const { count, rows, totalRows } = await fetchTableRowsPage<QlikDataTableResponseType[]>({
      qDoc,
      tableObjectId: "QyKt",
      page: 1,
      pageSize: 10000, // Fetch all data for server-side filtering
    });

    // Transform and filter data
    let filteredData = rows.map((row) => {
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

    // Apply filters
    if (woFilter) {
      filteredData = filteredData.filter(item =>
        item.WO.toLowerCase().includes(woFilter.toLowerCase())
      );
    }

    if (statusFilter.length > 0) {
      filteredData = filteredData.filter(item =>
        statusFilter.includes(item.status)
      );
    }

    if (typeFilter.length > 0) {
      filteredData = filteredData.filter(item =>
        typeFilter.includes(item.type)
      );
    }

    if (programFilter.length > 0) {
      filteredData = filteredData.filter(item =>
        programFilter.includes(item.program)
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      if (sortOrder === "desc") {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      totalRows: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
    });

  } catch (error) {
    console.error("Error fetching Qlik data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// Helper function to get Qlik document - implement based on your auth setup
async function getQlikDocument() {
  // This is a placeholder - you'll need to implement this based on your authentication
  // and Qlik session management
  return null;
}
