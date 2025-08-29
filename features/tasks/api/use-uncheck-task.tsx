import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { uncheckTask } from "../query/uncheck-task";

type RequestType = {
  taskId: string;
};

export const useUncheckTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await uncheckTask(json.taskId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task is now pending");
    },
    onError: () => {
      toast.error("Failed to complete task");
    },
  });

  return mutation;
};
