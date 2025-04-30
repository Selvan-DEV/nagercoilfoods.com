import Razorpay from 'razorpay';
import { NextRequest } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  const { orderPayload } = await request.json();
  console.log(orderPayload, 'orderPayload');

  const options = {
    amount: Number(orderPayload.amount) * 100, // in paisa
    currency: "INR",
    receipt: "receipt_order_" + Math.random(),
  };

  console.log(options, 'options');

  try {
    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (err: any) {
    console.log(err, 'err')
    return Response.json({ error: err.message }, { status: 500 });
  }
}
