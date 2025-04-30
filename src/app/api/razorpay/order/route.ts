import Razorpay from 'razorpay';
import { NextRequest } from 'next/server';

const razorpay = new Razorpay({
  key_id: 'rzp_test_wkU2ITss47LoF1',
  key_secret: 'reeJtwkmTTTatYsn6pmElzJ0',
});

export async function POST(request: NextRequest) {
  const { orderPayload } = await request.json();

  // 1. Create Razorpay Customer
  // const customer = await razorpay.customers.create(orderPayload.user);

  const options = {
    amount: Number(orderPayload.amount) * 100, // in paisa
    currency: "INR",
    receipt: "receipt_order_" + Math.random(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (err: any) {
    console.log(err, 'err')
    return Response.json({ error: err.message }, { status: 500 });
  }
}
