"use client"

import { useState, useEffect } from "react";
import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { QlikEmbed } from "@qlik/embed-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
import { useQlikStore } from "@/hooks/qlik-store";
import { useAppStore } from "@/hooks/use-app";

export default function PlaygroundPage() {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);

  const [createdObjects, setCreatedObjects] = useState<any[]>([]);
  const [expression, setExpression] = useState("Sum(Sales)");
  const [title, setTitle] = useState("Total Sales");

  const [fieldName, setFieldName] = useState("Customer");

  async function createKPI() {
    if (!qDoc) return;

    const obj = await qDoc.createSessionObject({
      qInfo: { qType: "kpi" },
      qHyperCubeDef: {
        qMeasures: [{ qDef: { qDef: expression, qLabel: title } }],
        qDimensions: [],
      },
    });

    const layout = await obj.getLayout();
    setCreatedObjects((prev) => [
      ...prev,
      { id: obj.id, title, ui: "analytics/chart", layout },
    ]);
  }

  async function createField() {
    setCreatedObjects((prev) => [
      ...prev,
      { id: fieldName, title: fieldName, ui: "analytics/field" },
    ]);
  }

  async function createSheet() {
    const sheets = await qDoc.getObjects({
      qTypes: ["sheet"],
      qIncludeSessionObjects: false,
      qData: { title: "/qMetaDef/title" },
    });

    const firstSheet = sheets.find((s: any) => s.qMeta.published);
    if (firstSheet) {
      setCreatedObjects((prev) => [
        ...prev,
        {
          id: firstSheet.qInfo.qId,
          title: firstSheet.qMeta.title,
          ui: "analytics/sheet",
        },
      ]);
    }
  }

  function removeObject(id: string) {
    setCreatedObjects((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="flex gap-6">
      <Card className="w-80 h-fit">
        <CardHeader>
          <CardTitle>Create Qlik Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="kpi">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="kpi">KPI</TabsTrigger>
              <TabsTrigger value="field">Field</TabsTrigger>
              <TabsTrigger value="sheet">Sheet</TabsTrigger>
            </TabsList>

            {/* KPI CREATION */}
            <TabsContent value="kpi" className="space-y-2 mt-4">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="KPI Title"
              />
              <Label>Expression</Label>
              <Input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Sum(Sales)"
              />
              <Button className="w-full mt-2" onClick={createKPI}>
                Create KPI
              </Button>
            </TabsContent>

            {/* FIELD CREATION */}
            <TabsContent value="field" className="space-y-2 mt-4">
              <Label>Field Name</Label>
              <Input
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="Customer"
              />
              <Button className="w-full mt-2" onClick={createField}>
                Add Field Visualization
              </Button>
            </TabsContent>

            {/* SHEET SELECTION */}
            <TabsContent value="sheet" className="space-y-2 mt-4">
              <p className="text-sm text-gray-600">
                Add an existing sheet from your app.
              </p>
              <Button className="w-full mt-2" onClick={createSheet}>
                Add First Published Sheet
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {JSON.stringify(createdObjects, null, 2)}
        {/* {createdObjects.map((obj) => (
          <Card key={obj.id} className="relative">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{obj.title}</CardTitle>
              <Trash2
                className="text-red-500 cursor-pointer"
                size={18}
                onClick={() => removeObject(obj.id)}
              />
            </CardHeader>
            <CardContent>
              {appId && (
                <QlikWrapper>
                  <QlikEmbed
                    ui={obj.ui}
                    appId={appId}
                    objectId={obj.id}
                    fieldId={obj.ui === "analytics/field" ? obj.id : undefined}
                  />
                </QlikWrapper>

              )}
            </CardContent>
          </Card>
        ))} */}
        {createdObjects.map(obj => (
          <Card key={obj.id} className="border rounded-md p-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">{obj.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicQlikEmbed appId={appId!} ui={obj.ui} id={obj.id} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


function DynamicQlikEmbed({ appId, ui, id }: { appId: string; ui: string; id: string }) {
  if (!appId || !ui) return null;

  return (
    <QlikWrapper>
      {ui === "analytics/field" ? (
        <QlikEmbed ui="analytics/field" appId={appId} fieldId={id} />
      ) : ui === "analytics/sheet" ? (
        <QlikEmbed ui="analytics/sheet" appId={appId} objectId={id} />
      ) : ui === "analytics/chart" ? (
        <QlikEmbed ui="analytics/chart" appId={appId} objectId={id} />
      ) : ui === "analytics/selections" ? (
        <QlikEmbed ui="analytics/selections" appId={appId} />
      ) : (
        <div className="text-sm text-red-600 p-2 border rounded">
          Unsupported UI type: <b>{ui}</b>
        </div>
      )}
    </QlikWrapper>
  );
}