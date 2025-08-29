import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { InsertTaskValues } from "../types";
import { createTask } from "../query/create-task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, InsertTaskValues>({
    mutationFn: async (json) => {
      const response = await createTask(json);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created");
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  return mutation;
};
