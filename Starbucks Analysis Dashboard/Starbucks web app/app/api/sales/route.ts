import { NextResponse } from 'next/server';
import pool, { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const search = searchParams.get('search') || '';
    const dateRange = searchParams.get('dateRange') || 'all';
    const paymentMode = searchParams.get('paymentMode') || 'all';
    const customerType = searchParams.get('customerType') || 'all';

    const offset = (page - 1) * limit;

    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramIdx = 1;

    // Search filter
    if (search.trim()) {
      whereConditions.push(`(
        s.transaction_id ILIKE $${paramIdx} OR 
        c.customer_name ILIKE $${paramIdx} OR 
        i.item ILIKE $${paramIdx}
      )`);
      params.push(`%${search.trim()}%`);
      paramIdx++;
    }

    // Payment mode filter
    if (paymentMode !== 'all') {
      whereConditions.push(`s.payment_mode ILIKE $${paramIdx}`);
      params.push(paymentMode);
      paramIdx++;
    }

    // Customer type filter
    if (customerType !== 'all') {
      whereConditions.push(`s.customer_type ILIKE $${paramIdx}`);
      params.push(customerType);
      paramIdx++;
    }

    // Date range filter
    if (dateRange === 'today') {
      whereConditions.push(`s.datetime >= CURRENT_DATE`);
    } else if (dateRange === '7d') {
      whereConditions.push(`s.datetime >= CURRENT_DATE - INTERVAL '7 days'`);
    } else if (dateRange === '30d') {
      whereConditions.push(`s.datetime >= CURRENT_DATE - INTERVAL '30 days'`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Total Count Query
    const countSql = `
      SELECT COUNT(*) as count 
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.customer_id
      LEFT JOIN items i ON s.item_id = i.id
      ${whereClause}
    `;
    const countRes = await query(countSql, params);
    const total = parseInt(countRes.rows[0].count);

    // Data Fetch Query
    const dataSql = `
      SELECT 
        s.transaction_id,
        s.store_id,
        s.datetime,
        s.customer_id,
        c.customer_name,
        c.customer_email,
        s.item_id,
        i.item as item_name,
        i.type as item_type,
        s.quantity,
        s.price,
        s.total_amount,
        s.payment_mode,
        s.customer_type
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.customer_id
      LEFT JOIN items i ON s.item_id = i.id
      ${whereClause}
      ORDER BY s.datetime DESC, s.transaction_id DESC
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `;

    const dataRes = await query(dataSql, [...params, limit, offset]);

    return NextResponse.json({
      sales: dataRes.rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Error fetching sales:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch sales' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      is_new_customer,
      new_customer,
      customer_id,
      item_id,
      quantity,
      price,
      payment_mode,
      customer_type,
      datetime,
      store_id,
    } = body;

    if (!item_id || !quantity || price === undefined) {
      return NextResponse.json({ error: 'Missing required order parameters (item, quantity, price)' }, { status: 400 });
    }

    if (is_new_customer) {
      if (!new_customer?.customer_name?.trim() || !new_customer?.customer_email?.trim() || !new_customer?.customer_phone?.trim()) {
        return NextResponse.json({ error: 'Customer Name, Email, and Phone are required for a new customer.' }, { status: 400 });
      }
    } else if (!customer_id) {
      return NextResponse.json({ error: 'Please select an existing customer.' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      let finalCustomerId = customer_id;

      if (is_new_customer) {
        const emailTrim = new_customer.customer_email.trim();
        const phoneTrim = new_customer.customer_phone.trim();

        // Check if customer email already exists
        const emailCheck = await client.query(
          `SELECT customer_id FROM customers WHERE LOWER(customer_email) = LOWER($1)`,
          [emailTrim]
        );
        if (emailCheck.rows.length > 0) {
          await client.query('ROLLBACK');
          return NextResponse.json(
            { error: `A customer with email "${emailTrim}" already exists (ID: ${emailCheck.rows[0].customer_id}). Please select Existing Customer mode.` },
            { status: 400 }
          );
        }

        // Generate next customer ID (format: CUST-XXXX)
        const maxIdRes = await client.query(`
          SELECT MAX(CAST(SUBSTRING(customer_id FROM 6) AS INTEGER)) as max_num 
          FROM customers 
          WHERE customer_id LIKE 'CUST-%' AND customer_id ~ '^CUST-[0-9]+$'
        `);
        const nextNum = (maxIdRes.rows[0]?.max_num || 500) + 1;
        finalCustomerId = `CUST-${String(nextNum).padStart(4, '0')}`;

        // Insert new customer into PostgreSQL
        await client.query(
          `INSERT INTO customers (customer_id, customer_name, customer_email, customer_phone, customer_age, customer_gender)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            finalCustomerId,
            new_customer.customer_name.trim(),
            emailTrim,
            phoneTrim,
            new_customer.customer_age ? parseInt(new_customer.customer_age) : null,
            new_customer.customer_gender || 'Other',
          ]
        );
      }

      // Insert order into sales table using finalCustomerId
      const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      const qtyInt = parseInt(quantity);
      const priceNum = parseFloat(price);
      const totalAmount = parseFloat((qtyInt * priceNum).toFixed(2));
      const dt = datetime ? new Date(datetime) : new Date();
      const storeIdInt = store_id ? parseInt(store_id) : 101;

      const salesSql = `
        INSERT INTO sales (
          transaction_id, store_id, datetime, customer_id, item_id, 
          quantity, price, total_amount, payment_mode, customer_type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;

      const salesRes = await client.query(salesSql, [
        txnId,
        storeIdInt,
        dt,
        finalCustomerId,
        parseInt(item_id),
        qtyInt,
        priceNum,
        totalAmount,
        payment_mode || 'Cash',
        customer_type || 'walk-in',
      ]);

      await client.query('COMMIT');

      return NextResponse.json(
        {
          success: true,
          sale: salesRes.rows[0],
          customer_id: finalCustomerId,
          is_new_customer: !!is_new_customer,
        },
        { status: 201 }
      );
    } catch (error: any) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error creating sale:', error);
    return NextResponse.json({ error: error.message || 'Failed to create sale transaction' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      transaction_id,
      customer_id,
      item_id,
      quantity,
      price,
      payment_mode,
      customer_type,
      datetime,
      store_id,
    } = body;

    if (!transaction_id || !customer_id || !item_id || !quantity || price === undefined) {
      return NextResponse.json({ error: 'Missing required parameters for update' }, { status: 400 });
    }

    const qtyInt = parseInt(quantity);
    const priceNum = parseFloat(price);
    const totalAmount = parseFloat((qtyInt * priceNum).toFixed(2));
    const storeIdInt = store_id ? parseInt(store_id) : 101;

    const sql = `
      UPDATE sales SET
        customer_id = $1,
        item_id = $2,
        quantity = $3,
        price = $4,
        total_amount = $5,
        payment_mode = $6,
        customer_type = $7,
        store_id = $8,
        datetime = COALESCE($9, datetime)
      WHERE transaction_id = $10
      RETURNING *
    `;

    const res = await query(sql, [
      customer_id,
      parseInt(item_id),
      qtyInt,
      priceNum,
      totalAmount,
      payment_mode,
      customer_type,
      storeIdInt,
      datetime ? new Date(datetime) : null,
      transaction_id,
    ]);

    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, sale: res.rows[0] });
  } catch (error: any) {
    console.error('Error updating sale:', error);
    return NextResponse.json({ error: error.message || 'Failed to update sale' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transaction_id = searchParams.get('transaction_id');

    if (!transaction_id) {
      return NextResponse.json({ error: 'Missing transaction_id parameter' }, { status: 400 });
    }

    const sql = `DELETE FROM sales WHERE transaction_id = $1 RETURNING transaction_id`;
    const res = await query(sql, [transaction_id]);

    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, transaction_id });
  } catch (error: any) {
    console.error('Error deleting sale:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete sale' }, { status: 500 });
  }
}
