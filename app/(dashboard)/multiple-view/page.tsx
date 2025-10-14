/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQlikStore } from "@/hooks/qlik-store";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppStore } from "@/hooks/use-app";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  appId: z.string().min(1, "App ID is required"),
  sheetId: z.string().min(1, "Sheet ID is required"),
  qDoc: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

const MultipeView = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const appId = useAppStore((s) => s.appId);
  const [dataDisplay, setDataDisplay] = useState<{ appId: string, sheetId: string, qDoc: any }[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { appId: "", sheetId: "", qDoc: {} },
  });

  const onSubmit = async (values: FormValues) => {
    setDataDisplay((prev) => [...prev, values]);
    form.reset();
  };

  const handleRemove = (index: number) => {
    setDataDisplay((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- FORM ---------- */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add a Qlik Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              placeholder="App ID"
              {...form.register("appId")}
              className="flex-1"
            />
            <Input
              placeholder="Sheet ID"
              {...form.register("sheetId")}
              className="flex-1"
            />
            <Button type="submit" className="whitespace-nowrap">
              Add
            </Button>
          </form>
          {form.formState.errors.appId && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.appId.message}
            </p>
          )}
          {form.formState.errors.sheetId && (
            <p className="text-sm text-red-500">
              {form.formState.errors.sheetId.message}
            </p>
          )}
        </CardContent>
      </Card>


      {/* ---------- DISPLAY EMBEDDED SHEETS ---------- */}
      <div className="h-[73vh] w-full border overflow-auto p-4 space-y-6">
        {dataDisplay.map((data, i) => (

          <Card key={`${data.appId}-${data.sheetId}`}>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-sm font-medium">
                {data.sheetId}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(i)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="h-[500px]">
              <iframe
                key={data.appId}
                src={`https://ipc-lab.us.qlikcloud.com/sense/app/${data.appId}/sheet/${data.sheetId}`}
                className="w-full h-[500px] border"
              ></iframe>
              {/* <QlikWrapper>
                <QlikEmbed
                  ui="analytics/sheet"
                  objectId={data.sheetId}
                  appId={data.appId}
                  context={{ interactions: { active: true } }}
                />
              </QlikWrapper> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultipeView;
