import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Building, Globe, Search, UserPlus } from 'lucide-react';

type Advisor = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  speaker_name: string | null;
  registration_phone_number: string | null;
  website_registration: string | null;
};

export default function Contacts() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdvisors() {
      try {
        const { data, error } = await supabase
          .from('advisors')
          .select('*')
          .order('last_name', { ascending: true });

        if (error) throw error;
        setAdvisors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch advisors');
      } finally {
        setLoading(false);
      }
    }

    fetchAdvisors();
  }, []);

  const filteredAdvisors = advisors.filter(advisor => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (advisor.first_name?.toLowerCase() || '').includes(searchLower) ||
      (advisor.last_name?.toLowerCase() || '').includes(searchLower) ||
      (advisor.email?.toLowerCase() || '').includes(searchLower) ||
      (advisor.company_name?.toLowerCase() || '').includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-navy-900">Contacts</h1>
          <button className="flex items-center px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Contact
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
          />
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvisors.map((advisor) => (
            <div key={advisor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">
                    {advisor.first_name} {advisor.last_name}
                  </h3>
                  {advisor.speaker_name && advisor.speaker_name !== `${advisor.first_name} ${advisor.last_name}` && (
                    <p className="text-sm text-gray-600 mt-1">Speaker: {advisor.speaker_name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{advisor.company_name}</span>
                </div>

                <a
                  href={`mailto:${advisor.email}`}
                  className="flex items-center text-gray-600 hover:text-navy-900 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{advisor.email}</span>
                </a>

                {advisor.registration_phone_number && (
                  <a
                    href={`tel:${advisor.registration_phone_number}`}
                    className="flex items-center text-gray-600 hover:text-navy-900 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3 text-navy-700" />
                    <span>{advisor.registration_phone_number}</span>
                  </a>
                )}

                {advisor.website_registration && (
                  <a
                    href={advisor.website_registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-navy-900 transition-colors"
                  >
                    <Globe className="w-5 h-5 mr-3 text-navy-700" />
                    <span>Registration Page</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAdvisors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No contacts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}