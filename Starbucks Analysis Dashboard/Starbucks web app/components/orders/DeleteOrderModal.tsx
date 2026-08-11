'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';

interface Order {
  transaction_id: string;
  customer_name?: string;
  item_name?: string;
  total_amount: number;
}

interface DeleteOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onOrderDeleted: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function DeleteOrderModal({
  isOpen,
  order,
  onClose,
  onOrderDeleted,
  showToast,
}: DeleteOrderModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!order) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/sales?transaction_id=${encodeURIComponent(order.transaction_id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete order');

      showToast(`Order ${order.transaction_id} deleted successfully!`, 'success');
      onOrderDeleted();
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete order', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative text-center">
        
        {/* Warning Icon Header */}
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Starbucks Order?</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to permanently remove transaction{' '}
          <span className="font-mono font-bold text-gray-800">{order.transaction_id}</span>? 
          This action will immediately delete the record from PostgreSQL.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="w-1/2 inline-flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-2xl text-sm font-semibold shadow-md shadow-rose-600/25 transition-all duration-200 disabled:opacity-50"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 stroke-[2.5]" />
                <span>Yes, Delete</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
