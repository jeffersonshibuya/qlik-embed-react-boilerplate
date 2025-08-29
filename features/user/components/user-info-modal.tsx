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
import { useOpenUserInfo } from "../hooks/use-open-user-info";
import { getUserInfo, UserResponseType } from "@/app/_lib/get-user-info";
import { UserItemInfo } from "./user-item-info";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserLock, UsersIcon } from "lucide-react";
import { Spinner } from "@/components/spinner";

export const UserInfoModal = () => {
  const { isOpen, onClose } = useOpenUserInfo();

  const [userInfo, setUserInfo] = useState<UserResponseType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetcUserInfo() {
      setLoading(true);
      try {
        const userResponse = await getUserInfo();
        setUserInfo(userResponse);
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetcUserInfo();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>User Info</DialogTitle>
          <DialogDescription>
            Important details about the user logged in
          </DialogDescription>
        </DialogHeader>
        <div>
          {loading ? (
            <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-white/80 z-10">
              <Spinner
                size={"large"}
                borderSize={"medium"}
                borderColor={"green"}
              />
              Loading Info...
            </div>
          ) : (
            <div className="mt-2 divide-y divide-lsate-300">
              <UserItemInfo title="Name" value={userInfo?.name} />
              <UserItemInfo title="Email" value={userInfo?.email} />
              <UserItemInfo
                title="Last Updated"
                value={
                  userInfo?.lastUpdated &&
                  format(userInfo.lastUpdated, "MMM dd, yyyy")
                }
              />
              <UserItemInfo
                title="Created At"
                value={
                  userInfo?.createdAt &&
                  format(userInfo.createdAt, "MMM dd, yyyy")
                }
              />
              <UserItemInfo
                title="Roles"
                value={<UserRoles roles={userInfo?.roles || []} />}
              />
              <UserItemInfo
                title="Assigned Groups"
                value={
                  <UserAssignedGroups groups={userInfo?.assignedGroups || []} />
                }
              />
            </div>
          )}
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

function UserRoles({ roles }: { roles: string[] }) {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <ul className="divide-y divide-gray-300 s">
        {roles?.map((role) => (
          <li key={role} className="py-1 flex items-center gap-1">
            <UserLock size={16} className="shrink-0" />
            {role}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

function UserAssignedGroups({
  groups,
}: {
  groups: { id: string; name: string }[];
}) {
  return (
    <ScrollArea className="h-[150px] w-full rounded-md border p-4">
      <ul className="divide-y divide-gray-300 s">
        {groups?.map((group) => (
          <li key={group.id} className="py-1 flex items-center gap-1">
            <UsersIcon size={16} className="shrink-0" />
            {group.name}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
