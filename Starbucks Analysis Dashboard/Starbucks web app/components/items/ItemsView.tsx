'use client';

import React, { useState, useEffect } from 'react';
import { Search, Coffee, Flame, RefreshCw, Filter, Utensils } from 'lucide-react';

interface Item {
  id: number;
  item: string;
  calories: number;
  fat: number;
  carb: number;
  fiber: number;
  protein: number;
  type: string;
  total_sold: number;
  total_revenue: number;
  avg_price: number;
}

export default function ItemsView() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        type: typeFilter,
      });
      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, typeFilter]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sb-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Coffee className="w-5 h-5 text-[#006241]" />
            <span>Starbucks Menu Catalog & Nutrition</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Food & Beverage items catalog with sales volume and nutritional breakdown
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
          >
            <option value="all">All Categories</option>
            <option value="bakery">Bakery / Food</option>
            <option value="beverage">Beverages</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search item name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
            />
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sb-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Item Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6 text-center">Calories</th>
                <th className="py-4 px-6 text-center">Nutritional Breakdown</th>
                <th className="py-4 px-6 text-center">Units Sold</th>
                <th className="py-4 px-6 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#006241]" />
                    <span>Loading menu catalog...</span>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No items found.
                  </td>
                </tr>
              ) : (
                items.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    <td className="py-4 px-6 font-mono font-bold text-xs text-gray-400">
                      #{i.id}
                    </td>

                    <td className="py-4 px-6 font-bold text-gray-900">
                      {i.item}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl text-xs font-bold capitalize ${
                          i.type?.toLowerCase() === 'bakery'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-emerald-50 text-[#006241]'
                        }`}
                      >
                        {i.type}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{i.calories} kcal</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center text-xs font-medium text-gray-500 space-x-2">
                      <span>Fat: {i.fat}g</span>
                      <span>•</span>
                      <span>Carb: {i.carb}g</span>
                      <span>•</span>
                      <span>Protein: {i.protein}g</span>
                    </td>

                    <td className="py-4 px-6 text-center font-bold text-gray-800">
                      {i.total_sold.toLocaleString()} units
                    </td>

                    <td className="py-4 px-6 text-right font-black text-gray-900">
                      ${Number(i.total_revenue).toFixed(2)}
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
