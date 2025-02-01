import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import OrderForm from './components/OrderForm';
import type { User } from './types';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // Set a default user with 'user' role for public access
  const [user] = useState<User>({ role: 'user' });

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/contacts':
        return <Contacts />;
      case '/orders':
        return <OrderForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 p-2 bg-white rounded-md shadow-md lg:hidden z-50"
      >
        <Menu className="w-6 h-6 text-navy-600" />
      </button>

      {/* Sidebar */}
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main content */}
      <div className="lg:pl-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
}