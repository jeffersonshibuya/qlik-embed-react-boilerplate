import { CustomChart } from "@/features/charts/components/custom-chart";
import { KpiComponent } from "@/features/charts/components/kpi";
import { TableComponent } from "@/features/charts/components/table-component";

const ChartsPage = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
          <KpiComponent objectId="BmjZmQ" />
        </div>
        <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
          <KpiComponent objectId="JfZDSV" />
        </div>
        <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
          <KpiComponent objectId="xeBwN" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="border border-slate-400 rounded w-full p-4 flex flex-col">
          <CustomChart />
        </div>
        <div className="border border-slate-400 rounded w-full col-span-2">
          <TableComponent />
        </div>
      </div>
    </div>
  );
};
export default ChartsPage;
