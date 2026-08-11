'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import OrdersView from '@/components/orders/OrdersView';
import CustomersView from '@/components/customers/CustomersView';
import ItemsView from '@/components/items/ItemsView';
import AnalyticsView from '@/components/analytics/AnalyticsView';
import { ShoppingCart, Users, Coffee, BarChart3, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [stats, setStats] = useState({ ordersCount: 10000, totalRevenue: 0 });

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/kpis');
      const data = await res.json();
      if (data.kpis) {
        setStats({
          ordersCount: data.kpis.totalOrders,
          totalRevenue: data.kpis.totalSales,
        });
      }
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F9]">
      
      {/* Top Header Navbar */}
      <Navbar onOpenCreateModal={() => setIsCreateOpen(true)} />

      {/* Main Content Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          
          {/* Toast Alert floating component */}
          {toast && (
            <div
              className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold animate-fade-in ${
                toast.type === 'success'
                  ? 'bg-[#006241] text-white border-[#006241]'
                  : 'bg-rose-600 text-white border-rose-600'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Tab Views Rendering */}
          {activeTab === 'orders' && (
            <OrdersView
              showToast={showToast}
              isCreateOpen={isCreateOpen}
              setIsCreateOpen={setIsCreateOpen}
            />
          )}

          {activeTab === 'customers' && <CustomersView />}

          {activeTab === 'items' && <ItemsView />}

          {activeTab === 'analytics' && <AnalyticsView />}

        </main>
      </div>

      {/* Mobile Navigation Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around z-40">
        {[
          { id: 'orders', label: 'Orders', icon: ShoppingCart },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'items', label: 'Items', icon: Coffee },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl text-xs font-semibold ${
                isActive ? 'text-[#006241]' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
