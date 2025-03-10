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
import { Search, Filter, MoreHorizontal, AlertTriangle } from "lucide-react";

// Sample warnings data
const warnings = [
  {
    id: "WRN-001",
    source: "Authentication Service",
    message: "Multiple failed login attempts",
    timestamp: "2025-04-10T08:45:12",
    severity: "medium",
    status: "active"
  },
  {
    id: "WRN-002",
    source: "Database",
    message: "High CPU usage detected",
    timestamp: "2025-04-10T09:30:45",
    severity: "high",
    status: "active"
  },
  {
    id: "WRN-003",
    source: "File Storage",
    message: "Storage capacity at 85%",
    timestamp: "2025-04-10T10:15:33",
    severity: "medium",
    status: "active"
  },
  {
    id: "WRN-004",
    source: "API Gateway",
    message: "Rate limit approaching threshold",
    timestamp: "2025-04-10T11:22:18",
    severity: "low",
    status: "active"
  },
  {
    id: "WRN-005",
    source: "User Management",
    message: "Unusual account activity detected",
    timestamp: "2025-04-10T12:05:27",
    severity: "medium",
    status: "resolved"
  },
  {
    id: "WRN-006",
    source: "Payment Processing",
    message: "Payment gateway response delay",
    timestamp: "2025-04-10T13:40:55",
    severity: "medium",
    status: "active"
  },
  {
    id: "WRN-007",
    source: "Network",
    message: "Intermittent connectivity issues",
    timestamp: "2025-04-10T14:15:30",
    severity: "high",
    status: "resolved"
  },
  {
    id: "WRN-008",
    source: "Security",
    message: "Suspicious IP address detected",
    timestamp: "2025-04-10T15:50:22",
    severity: "high",
    status: "active"
  }
];

// Helper function to get badge variant based on severity
function getSeverityBadge(severity: string) {
  switch (severity) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
}

export default function WarningsPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Warnings History</h1>
        <p className="text-muted-foreground">
          Track and manage system warnings and alerts.
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Warnings
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                High Severity
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved Today
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                -3 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Warning Log</CardTitle>
            <CardDescription>
              A comprehensive log of all system warnings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  placeholder="Search warnings..." 
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
                    <TableHead>Source</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warnings.map((warning) => (
                    <TableRow key={warning.id}>
                      <TableCell className="font-medium">{warning.id}</TableCell>
                      <TableCell>{warning.source}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{warning.message}</TableCell>
                      <TableCell>{new Date(warning.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadge(warning.severity)}>
                          {warning.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={warning.status === "active" ? "outline" : "secondary"}>
                          {warning.status}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ignore</DropdownMenuItem>
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