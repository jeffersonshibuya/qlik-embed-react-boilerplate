import EnhancedDataTable from "@/features/qlik-data/components/enhanced-data-table";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

const EnhancedQlikDataPage = async () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Enhanced Qlik Data</h1>
        <p className="text-muted-foreground">
          Advanced data table with filtering, sorting, and interactive features powered by Dice UI.
        </p>
      </div>

      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={9}
            filterCount={4}
            cellWidths={[
              "3rem",
              "12rem",
              "20rem",
              "8rem",
              "10rem",
              "10rem",
              "10rem",
              "12rem",
              "3rem",
            ]}
            shrinkZero
          />
        }
      >
        <EnhancedDataTable />
      </Suspense>
    </div>
  );
};

export default EnhancedQlikDataPage;
