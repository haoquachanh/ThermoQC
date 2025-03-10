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
import { Search, Filter, MoreHorizontal, AlertOctagon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample errors data
const errors = [
  {
    id: "ERR-001",
    source: "Authentication Service",
    message: "Failed to connect to authentication provider",
    timestamp: "2025-04-10T07:15:33",
    severity: "critical",
    status: "unresolved"
  },
  {
    id: "ERR-002",
    source: "Database",
    message: "Database connection timeout",
    timestamp: "2025-04-10T08:22:45",
    severity: "critical",
    status: "resolved"
  },
  {
    id: "ERR-003",
    source: "API Gateway",
    message: "Internal server error (500)",
    timestamp: "2025-04-10T09:45:12",
    severity: "high",
    status: "unresolved"
  },
  {
    id: "ERR-004",
    source: "File Storage",
    message: "Failed to upload file: permission denied",
    timestamp: "2025-04-10T10:30:55",
    severity: "medium",
    status: "unresolved"
  },
  {
    id: "ERR-005",
    source: "Payment Processing",
    message: "Payment gateway connection refused",
    timestamp: "2025-04-10T11:15:27",
    severity: "high",
    status: "resolved"
  },
  {
    id: "ERR-006",
    source: "User Management",
    message: "Failed to create user: duplicate email",
    timestamp: "2025-04-10T12:40:18",
    severity: "medium",
    status: "resolved"
  },
  {
    id: "ERR-007",
    source: "Security",
    message: "SSL certificate validation failed",
    timestamp: "2025-04-10T13:55:42",
    severity: "critical",
    status: "unresolved"
  },
  {
    id: "ERR-008",
    source: "Notification Service",
    message: "Failed to send email notifications",
    timestamp: "2025-04-10T14:20:33",
    severity: "high",
    status: "unresolved"
  }
];

// Helper function to get badge variant based on severity
function getSeverityBadge(severity: string) {
  switch (severity) {
    case "critical":
      return "destructive";
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

export default function ErrorsPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Error History</h1>
        <p className="text-muted-foreground">
          Track and manage system errors and exceptions.
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unresolved Errors
              </CardTitle>
              <AlertOctagon className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Critical Errors
              </CardTitle>
              <AlertOctagon className="h-4 w-4 text-red-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
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
              <AlertOctagon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Errors</TabsTrigger>
            <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Error Log</CardTitle>
                <CardDescription>
                  A comprehensive log of all system errors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input 
                      placeholder="Search errors..." 
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
                      {errors.map((error) => (
                        <TableRow key={error.id}>
                          <TableCell className="font-medium">{error.id}</TableCell>
                          <TableCell>{error.source}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{error.message}</TableCell>
                          <TableCell>{new Date(error.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getSeverityBadge(error.severity)}>
                              {error.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={error.status === "unresolved" ? "outline" : "secondary"}>
                              {error.status}
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
                                <DropdownMenuItem>Assign</DropdownMenuItem>
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
          </TabsContent>
          
          <TabsContent value="unresolved">
            <Card>
              <CardHeader>
                <CardTitle>Unresolved Errors</CardTitle>
                <CardDescription>
                  Errors that require immediate attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {errors
                        .filter(error => error.status === "unresolved")
                        .map((error) => (
                          <TableRow key={error.id}>
                            <TableCell className="font-medium">{error.id}</TableCell>
                            <TableCell>{error.source}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{error.message}</TableCell>
                            <TableCell>{new Date(error.timestamp).toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={getSeverityBadge(error.severity)}>
                                {error.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Resolve</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="critical">
            <Card>
              <CardHeader>
                <CardTitle>Critical Errors</CardTitle>
                <CardDescription>
                  High-priority errors that need immediate attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {errors
                        .filter(error => error.severity === "critical")
                        .map((error) => (
                          <TableRow key={error.id}>
                            <TableCell className="font-medium">{error.id}</TableCell>
                            <TableCell>{error.source}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{error.message}</TableCell>
                            <TableCell>{new Date(error.timestamp).toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={error.status === "unresolved" ? "outline" : "secondary"}>
                                {error.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Resolve</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}