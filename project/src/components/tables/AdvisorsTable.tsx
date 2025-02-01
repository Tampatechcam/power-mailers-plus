import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Building, Mail, Phone } from 'lucide-react';

export default function AdvisorsTable() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvisors() {
      try {
        const { data, error } = await supabase
          .from('advisors')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setAdvisors(data || []);
      } catch (error) {
        console.error('Error fetching advisors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvisors();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advisors.map((advisor: any) => (
              <tr key={advisor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-navy-900">
                    {advisor.first_name} {advisor.last_name}
                  </div>
                  <div className="text-sm text-gray-500">{advisor.speaker_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {advisor.company_name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {advisor.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {advisor.registration_phone_number}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a 
                    href={advisor.website_registration} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {advisor.website_registration}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}