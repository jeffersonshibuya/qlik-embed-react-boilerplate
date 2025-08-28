/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { CircleCheck, Palette, Table } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/hooks/use-app";

const SheetPage = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);
  const [sheets, setSheets] = useState<{ id: string; title: string }[]>([]);
  const [sheetSelected, setSheetSelected] = useState<string | null>(null);
  const [theme, setTheme] = useState("Classic");
  const [enableSelect, setEnableSelect] = useState(false);

  const themes = ["Classic", "Breeze"];

  useEffect(() => {
    async function fetchAppInfo() {
      const sheets = await qDoc.getObjects({
        qTypes: ["sheet"],
        qIncludeSessionObjects: false,
        qData: { title: "/qMetaDef/title" },
      });

      const sheetList = sheets.map((sheet: any) => ({
        id: sheet.qInfo.qId,
        title: sheet.qMeta.title,
      }));

      setSheetSelected(sheetList[0]?.id);
      setSheets(sheetList);
    }

    setSheetSelected(null);

    if (qDoc) {
      console.log("changed qDoc");
      fetchAppInfo();
    }
  }, [qDoc]);

  return (
    <div>
      <div className="flex items-start justify-between gap-8 mt-2 mb-5 py-3 divide-x space-x-2 divide-gray-300">
        <RadioGroup.Root
          value={sheetSelected}
          onValueChange={(value) => setSheetSelected(value)}
          className="max-w-full w-full grid grid-cols-5 gap-4 pr-3"
        >
          {sheets.map((sheet) => (
            <RadioGroup.Item
              key={sheet.id}
              value={sheet.id}
              className={cn(
                "relative group ml-1 ring-[1px] ring-border rounded py-2 px-2 text-start cursor-pointer",
                "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
              )}
            >
              <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />
              <Table className="mb-2.5 text-muted-foreground" />
              <span className="font-semibold tracking-tight">
                {sheet.title}
              </span>
              <p className="text-xs">Sheet ID: {sheet.id}</p>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>

        <div className="flex flex-col gap-2 min-w-sm">
          <RadioGroup.Root
            defaultValue={themes[0]}
            onValueChange={(value) => setTheme(value)}
            className="max-w-md w-full grid grid-cols-2 gap-4 px-2"
          >
            {themes.map((theme) => (
              <RadioGroup.Item
                key={theme}
                value={theme}
                className={cn(
                  "relative group ml-1 ring-[1px] ring-border rounded py-2 px-2 text-start cursor-pointer",
                  "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                )}
              >
                <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />
                <Palette className="mb-2.5 text-muted-foreground" />
                <span className="font-semibold tracking-tight">{theme}</span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          <div className="flex items-center gap-2 ml-auto text-lg font-semibold">
            <Checkbox
              checked={enableSelect}
              onCheckedChange={(e) => setEnableSelect(!!e)}
            />{" "}
            Enable Selections
          </div>
        </div>
      </div>
      {sheetSelected && appId && (
        <div className="h-[73vh] w-full border overflow-auto">
          <QlikEmbed ui="analytics/selections" appId={appId} />
          <div className="h-full w-full">
            <QlikWrapper>
              <QlikEmbed
                ui="analytics/sheet"
                objectId={sheetSelected!}
                appId={appId}
                context={{ interactions: { active: enableSelect }, theme }}
              />
            </QlikWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetPage;
