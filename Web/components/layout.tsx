"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <div
          className={cn(
            "fixed inset-y-0 z-50 mt-16 w-64 transition-transform duration-300 md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar className="border-r h-[calc(100vh-4rem)]" />
        </div>
        <div
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          )}
        >
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
