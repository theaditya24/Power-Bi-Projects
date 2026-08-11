'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, DollarSign, Calendar, User, Coffee, CreditCard, Tag } from 'lucide-react';

interface Order {
  transaction_id: string;
  store_id: number;
  datetime: string;
  customer_id: string;
  customer_name?: string;
  item_id: number;
  item_name?: string;
  quantity: number;
  price: number;
  total_amount: number;
  payment_mode: string;
  customer_type: string;
}

interface Customer {
  customer_id: string;
  customer_name: string;
}

interface Item {
  id: number;
  item: string;
  type: string;
  avg_price?: number;
}

interface EditOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onOrderUpdated: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function EditOrderModal({
  isOpen,
  order,
  onClose,
  onOrderUpdated,
  showToast,
}: EditOrderModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [customerId, setCustomerId] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(4.5);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [customerType, setCustomerType] = useState('walk-in');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    if (isOpen && order) {
      fetchDropdownData();
      setCustomerId(order.customer_id);
      setItemId(order.item_id.toString());
      setQuantity(order.quantity);
      setPrice(order.price);
      setPaymentMode(order.payment_mode || 'Cash');
      setCustomerType(order.customer_type || 'walk-in');

      if (order.datetime) {
        const dt = new Date(order.datetime);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        setDatetime(dt.toISOString().slice(0, 16));
      }
    }
  }, [isOpen, order]);

  const fetchDropdownData = async () => {
    try {
      const [custRes, itemRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/items'),
      ]);
      const custData = await custRes.json();
      const itemData = await itemRes.json();
      setCustomers(custData.customers || []);
      setItems(itemData.items || []);
    } catch (err) {
      console.error('Error loading dropdowns:', err);
    }
  };

  const handleItemChange = (selectedId: string) => {
    setItemId(selectedId);
    const found = items.find((i) => i.id.toString() === selectedId);
    if (found && found.avg_price) {
      setPrice(found.avg_price);
    }
  };

  const totalAmount = (quantity * price).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/sales', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: order.transaction_id,
          customer_id: customerId,
          item_id: itemId,
          quantity,
          price,
          payment_mode: paymentMode,
          customer_type: customerType,
          datetime: datetime ? new Date(datetime).toISOString() : order.datetime,
          store_id: order.store_id || 101,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update order');

      showToast(`Order ${order.transaction_id} updated successfully!`, 'success');
      onOrderUpdated();
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Failed to update order', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Order Details</h3>
            <p className="text-xs text-gray-500">Transaction ID: <span className="font-mono font-bold text-[#006241]">{order.transaction_id}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Customer Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
              <User className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Customer
            </label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
              required
            >
              {customers.map((c) => (
                <option key={c.customer_id} value={c.customer_id}>
                  {c.customer_name} ({c.customer_id})
                </option>
              ))}
            </select>
          </div>

          {/* Item Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Coffee className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Item
            </label>
            <select
              value={itemId}
              onChange={(e) => handleItemChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
              required
            >
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.item} ({i.type})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#006241]" /> Unit Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                required
              />
            </div>
          </div>

          {/* Auto Total Display */}
          <div className="p-3.5 rounded-2xl bg-[#D4E9E2]/40 border border-[#D4E9E2] flex items-center justify-between">
            <span className="text-xs font-bold text-[#006241] uppercase tracking-wider">
              Updated Total Amount:
            </span>
            <span className="text-lg font-black text-[#006241]">
              ${totalAmount}
            </span>
          </div>

          {/* Payment & Customer Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                <CreditCard className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Wallet">Wallet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Customer Type
              </label>
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
              >
                <option value="walk-in">walk-in</option>
                <option value="mobile-app">mobile-app</option>
                <option value="drive-thru">drive-thru</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center space-x-2 bg-[#006241] hover:bg-[#1E3932] text-white px-6 py-2.5 rounded-2xl text-sm font-semibold shadow-md shadow-[#006241]/25 transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Update Order</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
