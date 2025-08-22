"use client";

import config from "@/lib/qlik-embed-config.json";
import { QlikEmbed } from "@qlik/embed-react";
import { QlikWrapper } from "./qlik-embed-wrapper";

export const TableComponent = () => {
  return (
    <div className="pr-1">
      <b>Table</b>
      <div className="h-[550px] w-full">
        <QlikWrapper>
          <QlikEmbed ui="analytics/chart" objectId="QyKt" {...config} />
        </QlikWrapper>
      </div>
    </div>
  );
};
