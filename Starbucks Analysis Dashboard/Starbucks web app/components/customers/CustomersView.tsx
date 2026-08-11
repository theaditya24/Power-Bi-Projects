'use client';

import React, { useState, useEffect } from 'react';
import { Search, Users, RefreshCw, Mail, Phone, ShoppingBag, DollarSign } from 'lucide-react';

interface Customer {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_age: number;
  customer_gender: string;
  total_orders: number;
  total_spent: number;
}

export default function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#006241]" />
            <span>Starbucks Customers Directory</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Registered customers and lifetime spending stats from PostgreSQL
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
          />
        </div>
      </div>

      {/* Customers Grid / Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sb-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Customer ID</th>
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6 text-center">Demographics</th>
                <th className="py-4 px-6 text-center">Total Orders</th>
                <th className="py-4 px-6 text-right">Lifetime Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#006241]" />
                    <span>Loading customer records...</span>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No customers found matching search.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.customer_id} className="hover:bg-gray-50/80 transition-colors">
                    
                    <td className="py-4 px-6 font-mono font-bold text-xs text-[#006241]">
                      {c.customer_id}
                    </td>

                    <td className="py-4 px-6 font-bold text-gray-900">
                      {c.customer_name}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-600 space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{c.customer_email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-gray-400">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{c.customer_phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center text-xs font-semibold text-gray-600">
                      {c.customer_age} yrs • {c.customer_gender}
                    </td>

                    <td className="py-4 px-6 text-center font-bold text-gray-800">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-[#006241] text-xs font-bold">
                        <ShoppingBag className="w-3 h-3" />
                        <span>{c.total_orders} orders</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right font-black text-gray-900">
                      ${Number(c.total_spent).toFixed(2)}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
