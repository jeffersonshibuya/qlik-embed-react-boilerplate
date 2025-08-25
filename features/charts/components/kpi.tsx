"use client";
import config from "@/lib/qlik-embed-config.json";
import { QlikWrapper } from "./qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";

export const KpiComponent = ({ objectId }: { objectId: string }) => {
  return (
    <QlikWrapper>
      <QlikEmbed ui="analytics/chart" objectId={objectId} {...config} />
    </QlikWrapper>
  );
};
