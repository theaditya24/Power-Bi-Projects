'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Calendar,
  CreditCard,
  User,
  Coffee,
} from 'lucide-react';
import CreateOrderModal from './CreateOrderModal';
import EditOrderModal from './EditOrderModal';
import DeleteOrderModal from './DeleteOrderModal';

interface Order {
  transaction_id: string;
  store_id: number;
  datetime: string;
  customer_id: string;
  customer_name?: string;
  customer_email?: string;
  item_id: number;
  item_name?: string;
  item_type?: string;
  quantity: number;
  price: number;
  total_amount: number;
  payment_mode: string;
  customer_type: string;
}

interface OrdersViewProps {
  showToast: (msg: string, type?: 'success' | 'error') => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

export default function OrdersView({
  showToast,
  isCreateOpen,
  setIsCreateOpen,
}: OrdersViewProps) {
  const [sales, setSales] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  // Filters State
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [paymentMode, setPaymentMode] = useState('all');
  const [customerType, setCustomerType] = useState('all');

  // KPI Metrics State
  const [kpis, setKpis] = useState<any>(null);

  // Modal State
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        dateRange,
        paymentMode,
        customerType,
      });

      const res = await fetch(`/api/sales?${params.toString()}`);
      const data = await res.json();

      setSales(data.sales || []);
      setTotalOrders(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching sales:', err);
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchKPIs = async () => {
    try {
      const res = await fetch('/api/kpis');
      const data = await res.json();
      setKpis(data.kpis);
    } catch (err) {
      console.error('Error fetching KPIs:', err);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchKPIs();
  }, [page, dateRange, paymentMode, customerType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSales();
  };

  const handleResetFilters = () => {
    setSearch('');
    setDateRange('all');
    setPaymentMode('all');
    setCustomerType('all');
    setPage(1);
  };

  // Payment Badge Styling
  const getPaymentBadge = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case 'cash':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'card':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'upi':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'wallet':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200/60';
    }
  };

  // Customer Type Badge Styling
  const getTypeBadge = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'walk-in':
        return 'bg-teal-50 text-teal-800';
      case 'mobile-app':
        return 'bg-emerald-50 text-[#006241] font-bold';
      case 'drive-thru':
        return 'bg-orange-50 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sb-sm hover:shadow-sb-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sales</span>
            <div className="w-10 h-10 rounded-2xl bg-[#006241]/10 text-[#006241] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            ${kpis?.totalSales ? kpis.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-700 font-semibold space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PostgreSQL Aggregated</span>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sb-sm hover:shadow-sb-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            {kpis?.totalOrders ? kpis.totalOrders.toLocaleString() : '0'}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Across Store #101 transactions
          </div>
        </div>

        {/* Card 3: Avg Order Value */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sb-sm hover:shadow-sb-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Order Value</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            ${kpis?.avgOrderValue ? kpis.avgOrderValue.toFixed(2) : '0.00'}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Per transaction average
          </div>
        </div>

        {/* Card 4: Top Item */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sb-sm hover:shadow-sb-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Item</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-base font-bold text-gray-900 truncate">
            {kpis?.topItem?.item || 'Coffee / Bakery'}
          </div>
          <div className="mt-2 text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
            {kpis?.topItem?.total_qty ? `${kpis.topItem.total_qty} units sold` : 'Best Seller'}
          </div>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sb-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Transaction ID, Customer, or Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] focus:border-transparent font-medium"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            
            {/* Payment Filter */}
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
            >
              <option value="all">All Payment Modes</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
            </select>

            {/* Customer Type Filter */}
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
            >
              <option value="all">All Customer Types</option>
              <option value="walk-in">walk-in</option>
              <option value="mobile-app">mobile-app</option>
              <option value="drive-thru">drive-thru</option>
            </select>

            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Action Buttons */}
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-sm transition-colors"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="p-2.5 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

          </div>

        </form>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sb-sm overflow-hidden">
        
        {/* Table Top Bar */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Orders Transactions Table</h2>
            <p className="text-xs text-gray-500">Showing {sales.length} of {totalOrders.toLocaleString()} total orders</p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center space-x-2 bg-[#006241] hover:bg-[#1E3932] text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Item</th>
                <th className="py-4 px-6 text-center">Qty</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-right">Total Amount</th>
                <th className="py-4 px-6">Payment Mode</th>
                <th className="py-4 px-6">Customer Type</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#006241]" />
                    <span>Querying PostgreSQL database...</span>
                  </td>
                </tr>
              ) : sales.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                sales.map((order) => (
                  <tr key={order.transaction_id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Transaction ID */}
                    <td className="py-4 px-6 font-mono font-bold text-xs text-[#006241]">
                      {order.transaction_id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{order.customer_name || 'Guest'}</div>
                      <div className="text-xs text-gray-400 font-mono">{order.customer_id}</div>
                    </td>

                    {/* Item */}
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{order.item_name || `Item #${order.item_id}`}</div>
                      <div className="text-xs text-gray-400 capitalize">{order.item_type || 'Beverage'}</div>
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-6 text-center font-bold text-gray-700">
                      {order.quantity}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-right font-medium text-gray-600">
                      ${Number(order.price).toFixed(2)}
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 text-right font-black text-gray-900">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>

                    {/* Payment Mode */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-xs font-bold border ${getPaymentBadge(order.payment_mode)}`}>
                        {order.payment_mode}
                      </span>
                    </td>

                    {/* Customer Type */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-xs font-medium ${getTypeBadge(order.customer_type)}`}>
                        {order.customer_type}
                      </span>
                    </td>

                    {/* Datetime */}
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {order.datetime ? new Date(order.datetime).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setEditingOrder(order)}
                          className="p-1.5 rounded-xl text-gray-400 hover:text-[#006241] hover:bg-[#D4E9E2]/40 transition-colors"
                          title="Edit Order"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrder(order)}
                          className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Bar */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 text-xs font-semibold text-gray-500">
          <div>
            Page <span className="text-gray-900 font-bold">{page}</span> of{' '}
            <span className="text-gray-900 font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Modals */}
      <CreateOrderModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onOrderCreated={() => {
          fetchSales();
          fetchKPIs();
        }}
        showToast={showToast}
      />

      <EditOrderModal
        isOpen={!!editingOrder}
        order={editingOrder}
        onClose={() => setEditingOrder(null)}
        onOrderUpdated={() => {
          fetchSales();
          fetchKPIs();
        }}
        showToast={showToast}
      />

      <DeleteOrderModal
        isOpen={!!deletingOrder}
        order={deletingOrder}
        onClose={() => setDeletingOrder(null)}
        onOrderDeleted={() => {
          fetchSales();
          fetchKPIs();
        }}
        showToast={showToast}
      />

    </div>
  );
}
