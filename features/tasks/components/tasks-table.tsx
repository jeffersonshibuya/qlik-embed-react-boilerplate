"use client";

import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";

export const TasksTable = () => {
  return (
    <div className="h-[45vh]">
      <QlikEmbed ui="analytics/selections" appId="9d443776-50ae-455c-bcd8-dad54dd1ae94" />
      <QlikWrapper>
        <QlikEmbed
          ui="analytics/sheet"
          objectId={"GRqzWz"}
          appId="9d443776-50ae-455c-bcd8-dad54dd1ae94"
        />
      </QlikWrapper>
    </div>
  );
};
