'use client';

import React from 'react';
import { ShoppingCart, Users, Coffee, BarChart3, ChevronRight, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats?: {
    ordersCount: number;
    totalRevenue: number;
  };
}

export default function Sidebar({ activeTab, setActiveTab, stats }: SidebarProps) {
  const navItems = [
    { id: 'orders', label: 'Orders Management', icon: ShoppingCart, countBadge: stats?.ordersCount },
    { id: 'customers', label: 'Customers Directory', icon: Users },
    { id: 'items', label: 'Starbucks Menu Items', icon: Coffee },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        
        {/* Navigation Header */}
        <div>
          <h2 className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Menu Navigation
          </h2>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#006241] text-white shadow-md shadow-[#006241]/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.countBadge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.countBadge.toLocaleString()}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Info Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#D4E9E2]/50 to-[#006241]/10 border border-[#D4E9E2]">
          <div className="flex items-center space-x-2 text-[#006241] font-bold text-xs mb-1">
            <Coffee className="w-4 h-4" />
            <span>Starbucks House Blend</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Real-time PostgreSQL tracking enabled for Store #101 transactions & menu analytics.
          </p>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#006241]/10 text-gray-500">
            <span>Status</span>
            <span className="font-semibold text-emerald-700">Production Ready</span>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-[#006241]" />
          <span>v1.0.0 PostgreSQL</span>
        </div>
        <span>Starbucks HQ</span>
      </div>
    </aside>
  );
}
