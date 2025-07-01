import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Plus, Search, Eye, CheckCircle } from "lucide-react";
import { Invoice } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";

const Invoices: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const { data: invoices, isLoading } = useQuery<Invoice[]>({
        queryKey: ["invoices"],
        queryFn: async () => {
            const response = await axios.get("/invoices");
            return response.data.data;
        },
    });

    const filteredInvoices = invoices?.filter((invoice) => {
        const matchesSearch =
            invoice.invoiceNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            invoice.supplier.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            !selectedStatus || invoice.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Draft":
                return "bg-gray-100 text-gray-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            case "Paid":
                return "bg-purple-100 text-purple-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            case "Consolidated":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Low":
                return "bg-green-100 text-green-800";
            case "Medium":
                return "bg-yellow-100 text-yellow-800";
            case "High":
                return "bg-orange-100 text-orange-800";
            case "Urgent":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Invoices
                    </h1>
                    <p className="text-gray-600">Manage and track invoices</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Invoice
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search by invoice number or supplier..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sm:w-48">
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Draft">Draft</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Paid">Paid</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Consolidated">Consolidated</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Supplier
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInvoices?.map((invoice) => (
                                <tr
                                    key={invoice._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {invoice.invoiceNumber}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(invoice.issueDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {invoice.supplier.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {invoice.department}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {invoice.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(invoice.dueDate)}
                                        </div>
                                        {invoice.isOverdue && (
                                            <div className="text-xs text-red-600">
                                                Overdue
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(invoice.total)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                invoice.status
                                            )}`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                                                invoice.priority
                                            )}`}
                                        >
                                            {invoice.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {invoice.status === "Pending" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredInvoices?.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500">No invoices found</div>
                </div>
            )}
        </div>
    );
};

export default Invoices;
