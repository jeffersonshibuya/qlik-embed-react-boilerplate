import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { checkTask } from "../query/check-task";

type RequestType = {
  taskId: string;
};

export const useCheckTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await checkTask(json.taskId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Completed");
    },
    onError: () => {
      toast.error("Failed to complete task");
    },
  });

  return mutation;
};
