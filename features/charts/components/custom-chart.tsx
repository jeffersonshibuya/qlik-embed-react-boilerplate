"use client";

import { QlikEmbed, type QlikEmbedRefApi } from "@qlik/embed-react";
import { useEffect, useRef, useState } from "react";
import config from "@/lib/qlik-embed-config.json";
import { QlikWrapper } from "./qlik-embed-wrapper";

export const CustomChart = () => {
  const chartRef = useRef<QlikEmbedRefApi<"analytics/chart">>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [chartType, setChartType] = useState("piechart");
  const [dimensions, setDimensions] = useState(["WO_STATUS"]);
  const [measures, setMeasures] = useState(["Count(STATUS_DATE)"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      if (chartRef.current) {
        setLoading(false);
        observer.disconnect();
      }
    });

    observer.observe(containerRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <select
        value={chartType}
        onChange={(event) => setChartType(event.target.value)}
      >
        <option value={"piechart"}>Pie Chart</option>
        <option value={"linechart"}>Line Chart</option>
      </select>
      {loading && (
        <div className="flex items-center justify-center bg-white/70">
          Loading chart...
        </div>
      )}

      <div className="h-full p-6 w-full">
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
