"use client"

import { getAllFields } from "@/data/get-all-fields";
import { useQlikStore } from "@/hooks/qlik-store";
import { useAppStore } from "@/hooks/use-app";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";

const CustomFieldsPage = () => {
  const appId = useAppStore((s) => s.appId);
  const qDoc = useQlikStore((s) => s.qDoc);
  const [fields, setFields] = useState<string[]>([])
  const [fieldsData, setFieldsData] = useState<string[]>([])
  const [fieldInput, setFieldInput] = useState("");
  const [sheetSelected, setSheetSelected] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getMasterItemsData() {
      const fieldsData = await getAllFields(qDoc) as string[]
      setFields(fieldsData)
    }

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

    if (qDoc) {
      getMasterItemsData()
      fetchAppInfo()
    }

    return () => {
      mounted = false;
    };

  }, [qDoc])

  const handleAddFilter = () => {
    if (fieldInput.trim()) {
      setFieldsData((prev) => [...prev, fieldInput.trim()]);
      setFieldInput("");
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFieldsData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col flex-1 w-full mx-4">
        <div className="grid grid-cols-4 gap-2 w-full border-b pb-2">
          {appId && fieldsData.map(field => (
            <div key={field} className="h-[200px] shadhow border rounded p-1">
              <QlikWrapper>
                <QlikEmbed
                  ui="analytics/field"
                  appId={appId}
                  fieldId={field}
                />
              </QlikWrapper>
            </div>
          ))}
        </div>
        <div>
          {appId &&
            <div className="h-[550px] border rounded overflow-hidden shadow ">
              <QlikEmbed ui="analytics/selections" appId={appId} />
              <QlikWrapper>
                <QlikEmbed
                  ui="analytics/sheet"
                  objectId={sheetSelected!}
                  appId={appId}
                />
              </QlikWrapper>
            </div>
          }
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Field Custom Creation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Create Field</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={fieldInput}
                  onChange={(e) => setFieldInput(e.target.value)}
                  placeholder="e.g. WORK_ORDER_NBR"
                />
                <Button type="button" onClick={handleAddFilter}>
                  Add
                </Button>
              </div>
              {fieldsData.length > 0 && (
                <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
                  {fieldsData.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-50 border rounded p-2 text-sm"
                    >
                      <span>{d}</span>
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleRemoveFilter(i)}
                      />
                    </li>

                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Fields List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full">
              <CardContent className="">
                {fields.map(field => <p className="flex items-center justify-between bg-gray-50 border rounded p-2 text-sm" key={field}>{field}</p>)}
              </CardContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomFieldsPage;
