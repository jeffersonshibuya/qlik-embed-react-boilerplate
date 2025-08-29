"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponseTaskValues } from "../types";
import { format } from "date-fns";
import { Square, SquareCheck, Trash } from "lucide-react";
import { Spinner } from "@/components/spinner";

interface TasksListProps {
  tasks: ResponseTaskValues[];
  loading: boolean;
  onCheck: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TasksList = ({
  tasks,
  loading,
  onCheck,
  onDelete,
}: TasksListProps) => {
  return (
    <div className="my-4 border rounded-lg p-6">
      <ScrollArea className="h-[250px] w-full ">
        {loading && (
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-white/80 z-10">
            <Spinner
              size={"large"}
              borderSize={"medium"}
              borderColor={"green"}
            />
          </div>
        )}
        <div className="divide-y divide-slate-300 pr-6">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-col py-2">
              <div className="flex items-center justify-between">
                <div className="flex-col">
                  <p className="text-sm">{task.name}</p>
                  <p className="text-xs text-slate-500">
                    Updated: {format(String(task.updatedAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex  items-center gap-2">
                  <p className="text-slate-500 border-r pr-2 border-slate-400">
                    {task.completedAt ? (
                      <SquareCheck
                        size={16}
                        color="green"
                        className="cursor-pointer"
                        onClick={() => onCheck(task.id)}
                      />
                    ) : (
                      <Square
                        size={16}
                        color="indigo"
                        className="cursor-pointer"
                        onClick={() => onCheck(task.id)}
                      />
                    )}
                  </p>
                  <Trash
                    size={16}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => onDelete(task.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
