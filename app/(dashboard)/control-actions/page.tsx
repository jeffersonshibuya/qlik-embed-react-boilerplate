/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";
import { useAppStore } from "@/hooks/use-app";
import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

const ControlActions = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);
  const [selections, setSelections] = useState<any[]>([]);
  const [sheetId, setSheetId] = useState("")

  useEffect(() => {
    if (!qDoc) return;

    let sessionObject: any;

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

          console.log("🔄 Current selections:", qSelections);

          setSelections(qSelections);

          // 🌍 Detect selection on WORK_ORDER_NBR
          const selectedWO = qSelections.find(
            (s: any) => s.qField === "WORK_ORDER_NBR"
          );

          if (selectedWO) {
            console.log("Selected WORK_ORDER_NBR:", selectedWO.qSelected);
            setSheetId("QwJvq"); // Show the sheet
          } else {
            setSheetId(""); // Hide when cleared
          }
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

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-lg font-semibold">Qlik Selections (App: {appId})</h2>

      <div className="flex flex-1 items-center justify-between">
        {selections.length === 0 ? (
          <p>No active selections.</p>
        ) : (
          <ul className="list-disc ml-6">
            {selections.map((s) => (
              <li key={s.qField}>
                <strong>{s.qField}</strong>: {s.qSelected}
                <Button
                  onClick={() => handleClearField(s.qField)}
                  variant={'outline'}
                  className="text-sm text-blue-600 hover:underline ml-2"
                >
                  <IconTrash size={6} />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Button
          onClick={handleClearAll}
          disabled={!selections.length}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
        >
          Clear All Selections
        </Button>

      </div>

      <div className="h-[73vh] w-full border overflow-auto">
        <div className="h-full w-full">
          {sheetId &&
            <QlikEmbed
              ui="analytics/sheet"
              objectId={sheetId}
              appId={appId || ""}
              context={{ interactions: { select: false } }}
            />
          }
          <QlikWrapper>
            <QlikEmbed
              ui="analytics/sheet"
              objectId={"7ad9a6d6-5b5a-4962-ad71-1e390d4ccf3d"}
              appId={"5a004e8c-8e42-473a-a4be-9688b5618f52"}
              context={{ interactions: { select: !(selections.filter(selection => selection.qField === 'WORK_ORDER_NBR').length > 0) } }}
            />
          </QlikWrapper>
        </div>

      </div>
    </div>
  );
};

export default ControlActions;
