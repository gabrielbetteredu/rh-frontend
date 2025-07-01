import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, Eye, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Benefit } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';

const Benefits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const queryClient = useQueryClient();

  const { data: benefits, isLoading } = useQuery<Benefit[]>({
    queryKey: ['benefits'],
    queryFn: async () => {
      const response = await axios.get('/benefits');
      return response.data.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.patch(`/benefits/${id}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['benefits'] });
      toast.success('Benefit approved successfully');
    },
    onError: () => {
      toast.error('Failed to approve benefit');
    },
  });

  const filteredBenefits = benefits?.filter(benefit => {
    const matchesSearch = benefit.employeeData?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.employeeData?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.employeeData?.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !selectedStatus || benefit.paymentStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Calculated': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return Clock;
      case 'Calculated': return Clock;
      case 'Approved': return CheckCircle;
      case 'Paid': return DollarSign;
      case 'Cancelled': return Clock;
      default: return Clock;
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
          <h1 className="text-2xl font-bold text-gray-900">Benefits</h1>
          <p className="text-gray-600">Manage employee benefits and payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Calculate Benefits
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
                placeholder="Search by employee name or ID..."
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
              <option value="Pending">Pending</option>
              <option value="Calculated">Calculated</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Benefits Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VR Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VT Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobilidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
              {filteredBenefits?.map((benefit) => {
                const StatusIcon = getStatusIcon(benefit.paymentStatus);
                const totalAmount = (benefit.valeRefeicao.finalAmount || 0) + 
                                  (benefit.valeTransporte.finalAmount || 0) + 
                                  (benefit.mobilidade.monthlyValue || 0);
                
                return (
                  <tr key={benefit._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {benefit.employeeData?.firstName?.charAt(0)}{benefit.employeeData?.lastName?.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {benefit.employeeData?.firstName} {benefit.employeeData?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {benefit.employeeData?.department}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {benefit.employeeData?.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {benefit.month}/{benefit.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(benefit.valeRefeicao.finalAmount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(benefit.valeTransporte.finalAmount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(benefit.mobilidade.monthlyValue || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(benefit.paymentStatus)}`}>
                          {benefit.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {benefit.paymentStatus === 'Calculated' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => approveMutation.mutate(benefit._id)}
                            disabled={approveMutation.isPending}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBenefits?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No benefits found</div>
        </div>
      )}
    </div>
  );
};

export default Benefits; 