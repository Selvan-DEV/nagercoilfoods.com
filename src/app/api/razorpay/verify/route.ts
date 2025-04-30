import { NextRequest } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const sign = crypto
    .createHmac("sha256", 'reeJtwkmTTTatYsn6pmElzJ0' as string)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (sign === razorpay_signature) {
    return Response.json({ success: true, message: "Payment verified" });
  } else {
    return Response.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }
}
