import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardList, 
  Receipt,
  Mail,
  MapPin,
  X
} from 'lucide-react';
import type { MenuItem, User } from '../types';

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  { name: 'Events', icon: 'Calendar', path: '/events' },
  { name: 'Contacts', icon: 'Users', path: '/contacts' },
  { name: 'Order Form', icon: 'ClipboardList', path: '/orders' },
  { name: 'Invoices', icon: 'Receipt', path: '/invoices' },
];

const iconComponents = {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  Receipt,
};

interface SidebarProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Sidebar({ user, isOpen, onClose, currentPath, onNavigate }: SidebarProps) {
  const filteredMenuItems = menuItems.filter(
    item => !item.adminOnly || user.role === 'admin'
  );

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
      <div className="flex justify-end p-4 lg:hidden">
        <button onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center py-8 border-b border-navy-700">
        <div className="relative mb-4">
          <Mail className="w-12 h-12 text-orange-500" />
          <MapPin className="w-8 h-8 text-sky-400 absolute -bottom-1 -right-1" />
        </div>
        <h1 className="text-xl font-bold text-white">Power Mailers Plus</h1>
        <p className="text-sm text-slate-300 mt-1">Marketing CRM</p>
      </div>
      
      <nav className="mt-6">
        <div className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = iconComponents[item.icon as keyof typeof iconComponents];
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center px-6 py-3 text-slate-300 hover:bg-navy-800 hover:text-white transition-colors ${
                  isActive ? 'bg-navy-800 text-white' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}