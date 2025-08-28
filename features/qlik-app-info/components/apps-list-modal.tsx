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
import { useEffect, useState } from "react";
import { useQlikStore } from "@/hooks/qlik-store";
import { useOpenAppsList } from "../hooks/use-open-apps-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getUserApps,
  QLikAppsResponseAttributes,
} from "@/app/_lib/get-user-apps";
import { ChevronRight } from "lucide-react";
import { useAppStore } from "@/hooks/use-app";
import { openAppSession } from "@qlik/api/qix";
import { Spinner } from "@/components/spinner";

export const AppsListModal = () => {
  const { setQDoc } = useQlikStore();
  const { setAppInfo } = useAppStore();
  const { isOpen, onClose } = useOpenAppsList();

  const [apps, setApps] = useState<QLikAppsResponseAttributes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchAppsList() {
      setLoading(true);
      try {
        const response = await getUserApps();
        setApps(response.filter((app) => app.usage === "ANALYTICS"));
      } catch (error) {
        alert("Error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppsList();
  }, [isOpen]);

  const handleAppSelect = async (appId: string, appName: string) => {
    try {
      setLoading(true);
      const session = openAppSession({
        appId,
      });
      const doc = await session.getDoc();
      setQDoc(doc);
      setAppInfo(appId, appName);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Apps List</DialogTitle>
          <DialogDescription>
            List of all Apps you have access to
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-white/70 z-10">
            <Spinner
              size={"large"}
              borderSize={"medium"}
              borderColor={"green"}
            />
            Loading Info...
          </div>
        ) : (
          <ScrollArea className="max-h-[50vh] w-full border rounded-md  overflow-auto">
            <ul role="list" className="divide-y divide-slate/10 p-4  ">
              {apps?.map((app) => (
                <li
                  key={app.id}
                  className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-slate-100 px-2"
                  onClick={() => handleAppSelect(app.id, app.name)}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-600">
                        {app.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 w-[200px] text-gray-400">
                        {app.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex  items-center gap-8">
                    <div className="flex-col">
                      <p className="text-sm/6 text-slate-500">{app.id}</p>
                    </div>
                    <ChevronRight size={18} />
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
