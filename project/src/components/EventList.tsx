import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

// Static sample data for upcoming events
const upcomingEvents = [
  {
    id: '1',
    title: 'Retirement Planning Seminar',
    description: 'Learn essential strategies for a secure retirement',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    location: 'Grand Hotel Conference Center',
    capacity: 50,
    registrationUrl: 'https://example.com/register/retirement-seminar'
  },
  {
    id: '2',
    title: 'Estate Planning Workshop',
    description: 'Comprehensive workshop on estate planning basics and advanced strategies',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: 'Financial District Meeting Hall',
    capacity: 30,
    registrationUrl: 'https://example.com/register/estate-planning'
  },
  {
    id: '3',
    title: 'Investment Strategies Symposium',
    description: 'Advanced investment techniques for maximizing returns in current market conditions',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    location: 'Business Center Auditorium',
    capacity: 100,
    registrationUrl: 'https://example.com/register/investment-symposium'
  }
];

export default function EventList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Upcoming Events</h1>
        <p className="mt-2 text-gray-600">Join us at our upcoming seminars and workshops</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-navy-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{event.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{event.date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-navy-700" />
                  <span>{event.capacity} seats available</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-navy-900 text-white text-center py-2 px-4 rounded-md hover:bg-navy-800 transition-colors duration-300"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {upcomingEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No upcoming events scheduled at this time.</p>
          <p className="text-gray-500 mt-2">Please check back later for new events.</p>
        </div>
      )}
    </div>
  );
}