'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, DollarSign, Calendar, User, Coffee, CreditCard, Tag, Mail, Phone, AlertCircle, UserPlus } from 'lucide-react';

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

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function CreateOrderModal({
  isOpen,
  onClose,
  onOrderCreated,
  showToast,
}: CreateOrderModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Customer Mode State
  const [customerMode, setCustomerMode] = useState<'existing' | 'new'>('existing');

  // Existing Customer State
  const [customerId, setCustomerId] = useState('');

  // New Customer Form State
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAge, setNewCustomerAge] = useState('');
  const [newCustomerGender, setNewCustomerGender] = useState('Male');

  // Order Fields State
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(4.5);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [customerType, setCustomerType] = useState('walk-in');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    if (isOpen) {
      setValidationError(null);
      fetchDropdownData();
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setDatetime(now.toISOString().slice(0, 16));
    }
  }, [isOpen]);

  const fetchDropdownData = async () => {
    setLoading(true);
    try {
      const [custRes, itemRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/items'),
      ]);
      const custData = await custRes.json();
      const itemData = await itemRes.json();

      setCustomers(custData.customers || []);
      setItems(itemData.items || []);

      if (custData.customers?.length > 0 && !customerId) {
        setCustomerId(custData.customers[0].customer_id);
      }
      if (itemData.items?.length > 0 && !itemId) {
        setItemId(itemData.items[0].id.toString());
        setPrice(itemData.items[0].avg_price || 4.5);
      }
    } catch (err) {
      console.error('Error loading dropdowns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (selectedId: string) => {
    setItemId(selectedId);
    const found = items.find((i) => i.id.toString() === selectedId);
    if (found && found.avg_price) {
      setPrice(found.avg_price);
    } else {
      setPrice(4.5);
    }
  };

  const totalAmount = (quantity * price).toFixed(2);

  const validateForm = (): boolean => {
    setValidationError(null);

    if (customerMode === 'existing') {
      if (!customerId) {
        setValidationError('Please select an existing customer.');
        return false;
      }
    } else {
      if (!newCustomerName.trim()) {
        setValidationError('Customer Name is required.');
        return false;
      }
      if (!newCustomerEmail.trim() || !/\S+@\S+\.\S+/.test(newCustomerEmail.trim())) {
        setValidationError('A valid Email address is required.');
        return false;
      }
      if (!newCustomerPhone.trim() || newCustomerPhone.trim().length < 5) {
        setValidationError('A valid Phone number is required.');
        return false;
      }
      if (newCustomerAge && (isNaN(parseInt(newCustomerAge)) || parseInt(newCustomerAge) < 1 || parseInt(newCustomerAge) > 120)) {
        setValidationError('Age must be a valid number between 1 and 120.');
        return false;
      }
    }

    if (!itemId) {
      setValidationError('Please select a Starbucks menu item.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = customerMode === 'new'
        ? {
            is_new_customer: true,
            new_customer: {
              customer_name: newCustomerName.trim(),
              customer_email: newCustomerEmail.trim(),
              customer_phone: newCustomerPhone.trim(),
              customer_age: newCustomerAge ? parseInt(newCustomerAge) : null,
              customer_gender: newCustomerGender,
            },
            item_id: itemId,
            quantity,
            price,
            payment_mode: paymentMode,
            customer_type: customerType,
            datetime: datetime ? new Date(datetime).toISOString() : new Date().toISOString(),
            store_id: 101,
          }
        : {
            is_new_customer: false,
            customer_id: customerId,
            item_id: itemId,
            quantity,
            price,
            payment_mode: paymentMode,
            customer_type: customerType,
            datetime: datetime ? new Date(datetime).toISOString() : new Date().toISOString(),
            store_id: 101,
          };

      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      const toastMessage = customerMode === 'new'
        ? `Order ${data.sale.transaction_id} created successfully for new customer!`
        : `Order ${data.sale.transaction_id} created successfully!`;

      showToast(toastMessage, 'success');
      
      // Reset new customer inputs
      setNewCustomerName('');
      setNewCustomerEmail('');
      setNewCustomerPhone('');
      setNewCustomerAge('');

      onOrderCreated();
      onClose();
    } catch (err: any) {
      setValidationError(err.message || 'Failed to create order');
      showToast(err.message || 'Failed to create order', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#006241]/10 text-[#006241] flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Create New Starbucks Order</h3>
            <p className="text-xs text-gray-500">Add an order for Existing or New Customer in PostgreSQL</p>
          </div>
        </div>

        {/* Inline Validation Error Banner */}
        {validationError && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#006241]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2 text-sm font-medium">Loading Starbucks menu & customers...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Customer Type Selector */}
            <div className="p-1.5 rounded-2xl bg-gray-100/80 grid grid-cols-2 gap-1 mb-2">
              <button
                type="button"
                onClick={() => {
                  setCustomerMode('existing');
                  setValidationError(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                  customerMode === 'existing'
                    ? 'bg-white text-[#006241] shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Existing Customer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCustomerMode('new');
                  setValidationError(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                  customerMode === 'new'
                    ? 'bg-[#006241] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>New Customer</span>
              </button>
            </div>

            {/* CUSTOMER SECTION */}
            {customerMode === 'existing' ? (
              /* Existing Customer Dropdown */
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Select Existing Customer
                </label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] focus:border-transparent font-medium"
                >
                  {customers.map((c) => (
                    <option key={c.customer_id} value={c.customer_id}>
                      {c.customer_name} ({c.customer_id})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* New Customer Form Fields */
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold text-[#006241] uppercase tracking-wider flex items-center mb-1">
                  <UserPlus className="w-4 h-4 mr-1" /> New Customer Registration Details
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                      <Mail className="w-3 h-3 mr-1 text-gray-400" /> Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-gray-400" /> Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                    />
                  </div>
                </div>

                {/* Age & Gender Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      placeholder="Age (e.g. 28)"
                      value={newCustomerAge}
                      onChange={(e) => setNewCustomerAge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={newCustomerGender}
                      onChange={(e) => setNewCustomerGender(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

              </div>
            )}

            {/* Item Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                <Coffee className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Select Item
              </label>
              <select
                value={itemId}
                onChange={(e) => handleItemChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] focus:border-transparent font-medium"
                required
              >
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.item} ({i.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Price Grid */}
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

            {/* Total Amount Auto Calculated Display */}
            <div className="p-3.5 rounded-2xl bg-[#D4E9E2]/40 border border-[#D4E9E2] flex items-center justify-between">
              <span className="text-xs font-bold text-[#006241] uppercase tracking-wider">
                Auto Total Amount:
              </span>
              <span className="text-lg font-black text-[#006241]">
                ${totalAmount}
              </span>
            </div>

            {/* Payment Mode & Customer Type Grid */}
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

            {/* Datetime */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-[#006241]" /> Date & Time
              </label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241] font-medium"
              />
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm Order</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
