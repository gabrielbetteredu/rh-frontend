// User types
export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  department?: string;
  position?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// Employee types
export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  department: string;
  position: string;
  baseSalary: number;
  employmentType: 'CLT' | 'PJ' | 'Freelancer' | 'Intern';
  status: 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
  managerId?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  documents?: Array<{
    type: 'ID' | 'CPF' | 'RG' | 'Work Permit' | 'Contract' | 'Other';
    name: string;
    url: string;
    uploadedAt: string;
  }>;
  equipment?: Array<{
    type: 'Laptop' | 'Monitor' | 'Phone' | 'Desk' | 'Chair' | 'Other';
    name: string;
    serialNumber?: string;
    assignedDate: string;
    returnDate?: string;
    status: 'Assigned' | 'Returned' | 'Lost' | 'Damaged';
  }>;
  benefits?: {
    valeRefeicao: {
      enabled: boolean;
      dailyValue: number;
    };
    valeTransporte: {
      enabled: boolean;
      fixedAmount: number;
      dailyValue: number;
    };
    mobilidade: {
      enabled: boolean;
      monthlyValue: number;
    };
  };
  notes?: string;
  terminationDate?: string;
  terminationReason?: string;
  fullName?: string;
  age?: number;
  yearsOfService?: number;
  createdAt: string;
  updatedAt: string;
}

// Benefit types
export interface Deduction {
  _id: string;
  date: string;
  amount: number;
  reason: string;
  type: 'Absence' | 'Holiday' | 'Sick Leave' | 'Other';
}

export interface ValeRefeicao {
  enabled: boolean;
  dailyValue: number;
  businessDays: number;
  saturdays: number;
  totalDays: number;
  totalAmount: number;
  deductions: Deduction[];
  finalAmount: number;
  scheduleFile?: {
    url: string;
    uploadedAt: string;
  };
}

export interface ValeTransporte {
  enabled: boolean;
  fixedAmount: number;
  dailyValue: number;
  totalDays: number;
  totalAmount: number;
  deductions: Deduction[];
  finalAmount: number;
  addressChanged: boolean;
}

export interface Mobilidade {
  enabled: boolean;
  monthlyValue: number;
}

export interface FlashPayment {
  sent: boolean;
  sentAt?: string;
  flashReference?: string;
  flashStatus: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  flashResponse?: any;
}

