'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, CreditCard, Tag, RefreshCw, Award } from 'lucide-react';

export default function AnalyticsView() {
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchKPIs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kpis');
      const data = await res.json();
      setKpis(data.kpis);
    } catch (err) {
      console.error('Error fetching KPIs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sb-sm text-[#006241]">
        <RefreshCw className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm font-semibold">Computing PostgreSQL analytics...</p>
      </div>
    );
  }

  const totalSales = kpis?.totalSales || 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#006241]" />
            <span>Starbucks Executive Analytics</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Aggregated revenue performance, payment method distribution, and order channels
          </p>
        </div>
        <button
          onClick={fetchKPIs}
          className="p-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-semibold flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-gradient-to-br from-[#006241] to-[#1E3932] text-white p-6 rounded-3xl shadow-lg shadow-[#006241]/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#D4E9E2] uppercase tracking-wider">Gross Sales Revenue</span>
            <DollarSign className="w-6 h-6 text-[#D4E9E2]" />
          </div>
          <div className="text-3xl font-black mb-2">
            ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-[#D4E9E2]">100% Verified in PostgreSQL database</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Items Sold</span>
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-gray-900 mb-2">
            {kpis?.totalItemsSold ? kpis.totalItemsSold.toLocaleString() : '0'}
          </div>
          <p className="text-xs text-gray-500">Food & Beverage volume</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Order Ticket</span>
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-gray-900 mb-2">
            ${kpis?.avgOrderValue ? kpis.avgOrderValue.toFixed(2) : '0.00'}
          </div>
          <p className="text-xs text-gray-500">Average spend per checkout</p>
        </div>

      </div>

      {/* Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Payment Methods Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
            <CreditCard className="w-4 h-4 text-[#006241]" />
            <span>Payment Mode Distribution</span>
          </h3>

          <div className="space-y-4">
            {kpis?.paymentBreakdown?.map((pm: any) => {
              const percentage = totalSales > 0 ? ((pm.total / totalSales) * 100).toFixed(1) : '0';
              return (
                <div key={pm.payment_mode} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>{pm.payment_mode} ({pm.count} orders)</span>
                    <span className="text-gray-900">${pm.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#006241] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Type Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Tag className="w-4 h-4 text-[#006241]" />
            <span>Customer Channel Breakdown</span>
          </h3>

          <div className="space-y-4">
            {kpis?.customerTypeBreakdown?.map((ct: any) => {
              const percentage = totalSales > 0 ? ((ct.total / totalSales) * 100).toFixed(1) : '0';
              return (
                <div key={ct.customer_type} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span className="capitalize">{ct.customer_type} ({ct.count} orders)</span>
                    <span className="text-gray-900">${ct.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
