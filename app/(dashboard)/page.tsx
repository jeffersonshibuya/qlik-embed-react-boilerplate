"use client"
import { useEffect, useState } from "react";
import { getUserInfo } from "../_lib/get-user-info";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>();

  useEffect(() => {
    async function getUser() {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    }

    getUser();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <LayoutDashboard className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back,{" "}
              <span className="font-medium text-indigo-600">
                {user?.name || "Guest"}
              </span>{" "}
            </p>
          </div>
        </div>

      </div>

      <Separator />

      {/* Info Card */}
      <Card className="bg-indigo-50 border-indigo-100">
        <CardContent className="py-4 text-center space-y-2">
          <p className="text-gray-700 font-medium">
            This application demonstrates <strong>Qlik-Embed</strong> capabilities.
          </p>
          <p className="text-gray-600 text-sm">
            Try out creating sheets, charts, KPIs, and fields on the fly.
            Explore selections, filtering, and interactions to see the full potential of embedding Qlik analytics into a web page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
