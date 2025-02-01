import React from 'react';
import { Calendar, DollarSign, AlertTriangle } from 'lucide-react';

// Static sample data
const sampleInvoices = [
  {
    id: '1',
    invoice_number: 'INV-2025-001',
    product_name: 'Digital Marketing Campaign',
    description: 'Q1 2025 Campaign',
    amount: 4500.00,
    due_date: new Date(2025, 1, 15),
    paid: true
  },
  {
    id: '2',
    invoice_number: 'INV-2025-002',
    product_name: 'Email Marketing Service',
    description: 'Monthly Newsletter Campaign',
    amount: 850.00,
    due_date: new Date(2025, 1, 28),
    paid: false
  },
  {
    id: '3',
    invoice_number: 'INV-2025-003',
    product_name: 'Omnichannel Marketing',
    description: 'Cross-platform Campaign',
    amount: 2750.00,
    due_date: new Date(2025, 0, 30),
    paid: false
  },
  {
    id: '4',
    invoice_number: 'INV-2025-004',
    product_name: 'Digital Marketing Campaign',
    description: 'Social Media Boost',
    amount: 1500.00,
    due_date: new Date(2025, 2, 15),
    paid: true
  },
  {
    id: '5',
    invoice_number: 'INV-2025-005',
    product_name: 'Email Marketing Service',
    description: 'Lead Generation Campaign',
    amount: 950.00,
    due_date: new Date(2025, 1, 10),
    paid: false
  }
];

export default function AdInvoicesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sampleInvoices.map((invoice) => {
            const isOverdue = !invoice.paid && invoice.due_date < new Date();

            return (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-navy-900">{invoice.invoice_number}</div>
                  <div className="text-sm text-gray-500">{invoice.product_name}</div>
                  <div className="text-xs text-gray-400">{invoice.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {invoice.due_date.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {invoice.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {invoice.paid ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  ) : (
                    <div className={`flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`}>
                      {isOverdue && <AlertTriangle className="w-4 h-4 mr-1" />}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isOverdue ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {isOverdue ? 'Overdue' : 'Pending'}
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}