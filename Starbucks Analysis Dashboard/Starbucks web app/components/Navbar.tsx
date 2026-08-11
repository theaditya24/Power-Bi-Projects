'use client';

import React from 'react';
import { Coffee, Plus, Database, Sparkles, Store } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export default function Navbar({ onOpenCreateModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#006241] flex items-center justify-center text-white shadow-md shadow-[#006241]/20">
              <Coffee className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 font-sans">
                  Starbucks <span className="text-[#006241]">Sales Manager</span>
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D4E9E2] text-[#006241]">
                  SaaS Edition
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">Production Order & Revenue Dashboard</p>
            </div>
          </div>

          {/* Center Badges */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-gray-600">
              <Store className="w-3.5 h-3.5 text-[#006241]" />
              <span>Store #101 (Seattle Flagship)</span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs font-medium text-[#006241]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Database className="w-3.5 h-3.5" />
              <span>PostgreSQL Online</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center space-x-2 bg-[#006241] hover:bg-[#1E3932] text-white px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-md shadow-[#006241]/25 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Order</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
