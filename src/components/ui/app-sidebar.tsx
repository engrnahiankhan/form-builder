"use client";

import type * as React from "react";
import {
  BookPlus,
  Brush,
  Download,
  HomeIcon as House,
  Share2,
  SquarePlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    icon: House,
    url: "/",
  },
  {
    title: "Create new",
    icon: SquarePlus,
    url: "/create",
  },
  {
    title: "Share",
    icon: Share2,
    url: "/share",
  },
  {
    title: "Download",
    icon: Download,
    url: "/download",
  },
  {
    title: "Archive",
    icon: Brush,
    url: "/archive",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, state, setOpen } = useSidebar();

  const handleNavClick = (url: string) => {
    // If sidebar is collapsed, open it first, then navigate after a short delay
    if (state === "collapsed" && !isMobile) {
      setOpen(true);
      // Small delay to allow sidebar to start opening before navigation
      setTimeout(() => {
        window.location.href = url;
      }, 150);
    } else {
      // If expanded or mobile, navigate immediately
      window.location.href = url;
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-1.5 py-2 group-data-[collapsible=icon]:py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 relative">
          {/* BookPlus Icon - Always visible */}
          <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-10">
            <BookPlus className="size-5 group-data-[collapsible=icon]:size-5" />
          </div>

          {/* SidebarTrigger - Right side when expanded, hover position when collapsed */}
          <div className="group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:right-1 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hover:opacity-100 group-data-[collapsible=icon]:transition-opacity group-data-[collapsible=icon]:duration-200">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="lg"
                    tooltip={item.title}
                    onClick={() => handleNavClick(item.url)}
                    className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!w-12 group-data-[collapsible=icon]:!h-12 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:mx-auto">
                    <item.icon className="size-5 group-data-[collapsible=icon]:size-5" />
                    <span className="group-data-[collapsible=icon]:hidden text-base">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
