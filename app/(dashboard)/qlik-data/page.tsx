import UsersTable from "@/features/qlik-data/components/list";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

const QlikDataPage = async () => {
  return (
    <div>
      <Suspense
        fallback={
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
        }
      >
        <UsersTable />
      </Suspense>
    </div>
  );
};

export default QlikDataPage;
