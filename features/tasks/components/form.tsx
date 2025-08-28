"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertScheduledSchema, InsertTaskValues } from "../types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "../query/create-task";
import { useState } from "react";
import { openAppSession } from "@qlik/api/qix";

export const TaskForm = () => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState<{
    isShow: boolean;
    message?: string;
  }>({
    isShow: false,
    message: "",
  });

  const form = useForm<InsertTaskValues>({
    resolver: zodResolver(insertScheduledSchema),
    defaultValues: {
      name: "",
      completedAt: undefined,
    },
  });

  async function onSubmit(values: InsertTaskValues) {
    setLoading(true);
    await createTask(values);
    form.reset({
      name: "",
    });
    setLoading(false);
    triggerReload();
  }

  async function triggerReload() {
    const appSession = openAppSession({
      appId: "9d443776-50ae-455c-bcd8-dad54dd1ae94",
    });
    const qDoc = await appSession.getDoc();

    setShowMessage({ isShow: true, message: "Reloading app..." });
    const reloadResponse = await qDoc.doReload();
    console.log(reloadResponse);
    setShowMessage({ isShow: false });
  }

  return (
    <div className="my-4 border rounded-lg p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input placeholder="task..." {...field} />
                </FormControl>
                <FormDescription>Inform a task name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="ml-auto flex justify-end gap-4">
            <Button
              type="button"
              onClick={triggerReload}
              className="bg-indigo-700 text-white"
            >
              Reload App
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="w-[100px] cursor-pointer"
            >
              {loading ? "Saving task..." : "Save Task"}
            </Button>
          </div>
        </form>
      </Form>

      {showMessage.isShow && <div>Reloading App...</div>}
    </div>
  );
};
