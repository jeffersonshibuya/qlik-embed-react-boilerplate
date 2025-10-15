"use client";

import * as React from "react";
import {
  IconAdjustmentsCog,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconHammer,
  IconHelp,
  IconInnerShadowTop,
  IconInputSearch,
  IconListDetails,
  IconSettings,
  IconTable,
  IconTableSpark,
} from "@tabler/icons-react";

import { NavMain } from "./nav/nav-main";
import { NavSecondary } from "./nav/nav-secondary";
import { NavUser } from "./nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavForm } from "./nav/nav-form";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Charts",
      url: "/charts",
      icon: IconChartBar,
    },

    {
      title: "Sheet",
      url: "/sheet",
      icon: IconTable,
    },
    {
      title: "Multiple Sheet View",
      url: "/multiple-sheet-view",
      icon: IconTableSpark,
    },
    {
      title: "Control Actions",
      url: "/control-actions",
      icon: IconAdjustmentsCog,
    },
    // {
    //   title: "Playground",
    //   url: "/playground",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Multiple Apps",
    //   url: "/multiple-view",
    //   icon: IconListDetails,
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  navForm: [
    {
      title: "Chart Builder",
      url: "/chart-builder-demo",
      icon: IconHammer,
    },
    {
      title: "Custom Fields",
      url: "/custom-fields",
      icon: IconInputSearch,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: IconListDetails,
    },
  ],
  documents: [
    {
      name: "Form Integration",
      url: "/form",
      icon: IconDatabase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">IPC inTake & Qlik Embed</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavForm items={data.navForm} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
