import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Building, Globe, FileText } from 'lucide-react';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    company_id: '',
    first_event_date: '',
    first_event_time: '',
    second_event_date: '',
    second_event_time: '',
    venue_name: '',
    full_street_address: '',
    building_room_number: '',
    speaker_name: '',
    mailing_quantity: '',
    mail_piece: '',
    website_registration: '',
    additional_services: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Order submitted successfully!');
    
    // Reset form
    setFormData({
      company_id: '',
      first_event_date: '',
      first_event_time: '',
      second_event_date: '',
      second_event_time: '',
      venue_name: '',
      full_street_address: '',
      building_room_number: '',
      speaker_name: '',
      mailing_quantity: '',
      mail_piece: '',
      website_registration: '',
      additional_services: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">New Event Order</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy-900">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company ID</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Speaker Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="speaker_name"
                    value={formData.speaker_name}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy-900">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Event Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="first_event_date"
                    value={formData.first_event_date}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Event Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    name="first_event_time"
                    value={formData.first_event_time}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Second Event Date (Optional)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="second_event_date"
                    value={formData.second_event_date}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Second Event Time (Optional)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    name="second_event_time"
                    value={formData.second_event_time}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy-900">Venue Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="venue_name"
                    value={formData.venue_name}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Street Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="full_street_address"
                    value={formData.full_street_address}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building/Room Number (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="building_room_number"
                    value={formData.building_room_number}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mailing Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy-900">Mailing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Quantity</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="mailing_quantity"
                    value={formData.mailing_quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mail Piece Type</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="mail_piece"
                    value={formData.mail_piece}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                  >
                    <option value="">Select a mail piece type</option>
                    <option value="Bi-Fold">Bi-Fold</option>
                    <option value="Tri-Fold">Tri-Fold</option>
                    <option value="Quad-Fold">Quad-Fold</option>
                    <option value="Postcard">Postcard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy-900">Registration Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  name="website_registration"
                  value={formData.website_registration}
                  onChange={handleInputChange}
                  required
                  placeholder="https://"
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="additional_services"
              value={formData.additional_services}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500"
              placeholder="Any additional requirements or special instructions..."
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-navy-900 text-white py-3 px-4 rounded-md hover:bg-navy-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}