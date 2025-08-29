"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertTasksSchema, InsertTaskValues } from "../types";
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
import { useEffect, useState } from "react";
import { Doc, openAppSession } from "@qlik/api/qix";
import { TasksList } from "./tasks-list";
import { toast } from "sonner";
import { useGetTasks } from "../api/use-get-tasks";
import { useCreateTask } from "../api/use-create-task";
import { useCheckTask } from "../api/use-check-task";
import { useUncheckTask } from "../api/use-uncheck-task";
import { useDeleteTask } from "../api/use-delete-task";

export const TaskForm = () => {
  const tasksQuery = useGetTasks();
  const createTaskMutation = useCreateTask();
  const checkTaskMutation = useCheckTask();
  const uncheckTaskMutation = useUncheckTask();
  const taskDeleteMutation = useDeleteTask();

  const tasks = tasksQuery.data || [];

  const [qDoc, setQDoc] = useState<Doc>();
  const [appReloading, setAppReloading] = useState(false);

  const form = useForm<InsertTaskValues>({
    resolver: zodResolver(insertTasksSchema),
    defaultValues: {
      name: "",
      completedAt: undefined,
    },
  });

  async function onSubmit(values: InsertTaskValues) {
    await createTaskMutation.mutateAsync(values);
    form.reset({
      name: "",
    });
    triggerReload();
  }

  async function handleDelete(taskId: string) {
    await taskDeleteMutation.mutateAsync({ taskId });
    triggerReload();
  }

  async function handleCheckTask(taskId: string) {
    if (tasks.filter((task) => task.id === taskId)[0].completedAt) {
      await uncheckTaskMutation.mutateAsync({ taskId });
    } else {
      await checkTaskMutation.mutateAsync({ taskId });
    }
    triggerReload();
  }

  async function triggerReload() {
    if (qDoc) {
      setAppReloading(true);
      toast.promise(
        qDoc
          .doReload()
          .then(() => "App reloaded")
          .catch((error) => {
            throw new Error(error.message || "Failed to reload app");
          }),
        {
          loading: "Reloading app...",
          success: (message) => message,
          error: (error) => `Something went wrong: ${error.message}`,
          finally: () => setAppReloading(false),
        }
      );
    }
  }

  async function getDoc() {
    const appSession = openAppSession({
      appId: "9d443776-50ae-455c-bcd8-dad54dd1ae94",
    });
    const qDoc = await appSession.getDoc();
    setQDoc(qDoc);
  }

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
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
                disabled={appReloading || createTaskMutation.isPending}
                className="bg-indigo-700 text-white"
              >
                {appReloading ? "App Reloading please wait..." : "Reload App"}
              </Button>
              <Button
                disabled={createTaskMutation.isPending}
                type="submit"
                className="w-[100px] cursor-pointer"
              >
                {createTaskMutation.isPending ? "Saving task..." : "Save Task"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <TasksList
        tasks={tasks}
        loading={tasksQuery.isLoading}
        onCheck={handleCheckTask}
        onDelete={handleDelete}
      />
    </div>
  );
};
