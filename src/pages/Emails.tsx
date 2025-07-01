import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Send, 
  FileText,
  Copy,
  Edit,
  Users,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import axios from '../lib/axios';

// Define EmailTemplate type (adjust fields as needed)
type EmailTemplate = {
  _id: string;
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
};

const Emails = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Fetch email templates from API
  const { data: emailTemplates = [], isLoading } = useQuery<EmailTemplate[]>({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const response = await axios.get('/email-templates');
      // Adapt the response to match the UI's expected fields if needed
      // Here we assume the backend returns an array of templates with the required fields
      return response.data.data;
    },
  });

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Email template has been processed and sent",
    });
  };

  const handleCopyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template Copied",
      description: "Email template copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
              <p className="text-gray-600">Manage email templates and bulk communications</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Recipients
              </Button>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Bulk Email
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="composer">Email Composer</TabsTrigger>
            <TabsTrigger value="history">Email History</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Template List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Templates</CardTitle>
                    <CardDescription>Select a template to preview and use</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isLoading ? (
                      <div className="text-center text-gray-500">Loading templates...</div>
                    ) : emailTemplates.length === 0 ? (
                      <div className="text-center text-gray-500">No templates found</div>
                    ) : emailTemplates.map((template) => (
                      <Card 
                        key={template._id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate === template._id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedTemplate(template._id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{template.name}</h4>
                              <p className="text-sm text-gray-600">{template.category}</p>
                            </div>
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Template Preview */}
              <div className="lg:col-span-2">
                {selectedTemplate ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {emailTemplates.find(t => t._id === selectedTemplate)?.name}
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCopyTemplate(emailTemplates.find(t => t._id === selectedTemplate)?.body || "")}
                          >
                            <Copy className="mr-1 h-3 w-3" />
                            Copy
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="font-semibold">Subject:</Label>
                        <div className="p-3 bg-gray-50 rounded mt-1">
                          {emailTemplates.find(t => t._id === selectedTemplate)?.subject}
                        </div>
                      </div>
                      <div>
                        <Label className="font-semibold">Body:</Label>
                        <div className="p-4 bg-gray-50 rounded mt-1 whitespace-pre-wrap font-mono text-sm">
                          {emailTemplates.find(t => t._id === selectedTemplate)?.body}
                        </div>
                      </div>
                      <div className="flex space-x-4 pt-4">
                        <Button className="flex-1" onClick={handleSendEmail}>
                          <Send className="mr-2 h-4 w-4" />
                          Use Template
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Mail Merge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a template to preview</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="composer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Composer</CardTitle>
                <CardDescription>Create and send custom emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="recipients">Recipients</Label>
                    <Input id="recipients" placeholder="Enter email addresses..." />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Email subject..." />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email-body">Email Body</Label>
                  <Textarea 
                    id="email-body" 
                    rows={12}
                    placeholder="Type your email content here..."
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Save as Template
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Send
                    </Button>
                  </div>
                  <Button onClick={handleSendEmail}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Email History</CardTitle>
                <CardDescription>View previously sent emails and campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">Invoice Request - June 2024</p>
                      <p className="text-sm text-gray-600">Sent to 45 recipients • June 1, 2024</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Resend</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Emails; 