import React from 'react';
import { Calendar, Megaphone, Receipt } from 'lucide-react';
import UpcomingEventsTable from './tables/UpcomingEventsTable';
import ActiveCampaignsTable from './tables/ActiveCampaignsTable';
import AdInvoicesTable from './tables/AdInvoicesTable';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Upcoming Events Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-navy-900">Upcoming Events</h2>
          </div>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <UpcomingEventsTable />
      </section>

      {/* Active Campaigns Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Megaphone className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-navy-900">Active Campaigns</h2>
          </div>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <ActiveCampaignsTable />
      </section>

      {/* Ad Invoices Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Receipt className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-navy-900">Ad Invoices</h2>
          </div>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
        <AdInvoicesTable />
      </section>
    </div>
  );
}