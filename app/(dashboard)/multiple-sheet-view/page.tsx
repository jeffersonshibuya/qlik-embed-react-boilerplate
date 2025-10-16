/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";
import { useAppStore } from "@/hooks/use-app";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 50;

const MultipleSheetView = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);
  const [sheets, setSheets] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    async function fetchAppInfo() {
      try {
        const objects = await qDoc.getObjects({
          qTypes: ["sheet"],
          qIncludeSessionObjects: false,
          qData: { title: "/qMetaDef/title" },
        });

        const publishedSheets = objects
          .filter((sheet: any) => sheet.qMeta?.published)
          .map((sheet: any) => ({
            id: sheet.qInfo.qId,
            title: sheet.qMeta.title,
          }));

        setSheets(publishedSheets);
      } catch (err) {
        console.error("Error fetching sheets:", err);
      }
    }

    if (qDoc) {
      fetchAppInfo();
    }
  }, [qDoc]);

  useEffect(() => {
    setSheets([]);
  }, [qDoc]);

  return (
    <div className="relative">
      <div className="sticky top-0 w-full h-auto z-20 bg-white shadow-lg mb-2">
        <QlikEmbed ui="analytics/selections" appId={appId || ""} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {qDoc && appId && (
          sheets?.map((sheet) => (
            <div key={sheet.id} className="h-[55vh] flex-1 w-full border rounded overflow-hidden shadow">
              <div className="h-full w-full">
                <QlikWrapper>
                  <QlikEmbed
                    key={`${appId}-${sheet.id}`} // force remount when app changes
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
    </div>
  );
};

export default MultipleSheetView;
