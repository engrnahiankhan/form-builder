import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import UserSettings from "../feature/common/user-settings/UserSettings";
import useFormsData from "@/hooks/useFormsData";

const PrivateLayout = () => {
  useFormsData();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-18 shrink-0 items-center border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 justify-between px-4 lg:px-6 xl:px-8">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-extrabold text-2xl">Form Builder.</h1>
          </div>
          <UserSettings />
        </header>
        <main className="overflow-hidden p-4 lg:p-6 xl:p-8 min-h-screen">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