export interface Benefit {
  _id: string;
  employeeId: string;
  month: string;
  year: number;
  valeRefeicao: ValeRefeicao;
  valeTransporte: ValeTransporte;
  mobilidade: Mobilidade;
  paymentStatus: 'Pending' | 'Calculated' | 'Approved' | 'Paid' | 'Cancelled';
  paymentMethod: 'Flash' | 'Bank Transfer' | 'Check' | 'Cash';
  flashPayment: FlashPayment;
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
  totalAmount?: number;
  employeeData?: {
    firstName: string;
    lastName: string;
    employeeId: string;
    department: string;
    position: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Invoice types
export interface InvoiceItem {
  _id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceHistory {
  _id: string;
  action: 'Created' | 'Updated' | 'Approved' | 'Rejected' | 'Paid' | 'Cancelled' | 'Consolidated';
  performedBy: string;
  performedAt: string;
  notes?: string;
  previousStatus?: string;
  newStatus?: string;
}

export interface Supplier {
  name: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  supplier: Supplier;
  issueDate: string;
  dueDate: string;
  category: 'HR Services' | 'Equipment' | 'Software' | 'Office Supplies' | 'Travel' | 'Training' | 'Other';
  department: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Paid' | 'Cancelled' | 'Consolidated';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: 'BRL' | 'USD' | 'EUR';
  items: InvoiceItem[];
  notes?: string;
  attachments?: Array<{
    name: string;
    url: string;
    uploadedAt: string;
  }>;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
  paymentMethod: 'Bank Transfer' | 'Check' | 'Credit Card' | 'Cash' | 'PIX';
  consolidationGroup?: string;
  consolidationDate?: string;
  history: InvoiceHistory[];
  tags?: string[];
  isRecurring: boolean;
  recurringInterval?: 'Monthly' | 'Quarterly' | 'Yearly';
  nextRecurringDate?: string;
  daysUntilDue?: number;
  isOverdue?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Email Template types
export interface EmailVariable {
  _id: string;
  name: string;
  description?: string;
  defaultValue?: string;
  required: boolean;
}

export interface EmailHistory {
  _id: string;
  sentAt: string;
  sentBy: string;
  recipientCount: number;
  successCount: number;
  failureCount: number;
  status: 'Pending' | 'Sending' | 'Completed' | 'Failed' | 'Partially Failed';
  errorDetails?: Array<{
    recipient: string;
    error: string;
    timestamp: string;
  }>;
  variables?: Record<string, any>;
}

export interface EmailAutomation {
  trigger: 'Employee Hired' | 'Employee Terminated' | 'Birthday' | 'Work Anniversary' | 'Benefit Due' | 'Invoice Due' | 'Custom';
  conditions?: Array<{
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
    value: any;
  }>;
  schedule: 'Immediate' | 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
  customSchedule?: {
    cronExpression?: string;
    timezone: string;
  };
  lastRun?: string;
  nextRun?: string;
}

export interface EmailRecipients {
  type: 'Specific' | 'Department' | 'All Employees' | 'Managers' | 'HR Team' | 'Custom Query';
  specificEmails?: string[];
  department?: string;
  customQuery?: string;
}

export interface EmailTemplate {
  _id: string;
  name: string;
  description?: string;
  category: 'HR' | 'Payroll' | 'Benefits' | 'Onboarding' | 'Offboarding' | 'Reminders' | 'General' | 'Custom';
  subject: string;
  body: string;
  htmlBody?: string;
  variables: EmailVariable[];
  isActive: boolean;
  isAutomated: boolean;
  automation: EmailAutomation;
  recipients: EmailRecipients;
  attachments?: Array<{
    name: string;
    url: string;
    isRequired: boolean;
  }>;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  fromName?: string;
  fromEmail?: string;
  priority: 'Low' | 'Normal' | 'High';
  tags?: string[];
  history: EmailHistory[];
  createdBy: string;
  updatedBy?: string;
  version: number;
  isPublic: boolean;
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
  updatedAt: string;
}

// Document types
export interface Document {
  _id: string;
  name: string;
  type: string;
  category: string;
  employeeId?: string;
  employeeName?: string;
  uploadDate: string;
  size: string;
  status: 'Active' | 'Archived';
  url: string;
}

// Payroll types
export interface PayrollDeductions {
  inss: number;
  irrf: number;
  other: number;
}

export interface PayrollBenefits {
  vr: number;
  vt: number;
  mobilidade: number;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  baseSalary: number;
  grossSalary: number;
  deductions: PayrollDeductions;
  netSalary: number;
  benefits: PayrollBenefits;
  status: 'Processed' | 'Pending';
  processedAt?: string;
}

// Statistics types
export interface EmployeeStatistics {
  totalEmployees: number;
  activeEmployees: number;
  totalSalary: number;
  averageSalary: number;
  byDepartment: Array<{
    _id: string;
    count: number;
    totalSalary: number;
    averageSalary: number;
  }>;
  byEmploymentType: Array<{
    _id: string;
    count: number;
  }>;
  recentHires: Employee[];
  upcomingBirthdays: Employee[];
}

export interface BenefitStatistics {
  totalVR: number;
  totalVT: number;
  totalMobilidade: number;
  employeeCount: number;
  pendingCount: number;
  calculatedCount: number;
  approvedCount: number;
  paidCount: number;
}

export interface InvoiceStatistics {
  totalInvoices: number;
  totalAmount: number;
  averageAmount: number;
  draftCount: number;
  pendingCount: number;
  approvedCount: number;
  paidCount: number;
  overdueCount: number;
}

export interface EmailTemplateStatistics {
  general: {
    totalTemplates: number;
    activeTemplates: number;
    automatedTemplates: number;
    totalUsage: number;
    averageUsage: number;
  };
  byCategory: Array<{
    _id: string;
    count: number;
    usage: number;
  }>;
}

// API Response types
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  details?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    totalRecords: number;
    limit: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface EmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeId: string;
  dateOfBirth: string;
  hireDate: string;
  department: string;
  position: string;
  baseSalary: number;
  employmentType: 'CLT' | 'PJ' | 'Freelancer' | 'Intern';
  managerId?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
}

export interface BenefitForm {
  employeeId: string;
  month: string;
  year: number;
  valeRefeicao: {
    enabled: boolean;
    dailyValue: number;
    businessDays: number;
    saturdays: number;
  };
  valeTransporte: {
    enabled: boolean;
    fixedAmount: number;
    dailyValue: number;
    totalDays: number;
  };
  mobilidade: {
    enabled: boolean;
    monthlyValue: number;
  };
} 