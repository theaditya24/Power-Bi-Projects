import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Overall KPIs
    const overallSql = `
      SELECT 
        COALESCE(SUM(total_amount), 0)::float as total_sales,
        COUNT(*)::int as total_orders,
        COALESCE(AVG(total_amount), 0)::float as avg_order_value,
        COALESCE(SUM(quantity), 0)::int as total_items_sold
      FROM sales;
    `;
    const overallRes = await query(overallSql);
    const overall = overallRes.rows[0];

    // Top Selling Item
    const topItemSql = `
      SELECT 
        i.item, 
        i.type,
        SUM(s.quantity)::int as total_qty,
        SUM(s.total_amount)::float as total_revenue
      FROM sales s
      JOIN items i ON s.item_id = i.id
      GROUP BY i.id, i.item, i.type
      ORDER BY total_qty DESC
      LIMIT 1;
    `;
    const topItemRes = await query(topItemSql);

    // Payment Mode Breakdown
    const paymentSql = `
      SELECT 
        payment_mode, 
        COUNT(*)::int as count,
        SUM(total_amount)::float as total
      FROM sales
      GROUP BY payment_mode
      ORDER BY count DESC;
    `;
    const paymentRes = await query(paymentSql);

    // Customer Type Breakdown
    const typeSql = `
      SELECT 
        customer_type, 
        COUNT(*)::int as count,
        SUM(total_amount)::float as total
      FROM sales
      GROUP BY customer_type
      ORDER BY count DESC;
    `;
    const typeRes = await query(typeSql);

    return NextResponse.json({
      kpis: {
        totalSales: overall.total_sales,
        totalOrders: overall.total_orders,
        avgOrderValue: overall.avg_order_value,
        totalItemsSold: overall.total_items_sold,
        topItem: topItemRes.rows[0] || null,
        paymentBreakdown: paymentRes.rows,
        customerTypeBreakdown: typeRes.rows,
      },
    });
  } catch (error: any) {
    console.error('Error fetching KPIs:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch KPIs' }, { status: 500 });
  }
}
