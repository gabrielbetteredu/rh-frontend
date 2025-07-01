import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Mail, 
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';

// Define Invoice type (adjust fields as needed)
type Invoice = {
  _id: string;
  contractor: string;
  amount: string;
  status: 'received' | 'pending' | 'overdue' | string;
  month: string;
  date: string;
};

const Invoices = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch invoices from API
  const { data: invoices = [], isLoading } = useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await axios.get('/invoices');
      // Adapt the response to match the UI's expected fields if needed
      // Here we assume the backend returns an array of invoices with the required fields
      return response.data.data;
    },
  });

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.contractor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendReminder = (contractorName: string) => {
    toast({
      title: "Reminder Sent",
      description: `Invoice reminder sent to ${contractorName}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
              <p className="text-gray-600">Track and manage contractor invoices</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Request Emails
              </Button>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Invoice
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Month</TabsTrigger>
            <TabsTrigger value="consolidation">Consolidation</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>June 2024 Invoices</CardTitle>
                <CardDescription>Manage current month invoice requests and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search contractors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {/* Invoice Table */}
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center text-gray-500">Loading invoices...</div>
                  ) : filteredInvoices.length === 0 ? (
                    <div className="text-center text-gray-500">No invoices found</div>
                  ) : filteredInvoices.map((invoice) => (
                    <Card key={invoice._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{invoice.contractor}</h3>
                            <p className="text-sm text-gray-600">{invoice.amount} • {invoice.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(invoice.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1 capitalize">{invoice.status}</span>
                            </span>
                          </Badge>
                          
                          <div className="flex space-x-2">
                            {invoice.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSendReminder(invoice.contractor)}
                              >
                                <Mail className="mr-1 h-3 w-3" />
                                Remind
                              </Button>
                            )}
                            {invoice.status === 'received' && (
                              <Button size="sm" variant="outline">
                                <Download className="mr-1 h-3 w-3" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Day 1 Actions</CardTitle>
                  <CardDescription>Invoice request email campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invoice Request Emails
                  </Button>
                  <p className="text-sm text-gray-600">
                    Send bulk emails to all contractors requesting invoices for the current month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Day 4 Actions</CardTitle>
                  <CardDescription>Consolidation and follow-up</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Consolidation Report
                  </Button>
                  <p className="text-sm text-gray-600">
                    Create consolidation report and send to finance team
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consolidation">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Consolidation</CardTitle>
                <CardDescription>Prepare consolidated reports for finance team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">8</p>
                      <p className="text-sm text-gray-600">Received</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">1</p>
                      <p className="text-sm text-gray-600">Overdue</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Send to Finance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View past invoice periods and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Historical invoice data will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Invoices; 