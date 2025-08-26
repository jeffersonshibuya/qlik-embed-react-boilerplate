"use client";

import { QLikAppsResponseAttributes } from "@/app/_lib/get-user-apps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/hooks/use-app";

import { Edit } from "lucide-react";
import { ShowSheet } from "./show-sheet";

export const AppsList = ({ apps }: { apps: QLikAppsResponseAttributes[] }) => {
  const { setAppId, appId } = useAppStore();

  return (
    <div className="flex flex-col divide-x-2 space-x-3 flex-1">
      <div className="grid w-full [&>div]:max-h-[30vh] [&>div]:border [&>div]:rounded">
        <Table>
          <TableHeader>
            <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
              <TableHead className="text-left"></TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Last Reload Time</TableHead>
              <TableHead>Modified Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-hidden">
            {apps?.map((app) => (
              <TableRow
                key={app.id}
                className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
              >
                <TableCell className="">
                  <Edit
                    size={18}
                    className="cursor-pointer"
                    onClick={() => setAppId(app.id)}
                  />
                </TableCell>
                <TableCell className="pl-4">{app.id}</TableCell>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell className="truncate max-w-[300px]">
                  {app.description}
                </TableCell>
                <TableCell>{app.owner}</TableCell>
                <TableCell>{app.createdDate}</TableCell>
                <TableCell>{app.lastReloadTime}</TableCell>
                <TableCell>{app.modifiedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-4">
        {appId ? <ShowSheet /> : <div>Please Select an APP</div>}
      </div>
    </div>
  );
};
