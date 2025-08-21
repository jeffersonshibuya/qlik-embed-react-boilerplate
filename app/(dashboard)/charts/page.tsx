import { CustomChart } from "@/features/charts/components/custom-chart";
import { TableComponent } from "@/features/charts/components/table-component";

const ChartsPage = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="border border-slate-400 rounded w-full">
        <CustomChart />
      </div>
      <div className="border border-slate-400 rounded w-full col-span-2">
        <TableComponent />
      </div>
    </div>
  );
};
export default ChartsPage;
