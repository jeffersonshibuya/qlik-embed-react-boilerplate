/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";

export const AppInfo = () => {
  const qDoc = useQlikStore((s) => s.qDoc);
  const [sheets, setSheets] = useState();

  useEffect(() => {
    async function fetchAppInfo() {
      const infos = await qDoc.getAllInfos();
      console.log(infos);
      const sheetsResponse = infos.filter((i: any) => i.qType === "sheet");
      setSheets(sheetsResponse);
    }

    if (qDoc) {
      fetchAppInfo();
    }
  }, [qDoc]);

  return (
    <div>
      <h1>App info</h1>
    </div>
  );
};
