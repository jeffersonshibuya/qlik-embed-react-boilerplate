/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";
import { useAppStore } from "@/hooks/use-app";
import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { AlertTriangle, Info } from "lucide-react";

const ControlActions = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const { appId, appName } = useAppStore();
  const [selections, setSelections] = useState<any[]>([]);
  const [sheetSelected, setSheetSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!qDoc) return;
    let sessionObject: any;
    setSheetSelected(null);

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

      setSheetSelected(sheetList[0]?.id);
    }

    const createSelectionListener = async () => {
      try {
        // 🔹 Create a session object that represents the current selection state
        sessionObject = await qDoc.createSessionObject({
          qInfo: { qType: "SessionSelections" },
          qSelectionObjectDef: {},
        });

        // 🔹 Function to fetch and process current selections
        const updateSelections = async () => {
          const layout = await sessionObject.getLayout();
          const qSelections = layout.qSelectionObject?.qSelections || [];

          setSelections(qSelections);

          if (!qSelections?.length) {
            toast.info("No current selections");
            return;
          }
          toast.info(
            <div className="text-sm space-y-1">
              <p className="font-semibold mb-1">Selections:</p>
              <ul className="space-y-1">
                {qSelections.map((s: any) => (
                  <li
                    key={s.qField}
                    className="flex items-center gap-2 border border-blue-200 rounded-md px-2 py-1 bg-blue-50"
                  >
                    <span className="font-medium text-blue-700">{s.qField}</span>:
                    <span className="text-blue-800">{s.qSelected}</span>
                  </li>
                ))}
              </ul>
            </div>,
            {
              duration: 5000,
              position: "bottom-right",
            }
          );
        };

        // Initial load
        await updateSelections();

        // 🔹 Subscribe to changes — this fires every time selections change
        sessionObject.on("changed", updateSelections);
      } catch (error) {
        console.error("Error setting up selection listener:", error);
      }
    };

    createSelectionListener();

    if (qDoc) {
      fetchAppInfo();
    }

    return () => {
      if (sessionObject) {
        sessionObject.removeAllListeners?.();
        qDoc.destroySessionObject?.(sessionObject.id).catch(() => { });
      }
    };
  }, [qDoc]);

  const handleClearAll = async () => {
    if (!qDoc) return;
    try {
      await qDoc.clearAll();
    } catch (error) {
      console.error("Failed to clear selections:", error);
    }
  };

  const handleClearField = async (fieldName: string) => {
    if (!qDoc) return;
    try {
      const field = await qDoc.getField(fieldName);
      await field.clear();
    } catch (error) {
      console.error(`Failed to clear field ${fieldName}:`, error);
    }
  };

  const handleSetWorkGroup = async () => {
    const field = await qDoc.getField('SCHEDULE_GROUP');
    field.selectValues([{ qText: '1AOH01' }], false, false)
  }

  return (
    <div className="flex flex-col relative">

      <h2 className="flex justify-between gap-1 p-1 border-b mb-4">
        <span className="text-lg text-gray-900 font-semibold">APP: {appName}</span>
        <span className="text-gray-600 text-sm">ID: {appId}</span>
      </h2>

      <div className="flex justify-between items-start gap-4 border-b pb-4 mb-6">
        {selections.length === 0 ? (
          <p className="text-gray-500 italic">No active selections.</p>
        ) : (
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row flex-wrap items-start gap-2">
              {selections.map((s) => (
                <div
                  key={s.qField}
                  className="flex items-center gap-2 border border-blue-300 bg-blue-50 text-blue-700 rounded-full px-3 py-0.5 text-sm shadow-sm"
                >
                  <span className="font-medium">{s.qField}:</span>
                  <span className="text-blue-800 bg-white px-1 py-0.5 rounded border border-blue-200">
                    {s.qSelected}
                  </span>
                  <Button
                    onClick={() => handleClearField(s.qField)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-red-600 hover:bg-transparent p-1"
                  >
                    <IconTrash size={14} />
                  </Button>
                </div>
              ))}
            </div>



          </div>
        )}

        <div className="flex justify-end flex-col gap-1">
          <Button
            onClick={handleClearAll}
            disabled={!selections.length}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear All Selections ({selections.length})
          </Button>
          <Button onClick={handleSetWorkGroup}>Set SCHEDULE_GROUP to 1AOH01</Button>
        </div>
      </div>

      <div className="h-[70vh] w-full border overflow-auto">
        <div className="h-full w-full">
          {mounted && sheetSelected && appId && (
            <QlikWrapper>
              <QlikEmbed
                ui="analytics/sheet"
                objectId={sheetSelected!}
                appId={appId}
              />
            </QlikWrapper>)
          }
        </div>

      </div>
    </div>
  );
};

export default ControlActions;
