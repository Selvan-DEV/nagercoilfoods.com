import { NextRequest } from "next/server";
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: 'rzp_test_wkU2ITss47LoF1',
  key_secret: 'reeJtwkmTTTatYsn6pmElzJ0',
});

export async function POST(req: NextRequest) {
  const { payment_id } = await req.json();

  try {
    const payment = await razorpay.payments.fetch(payment_id);

    // You’ll get: method, status, card details, email, contact, etc.
    return Response.json(payment);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
