import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../query/get-tasks";

export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getTasks();
      return response;
    },
  });

  return query;
};
