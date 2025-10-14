import { useQuery } from "@tanstack/react-query";
import { getQlikData } from "@/app/_lib/get-qlik-data";
import { useQlikStore } from "./qlik-store";

interface UseQlikDataParams {
  page?: number;
  pageSize?: number;
  woFilter?: string;
  statusFilter?: string[];
  typeFilter?: string[];
  programFilter?: string[];
  workGroupFilter?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useQlikData(params: UseQlikDataParams = {}) {
  const { qDoc } = useQlikStore();

  return useQuery({
    queryKey: ["qlik-data-enhanced", params],
    queryFn: () => getQlikData({ ...params, qDoc }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!qDoc, // Only run query when qDoc is available
  });
}
