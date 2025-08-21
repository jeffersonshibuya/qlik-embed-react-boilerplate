"use client";

import { QlikEmbed } from "@qlik/embed-react";
import { useState } from "react";
import config from "@/lib/qlik-embed-config.json";

export const CustomChart = () => {
  const [chartType, setChartType] = useState("piechart");
  const [dimensions, setDimensions] = useState(["WO_STATUS"]);
  const [measures, setMeasures] = useState(["Count(STATUS_DATE)"]);

  const DIMENSIONS = [
    "WO_STATUS",
    "SCHD SCHEDULE_GROUP",
    "Program",
    "WORK_GROUP",
  ];

  return (
    <>
      <select
        value={chartType}
        onChange={(event) => setChartType(event.target.value)}
      >
        <option value={"piechart"}>Pie Chart</option>
        <option value={"linechart"}>Line Chart</option>
      </select>
      <div className="h-[300px] w-full">
        <QlikEmbed
          {...config}
          ui="analytics/chart"
          type={chartType}
          dimensions={dimensions}
          measures={measures}
        />
      </div>
      <div>
        Dimensions:
        <select
          value={dimensions}
          onChange={(event) =>
            setDimensions([...dimensions, event.target.value])
          }
        >
          {DIMENSIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        MEASURES:{" "}
        <input
          type="text"
          value={measures}
          onChange={(e) => setMeasures([e.target.value])}
        />
      </div>
    </>
  );
};
