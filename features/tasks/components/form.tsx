"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  insertTasksSchema,
  InsertTaskValues,
  ResponseTaskValues,
} from "../types";
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
import { useEffect, useState } from "react";
import { Doc, openAppSession } from "@qlik/api/qix";
import { TasksList } from "./tasks-list";
import { getTasks } from "../query/get-tasks";
import { checkTask } from "../query/check-task";
import { deleteTask } from "../query/delete-task";
import { uncheckTask } from "../query/uncheck-task";
import { toast } from "sonner";

export const TaskForm = () => {
  const [loading, setLoading] = useState(false);
  const [qDoc, setQDoc] = useState<Doc>();
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState<ResponseTaskValues[]>([]);
  const [appReloading, setAppReloading] = useState(false);

  const form = useForm<InsertTaskValues>({
    resolver: zodResolver(insertTasksSchema),
    defaultValues: {
      name: "",
      completedAt: undefined,
    },
  });

  async function fetchTasks() {
    setLoadingTasks(true);
    const tasksList = await getTasks();
    setTasks(tasksList);
    setLoadingTasks(false);
  }

  async function onSubmit(values: InsertTaskValues) {
    setLoading(true);
    await createTask(values);
    form.reset({
      name: "",
    });
    setLoading(false);
    fetchTasks();
    triggerReload();
  }

  async function handleDelete(taskId: string) {
    await deleteTask(taskId);
    fetchTasks();
    triggerReload();
  }

  async function handleCheckTask(taskId: string) {
    if (tasks.filter((task) => task.id === taskId)[0].completedAt) {
      await uncheckTask(taskId);
    } else {
      await checkTask(taskId);
    }
    fetchTasks();
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
    fetchTasks();
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
                disabled={appReloading || loading}
                className="bg-indigo-700 text-white"
              >
                {appReloading ? "App Reloading please wait..." : "Reload App"}
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
      </div>
      <TasksList
        tasks={tasks}
        loading={loadingTasks}
        onCheck={handleCheckTask}
        onDelete={handleDelete}
      />
    </div>
  );
};
