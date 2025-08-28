"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenAppsList } from "@/features/qlik-app-info/hooks/use-open-apps-list";
import { useOpenAppInfo } from "@/features/qlik-app-info/hooks/use-open-info";
import { useAppStore } from "@/hooks/use-app";
import { ChevronsUpDown, Info, RefreshCcw } from "lucide-react";

export const AppSelection = () => {
  const { appId, appName } = useAppStore();
  const openAppInfo = useOpenAppInfo((s) => s.onOpen);
  const openAppsList = useOpenAppsList((s) => s.onOpen);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2  py-1.5 px-3 rounded-lg">
        <div className="text-start flex flex-col gap-1 leading-none">
          <span className="text-sm leading-none font-semibold ">{appName}</span>
          <span className="text-xs text-muted-foreground">{appId}</span>
        </div>
        <ChevronsUpDown className="ml-6 h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        <DropdownMenuLabel>App Selection</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openAppsList}>
          <RefreshCcw className="h-4 w-4" /> Change App
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openAppInfo}>
          <Info className="h-4 w-4" /> App Info
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
