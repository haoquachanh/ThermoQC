"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Clock,
  AlertTriangle,
  AlertOctagon,
  Settings,
  Users,
  BarChart,
  HelpCircle,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/imgdata">
                <BarChart className="mr-2 h-4 w-4" />
                Img Data
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Activities
          </h2>
          <div className="space-y-1">
            <Button
              variant={
                pathname === "/history/activities" ? "secondary" : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/activities/history">
                <Clock className="mr-2 h-4 w-4" />
                History
              </Link>
            </Button>
            <Button
              variant={pathname === "/history/warnings" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/activities/warnings">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Warnings
              </Link>
            </Button>
            <Button
              variant={pathname === "/history/errors" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/activities/errors">
                <AlertOctagon className="mr-2 h-4 w-4" />
                Errors
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                General
              </Link>
            </Button>
            <Button
              variant={pathname === "/users" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Support
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/help" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
