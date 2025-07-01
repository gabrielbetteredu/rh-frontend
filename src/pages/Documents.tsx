import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    Filter,
    FileText,
    Upload,
    Calendar,
    User,
} from "lucide-react";

const Documents: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Mock data for demonstration
    const documents = [
        {
            id: 1,
            name: "Employee Handbook 2024",
            category: "HR Policies",
            type: "PDF",
            size: "2.4 MB",
            uploadedBy: "HR Manager",
            uploadDate: "2024-01-15",
            status: "Active",
        },
        {
            id: 2,
            name: "Benefits Enrollment Form",
            category: "Benefits",
            type: "DOCX",
            size: "156 KB",
            uploadedBy: "Benefits Admin",
            uploadDate: "2024-01-10",
            status: "Active",
        },
        {
            id: 3,
            name: "Payroll Schedule 2024",
            category: "Payroll",
            type: "XLSX",
            size: "89 KB",
            uploadedBy: "Payroll Manager",
            uploadDate: "2024-01-05",
            status: "Active",
        },
        {
            id: 4,
            name: "Company Policies",
            category: "HR Policies",
            type: "PDF",
            size: "1.8 MB",
            uploadedBy: "HR Manager",
            uploadDate: "2023-12-20",
            status: "Archived",
        },
    ];

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            !selectedCategory || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "HR Policies":
                return "bg-blue-100 text-blue-800";
            case "Benefits":
                return "bg-green-100 text-green-800";
            case "Payroll":
                return "bg-purple-100 text-purple-800";
            case "Contracts":
                return "bg-orange-100 text-orange-800";
            case "Training":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "Archived":
                return "bg-gray-100 text-gray-800";
            case "Draft":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Documents
                    </h1>
                    <p className="text-gray-600">
                        Manage and organize company documents
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Folder
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sm:w-48">
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="">All Categories</option>
                            <option value="HR Policies">HR Policies</option>
                            <option value="Benefits">Benefits</option>
                            <option value="Payroll">Payroll</option>
                            <option value="Contracts">Contracts</option>
                            <option value="Training">Training</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                    <div
                        key={doc.id}
                        className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {doc.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {doc.type} • {doc.size}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                                            doc.category
                                        )}`}
                                    >
                                        {doc.category}
                                    </span>
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                            doc.status
                                        )}`}
                                    >
                                        {doc.status}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        {doc.uploadedBy}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {doc.uploadDate}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                >
                                    Download
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                >
                                    Share
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500">No documents found</div>
                </div>
            )}
        </div>
    );
};

export default Documents;
