"use client";

import { QlikDataTableType } from "@/features/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<QlikDataTableType>[] = [
  {
    accessorKey: "WO",
    header: "WO Nbr",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "workGroup",
    header: "Work Group",
  },
  {
    accessorKey: "polSub",
    header: "Pol. Sub.",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "statusDate",
    header: "Status Date",
  },
];
