"use client";

import config from "@/lib/qlik-embed-config.json";
import { QlikEmbed } from "@qlik/embed-react";

export const TableComponent = () => {
  return (
    <div className="pr-1">
      <b>Table</b>
      <div className="h-[450px] w-full">
        <QlikEmbed ui="analytics/chart" objectId="QyKt" {...config} />
      </div>
    </div>
  );
};
