import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, AlertCircle, DollarSign, Mail, Calculator, Receipt, Clock } from 'lucide-react';

export default function ActiveCampaignsTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveCampaigns() {
      try {
        const { data, error } = await supabase
          .from('digital_marketing_campaigns')
          .select('*')
          .eq('campaign_running', true)
          .order('campaign_end', { ascending: true });

        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching active campaigns:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveCampaigns();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign: any) => {
            const daysUntilEnd = Math.ceil(
              (new Date(campaign.campaign_end).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            const needsAttention = daysUntilEnd <= 7 || !campaign.tech_lander_ready;
            const dueDate = new Date(campaign.invoice_due_date);
            const isOverdue = !campaign.invoice_paid && dueDate < new Date();

            return (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-navy-900">{campaign.advisor_name}</div>
                  <div className="text-sm text-gray-500">{campaign.group_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div>
                      <div>{new Date(campaign.campaign_start).toLocaleDateString()}</div>
                      <div className="text-gray-500">
                        to {new Date(campaign.campaign_end).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{campaign.mailing_quantity?.toLocaleString() || '0'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <div>
                      <div>{campaign.ideal_budget?.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        <Calculator className="w-3 h-3 inline mr-1" />
                        50% of ${campaign.digital_marketing_price?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Receipt className="w-4 h-4 mr-2" />
                      <span>{campaign.invoice_number}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Due: {dueDate.toLocaleDateString()}</span>
                    </div>
                    <div>
                      {campaign.invoice_paid ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : (
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isOverdue ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isOverdue ? 'Overdue' : 'Pending'}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {needsAttention ? (
                    <div className="flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Needs Attention</span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      On Track
                    </span>
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