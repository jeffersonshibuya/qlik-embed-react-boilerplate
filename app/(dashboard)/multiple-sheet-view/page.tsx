/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";
import { useAppStore } from "@/hooks/use-app";

const MultipleSheetView = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);
  const [sheets, setSheets] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    async function fetchAppInfo() {
      const sheets = await qDoc.getObjects({
        qTypes: ["sheet"],
        qIncludeSessionObjects: false,
        qData: { title: "/qMetaDef/title" },
      });

      const sheetList = sheets
        .filter((sheet: any) => sheet.qMeta.published === true)
        .map((sheet: any) => ({
          id: sheet.qInfo.qId,
          title: sheet.qMeta.title,
        }));

      setSheets(sheetList);
    }

    if (qDoc) {
      fetchAppInfo();
    }
  }, [qDoc]);

  return (
    <div className="grid grid-cols-2 gap-6">
      {appId && (
        sheets?.map((sheet) => (
          <div key={sheet.id} className="h-[60vh] flex-1 w-full border overflow-auto shadow">
            <QlikEmbed ui="analytics/selections" appId={appId} />
            <div className="h-full w-full">
              <QlikWrapper>
                <QlikEmbed
                  ui="analytics/sheet"
                  objectId={sheet?.id || ""}
                  appId={appId}
                />
              </QlikWrapper>
            </div>
          </div>
        ))
      )
      }
    </div>
  );
};

export default MultipleSheetView;
