import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    let sql = `
      SELECT 
        c.customer_id,
        c.customer_name,
        c.customer_email,
        c.customer_phone,
        c.customer_age,
        c.customer_gender,
        COUNT(s.transaction_id)::int as total_orders,
        COALESCE(SUM(s.total_amount), 0)::float as total_spent
      FROM customers c
      LEFT JOIN sales s ON c.customer_id = s.customer_id
    `;

    const params: any[] = [];
    if (search.trim()) {
      sql += ` WHERE c.customer_id ILIKE $1 OR c.customer_name ILIKE $1 OR c.customer_email ILIKE $1`;
      params.push(`%${search.trim()}%`);
    }

    sql += ` GROUP BY c.customer_id ORDER BY c.customer_name ASC LIMIT 500`;

    const res = await query(sql, params);
    return NextResponse.json({ customers: res.rows });
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch customers' }, { status: 500 });
  }
}
