"use client";

import { QlikEmbed } from "@qlik/embed-react";
import { useState } from "react";
import config from "@/lib/qlik-embed-config.json";
import { QlikWrapper } from "./qlik-embed-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CustomChart = () => {
  const [chartType, setChartType] = useState("piechart");
  const [dimensions, setDimensions] = useState<string[]>(["WORK_ORDER_TYPE"]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [measures, _] = useState(["Count(STATUS_DATE)"]);

  const toggleDimension = (value: string, checked: boolean) => {
    setDimensions(
      (prev) =>
        checked
          ? [...prev, value] // add if checked
          : prev.filter((d) => d !== value) // remove if unchecked
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4">
          Dimenions:
          <div className="flex items-center gap-3">
            <Checkbox
              id="work_order_type"
              checked={dimensions.includes("WORK_ORDER_TYPE")}
              onCheckedChange={(checked) =>
                toggleDimension("WORK_ORDER_TYPE", checked === true)
              }
            />
            <Label htmlFor="work_order_type">Work Order Type</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="pol_sub"
              checked={dimensions.includes("POL_SUB")}
              onCheckedChange={(checked) =>
                toggleDimension("POL_SUB", checked === true)
              }
            />
            <Label htmlFor="pol_sub">Pol Sub</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="schedule_group"
              checked={dimensions.includes("SCHEDULE_GROUP")}
              onCheckedChange={(checked) =>
                toggleDimension("SCHEDULE_GROUP", checked === true)
              }
            />
            <Label htmlFor="schedule_group">Schedule Group</Label>
          </div>
        </div>

        <Select
          value={chartType}
          onValueChange={(value) => setChartType(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"piechart"}>Pie Chart</SelectItem>
            <SelectItem value={"linechart"}>Line Chart</SelectItem>
            <SelectItem value={"barchart"}>Bar Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-cneter gap-2">
        Measure:{" "}
        {measures.map((measure) => (
          <p key={measure}>{measure}</p>
        ))}
      </div>

      <div className="h-full p-1 min-h-[300px]">
        <QlikWrapper>
          <QlikEmbed
            ui="analytics/chart"
            type={chartType}
            dimensions={dimensions}
            measures={measures}
            {...config}
          />
        </QlikWrapper>
      </div>
    </>
  );
};
