import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DashboardStats {
  employees: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  benefits: {
    total: number;
    pending: number;
    approved: number;
    totalAmount: number;
  };
  invoices: {
    total: number;
    pending: number;
    overdue: number;
    totalAmount: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get('/dashboard/stats');
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Employees',
      value: stats?.employees.total || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats?.employees.newThisMonth || 0} this month`,
    },
    {
      name: 'Active Employees',
      value: stats?.employees.active || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: `${Math.round(((stats?.employees.active || 0) / (stats?.employees.total || 1)) * 100)}% active`,
    },
    {
      name: 'Pending Benefits',
      value: stats?.benefits.pending || 0,
      icon: CreditCard,
      color: 'bg-yellow-500',
      change: `${stats?.benefits.approved || 0} approved`,
    },
    {
      name: 'Total Benefits',
      value: formatCurrency(stats?.benefits.totalAmount || 0),
      icon: DollarSign,
      color: 'bg-purple-500',
      change: `${stats?.benefits.total || 0} total records`,
    },
    {
      name: 'Pending Invoices',
      value: stats?.invoices.pending || 0,
      icon: FileText,
      color: 'bg-orange-500',
      change: `${stats?.invoices.overdue || 0} overdue`,
    },
    {
      name: 'Invoice Amount',
      value: formatCurrency(stats?.invoices.totalAmount || 0),
      icon: TrendingUp,
      color: 'bg-red-500',
      change: `${stats?.invoices.total || 0} total invoices`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your HR processes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-md ${stat.color} text-white`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className="text-gray-500">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {stats?.recentActivity?.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== (stats.recentActivity?.length || 0) - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <Calendar className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={activity.timestamp}>
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <Users className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Add Employee
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Register a new employee
                </p>
              </div>
            </button>

            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <CreditCard className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Calculate Benefits
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Process employee benefits
                </p>
              </div>
            </button>

            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                  <FileText className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Review Invoices
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Approve pending invoices
                </p>
              </div>
            </button>

            <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  <AlertCircle className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  View Reports
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Generate HR reports
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 