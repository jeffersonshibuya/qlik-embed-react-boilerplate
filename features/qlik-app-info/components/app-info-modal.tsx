"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenAppInfo } from "../hooks/use-open-info";
import { useEffect, useState } from "react";
import { useQlikStore } from "@/hooks/qlik-store";
import { AppPropsResponseType, AppPropsType } from "../types";
import { format } from "date-fns";
import { formatLabel } from "@/utils/format-label";

export const AppInfoModal = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const { isOpen, onClose } = useOpenAppInfo();

  const [appInfo, setAppInfo] = useState<AppPropsType>();

  useEffect(() => {
    if (!isOpen) return;

    async function fetchAppInfo() {
      const appProps: AppPropsResponseType = await qDoc.getAppProperties();
      const dataFormatted: AppPropsType = {
        id: appProps.id,
        lastReloadTime: format(appProps.qLastReloadTime, "MMM dd, yyyy"),
        modifiedDate: format(appProps.modifiedDate, "MMM dd, yyyy"),
        owner: appProps.owner,
        publishTime: format(appProps.publishTime, "MMM dd, yyyy"),
        published: appProps.published ? "Yes" : "No",
        version: appProps.qSavedInProductVersion,
        title: appProps.qTitle,
        usage: appProps.qUsage,
        spaceId: appProps.spaceId,
      };
      setAppInfo(dataFormatted);
    }
    if (qDoc) {
      fetchAppInfo();
    }
  }, [isOpen, qDoc]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>App Info</DialogTitle>
          <DialogDescription>
            Important details about the app selected
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-2 border-t border-white/10">
            <dl className="divide-y divide-slate/10">
              {appInfo &&
                (
                  Object.entries(appInfo) as [
                    keyof AppPropsType,
                    AppPropsType[keyof AppPropsType]
                  ][]
                ).map(([key, value]) => (
                  <div
                    className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    key={key}
                  >
                    <dt className="text-sm/6 font-semibold text-gray-800 capitalize">
                      {formatLabel(key)}
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
