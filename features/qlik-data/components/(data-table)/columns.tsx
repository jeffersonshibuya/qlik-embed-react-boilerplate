"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { QlikDataTableType } from "@/features/types";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Column, ColumnDef } from "@tanstack/react-table";
import { AlertCircle, BadgeCheck, Calendar, CheckCircle, Clock, FileText, MoreHorizontal, Settings, User } from "lucide-react";

export const columns: ColumnDef<QlikDataTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "WO",
    accessorKey: "WO",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span>Work Order</span>
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono font-medium">
          {cell.getValue<QlikDataTableType["WO"]>()}
        </span>
      </div>
    ),
    meta: {
      label: "Work Order",
      placeholder: "Search work orders...",
      variant: "text",
      icon: FileText,
    },
    enableColumnFilter: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span>Description</span>
      </div>
    ),
    cell: ({ cell }) => (
      <div className="max-w-[300px] truncate">
        {cell.getValue<QlikDataTableType["description"]>()}
      </div>
    ),
    meta: {
      label: "Description",
      placeholder: "Search descriptions...",
      variant: "text",
      icon: FileText,
    },
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <Settings className="h-4 w-4 text-muted-foreground" />
        <span>Type</span>
      </div>
    ),
    cell: ({ cell }) => {
      const type = cell.getValue<QlikDataTableType["type"]>();
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      );
    },
    meta: {
      label: "Type",
      variant: "multiSelect",
      options: [
        { label: "Preventive", value: "Preventive", icon: Settings },
        { label: "Corrective", value: "Corrective", icon: AlertCircle },
        { label: "Emergency", value: "Emergency", icon: Clock },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-muted-foreground" />
        <span>Status</span>
      </div>
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<QlikDataTableType["status"]>();
      const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed":
            return <CheckCircle className="h-4 w-4 text-green-600" />;
          case "in progress":
            return <Clock className="h-4 w-4 text-blue-600" />;
          case "scheduled":
            return <Calendar className="h-4 w-4 text-orange-600" />;
          default:
            return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
      };

      const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed":
            return "default";
          case "in progress":
            return "secondary";
          case "scheduled":
            return "outline";
          default:
            return "outline";
        }
      };

      return (
        <Badge variant={getStatusVariant(status)} className="capitalize">
          {getStatusIcon(status)}
          {status}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "multiSelect",
      options: [
        { label: "Completed", value: "Completed", icon: CheckCircle },
        { label: "In Progress", value: "In Progress", icon: Clock },
        { label: "Scheduled", value: "Scheduled", icon: Calendar },
        { label: "Pending", value: "Pending", icon: AlertCircle },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "program",
    accessorKey: "program",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-muted-foreground" />
        <span>Program</span>
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-muted-foreground" />
        {cell.getValue<QlikDataTableType["program"]>()}
      </div>
    ),
    meta: {
      label: "Program",
      variant: "multiSelect",
      options: [
        { label: "Maintenance", value: "Maintenance", icon: Settings },
        { label: "Operations", value: "Operations", icon: User },
        { label: "Safety", value: "Safety", icon: BadgeCheck },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "workGroup",
    accessorKey: "workGroup",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>Work Group</span>
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        {cell.getValue<QlikDataTableType["workGroup"]>()}
      </div>
    ),
    meta: {
      label: "Work Group",
      variant: "multiSelect",
      options: [
        { label: "Mechanical", value: "Mechanical", icon: Settings },
        { label: "Electrical", value: "Electrical", icon: User },
        { label: "Operations", value: "Operations", icon: User },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "statusDate",
    accessorKey: "statusDate",
    header: ({ column }: { column: Column<QlikDataTableType, unknown> }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>Status Date</span>
      </div>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue<QlikDataTableType["statusDate"]>();
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {date || "N/A"}
        </div>
      );
    },
    meta: {
      label: "Status Date",
      variant: "dateRange",
      icon: Calendar,
    },
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const workOrder = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Work Order</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 32,
  },
];
