"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { CustomChart } from "@/features/charts/components/custom-chart";
import { KpiComponent } from "@/features/charts/components/kpi";
import { TableComponent } from "@/features/charts/components/table-component";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Eye } from "lucide-react";
import { QlikEmbed } from "@qlik/embed-react";
import { useAppStore } from "@/hooks/use-app";
import { TableData } from "@/components/table-data";

const qlikObjects = [
  { id: "BmjZmQ", title: "Political Sub" },
  { id: "JfZDSV", title: "Total Status" },
  { id: "xeBwN", title: "Total Orders" },
  { id: "pie", title: "Pie chart" },
  { id: "table", title: "WO Table" },
];

const ChartsPage = () => {
  const appId = useAppStore((s) => s.appId);
  const [visibleObjects, setVisibleObjects] = useState<string[]>(qlikObjects.map(o => o.id));

  function toggleObject(id: string) {
    setVisibleObjects(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="p-3 flex flex-col">
          <span className="text-lg font-semibold text-gray-900">Charts</span>
          <span className="text-sm text-gray-600 mt-1">
            Each card below represents a separate object embedded from the Qlik App.
          </span>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 border rounded-lg px-2 py-2 shadow"><Eye className="size-5" /> Toggle Objects</PopoverTrigger>
          <PopoverContent className="w-[550px]">
            <div className="flex flex-col space-y-2 z-20 bg-white">
              <h2 className="text-lg font-semibold mb-3">Objects Visibility</h2>
              {qlikObjects.map(obj => (
                <div
                  key={obj.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <span>{obj.title}</span>
                  <Checkbox
                    checked={visibleObjects.includes(obj.id)}
                    onCheckedChange={() => toggleObject(obj.id)}
                  />
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <QlikEmbed ui="analytics/selections" appId={appId || ""} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
        {visibleObjects.includes("BmjZmQ") && (
          <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
            <KpiComponent objectId="BmjZmQ" />
          </div>
        )}
        {visibleObjects.includes("JfZDSV") && (
          <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
            <KpiComponent objectId="JfZDSV" />
          </div>
        )}
        {visibleObjects.includes("xeBwN") && (
          <div className="border border-slate-200 shadow rounded w-full p-4 flex flex-col h-[200px]">
            <KpiComponent objectId="xeBwN" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {visibleObjects.includes("pie") && (
          <div className="border border-slate-400 rounded w-full p-4 flex flex-col">
            <CustomChart />
          </div>
        )}
        {visibleObjects.includes("table") && (
          <div className="border border-slate-400 rounded w-full col-span-2">
            <TableComponent />
          </div>
        )}
      </div>
    </div >
  );
};
export default ChartsPage;
