import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'all';

    let whereConditions: string[] = [];
    let params: any[] = [];
    let idx = 1;

    if (search.trim()) {
      whereConditions.push(`i.item ILIKE $${idx}`);
      params.push(`%${search.trim()}%`);
      idx++;
    }

    if (type !== 'all') {
      whereConditions.push(`i.type ILIKE $${idx}`);
      params.push(type);
      idx++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sql = `
      SELECT 
        i.id,
        i.item,
        i.calories,
        i.fat,
        i.carb,
        i.fiber,
        i.protein,
        i.type,
        COUNT(s.transaction_id)::int as total_sold,
        COALESCE(SUM(s.total_amount), 0)::float as total_revenue,
        COALESCE(AVG(s.price), 4.50)::float as avg_price
      FROM items i
      LEFT JOIN sales s ON i.id = s.item_id
      ${whereClause}
      GROUP BY i.id
      ORDER BY i.item ASC
    `;

    const res = await query(sql, params);
    return NextResponse.json({ items: res.rows });
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch items' }, { status: 500 });
  }
}
