import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreHorizontal } from "lucide-react";

// Sample activity data
const activities = [
  {
    id: "ACT-001",
    user: "John Doe",
    action: "Login",
    timestamp: "2025-04-10T09:32:45",
    status: "success",
    details: "User logged in from 192.168.1.105"
  },
  {
    id: "ACT-002",
    user: "Sarah Smith",
    action: "File Upload",
    timestamp: "2025-04-10T10:15:22",
    status: "success",
    details: "Uploaded report.pdf (2.4MB)"
  },
  {
    id: "ACT-003",
    user: "Mike Johnson",
    action: "Settings Change",
    timestamp: "2025-04-10T11:05:17",
    status: "success",
    details: "Updated notification preferences"
  },
  {
    id: "ACT-004",
    user: "Emily Davis",
    action: "Data Export",
    timestamp: "2025-04-10T13:45:33",
    status: "success",
    details: "Exported Q1 financial data"
  },
  {
    id: "ACT-005",
    user: "Robert Wilson",
    action: "User Invite",
    timestamp: "2025-04-10T14:22:10",
    status: "pending",
    details: "Invited alex@example.com to join the team"
  },
  {
    id: "ACT-006",
    user: "Lisa Brown",
    action: "Report Generation",
    timestamp: "2025-04-10T15:30:45",
    status: "success",
    details: "Generated monthly analytics report"
  },
  {
    id: "ACT-007",
    user: "David Miller",
    action: "Password Reset",
    timestamp: "2025-04-10T16:12:38",
    status: "success",
    details: "Reset password via email link"
  },
  {
    id: "ACT-008",
    user: "Jennifer Lee",
    action: "API Access",
    timestamp: "2025-04-10T17:05:22",
    status: "success",
    details: "Generated new API key"
  }
];

export default function ActivitiesPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Activities History</h1>
        <p className="text-muted-foreground">
          View and manage all user activities in the system.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>
              A comprehensive log of all user activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  placeholder="Search activities..." 
                  className="w-[300px]"
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.id}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={activity.status === "success" ? "default" : "outline"}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{activity.details}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}