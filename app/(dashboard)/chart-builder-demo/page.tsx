"use client";

import { useEffect, useState } from "react";
import { QlikEmbed } from "@qlik/embed-react";
import { useAppStore } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QlikWrapper } from "@/features/charts/components/qlik-embed-wrapper";
import { Trash2 } from "lucide-react";
import { useQlikStore } from "@/hooks/qlik-store";
import { getAllFields } from "@/data/get-all-fields";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChartBuilderDemo() {
  const appId = useAppStore((s) => s.appId);
  const qDoc = useQlikStore((s) => s.qDoc);

  const [chartType, setChartType] = useState("barchart");
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [dimInput, setDimInput] = useState("");
  const [measureInput, setMeasureInput] = useState("");
  const [fields, setFields] = useState<string[]>([])

  useEffect(() => {

    async function getMasterItemsData() {
      const fieldsData = await getAllFields(qDoc) as string[]
      setFields(fieldsData)
    }

    if (qDoc) getMasterItemsData()

  }, [qDoc])

  const handleAddDimension = () => {
    if (dimInput.trim()) {
      setDimensions((prev) => [...prev, dimInput.trim()]);
      setDimInput("");
    }
  };

  const handleAddMeasure = () => {
    if (measureInput.trim()) {
      setMeasures((prev) => [...prev, measureInput.trim()]);
      setMeasureInput("");
    }
  };

  const handleRemoveDimension = (index: number) => {
    setDimensions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveMeasure = (index: number) => {
    setMeasures((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">📊 Dynamic Chart Builder</h1>
      <p className="text-gray-600">
        Dynamically create a Qlik chart by entering dimensions and measures.
        You can switch chart types and instantly see the new visualization.
      </p>

      <div className="flex items-start gap-2 justify-between">


        <div className="border rounded-xl p-4 flex-1 shadow">
          <h2 className="text-lg font-medium mb-2">Chart Output</h2>
          <div className="h-[600px]">
            {appId && (
              <QlikWrapper>
                <QlikEmbed
                  ui="analytics/chart"
                  type={chartType}
                  appId={appId}
                  dimensions={dimensions}
                  measures={measures}
                />
              </QlikWrapper>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Chart Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Chart Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barchart">Bar Chart</SelectItem>
                    <SelectItem value="linechart">Line Chart</SelectItem>
                    <SelectItem value="piechart">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dimensions</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={dimInput}
                    onChange={(e) => setDimInput(e.target.value)}
                    placeholder="e.g. WORK_ORDER_NBR"
                  />
                  <Button type="button" onClick={handleAddDimension}>
                    Add
                  </Button>
                </div>
                {dimensions.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
                    {dimensions.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-gray-50 border rounded p-2 text-sm"
                      >
                        <span>{d}</span>
                        <Trash2
                          size={16}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleRemoveDimension(i)}
                        />
                      </li>

                    ))}
                  </ul>
                )}
              </div>

              <div>
                <Label>Measures</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={measureInput}
                    onChange={(e) => setMeasureInput(e.target.value)}
                    placeholder='e.g. Count(STATUS_DATE)'
                  />
                  <Button type="button" onClick={handleAddMeasure}>
                    Add
                  </Button>
                </div>
                {measures.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
                    {measures.map((m, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-gray-50 border rounded p-2 text-sm"
                      >
                        <span>{m}</span>
                        <Trash2
                          size={16}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleRemoveMeasure(i)}
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
    </div>
  );
}
