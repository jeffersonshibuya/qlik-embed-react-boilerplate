import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { deleteTask } from "../query/delete-task";

type RequestType = {
  taskId: string;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, RequestType>({
    mutationFn: async (json) => {
      await deleteTask(json.taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Deleted");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
