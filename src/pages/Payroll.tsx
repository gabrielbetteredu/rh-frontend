import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    DollarSign,
    Calendar,
    Users,
    TrendingUp,
    Download,
    Eye,
} from "lucide-react";

const Payroll: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data for demonstration
    const payrollPeriods = [
        {
            id: 1,
            period: "January 2024",
            startDate: "2024-01-01",
            endDate: "2024-01-31",
            status: "Completed",
            totalEmployees: 45,
            totalAmount: 125000,
            processedDate: "2024-02-01",
        },
        {
            id: 2,
            period: "December 2023",
            startDate: "2023-12-01",
            endDate: "2023-12-31",
            status: "Completed",
            totalEmployees: 43,
            totalAmount: 118000,
            processedDate: "2024-01-01",
        },
        {
            id: 3,
            period: "November 2023",
            startDate: "2023-11-01",
            endDate: "2023-11-30",
            status: "Completed",
            totalEmployees: 42,
            totalAmount: 115000,
            processedDate: "2023-12-01",
        },
        {
            id: 4,
            period: "February 2024",
            startDate: "2024-02-01",
            endDate: "2024-02-29",
            status: "In Progress",
            totalEmployees: 46,
            totalAmount: 0,
            processedDate: null,
        },
    ];

    const employeePayroll = [
        {
            id: 1,
            employeeId: "EMP001",
            name: "John Doe",
            department: "Engineering",
            position: "Senior Developer",
            baseSalary: 8500,
            overtime: 500,
            bonuses: 1000,
            deductions: 850,
            netPay: 9150,
            status: "Processed",
        },
        {
            id: 2,
            employeeId: "EMP002",
            name: "Jane Smith",
            department: "Marketing",
            position: "Marketing Manager",
            baseSalary: 7500,
            overtime: 0,
            bonuses: 1500,
            deductions: 750,
            netPay: 8250,
            status: "Processed",
        },
        {
            id: 3,
            employeeId: "EMP003",
            name: "Mike Johnson",
            department: "Sales",
            position: "Sales Representative",
            baseSalary: 6000,
            overtime: 800,
            bonuses: 2000,
            deductions: 600,
            netPay: 8200,
            status: "Pending",
        },
    ];

    const filteredPeriods = payrollPeriods.filter((period) =>
        period.period.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "In Progress":
                return "bg-yellow-100 text-yellow-800";
            case "Pending":
                return "bg-blue-100 text-blue-800";
            case "Error":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Payroll
                    </h1>
                    <p className="text-gray-600">
                        Manage payroll processing and employee payments
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Process Payroll
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">
                                Total Payroll
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(125000)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">
                                Active Employees
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                46
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">
                                Current Period
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                Feb 2024
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">
                                Avg. Salary
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(5200)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payroll Periods */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            Payroll Periods
                        </h2>
                        <div className="flex space-x-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search periods..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Period
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employees
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Processed Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPeriods.map((period) => (
                                <tr
                                    key={period.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {period.period}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {period.startDate} -{" "}
                                            {period.endDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {period.totalEmployees}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(period.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                period.status
                                            )}`}
                                        >
                                            {period.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {period.processedDate || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Employee Payroll Details */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Employee Payroll Details
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employee
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Base Salary
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Overtime
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bonuses
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deductions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Net Pay
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employeePayroll.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {employee.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {employee.employeeId} •{" "}
                                            {employee.position}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {employee.department}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(employee.baseSalary)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(employee.overtime)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(employee.bonuses)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(employee.deductions)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(employee.netPay)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                employee.status
                                            )}`}
                                        >
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payroll;
