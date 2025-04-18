import { NextRequest } from "next/server";
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
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
