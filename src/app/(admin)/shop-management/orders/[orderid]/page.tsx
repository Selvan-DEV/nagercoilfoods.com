import ClientOrderPage from "@/components/admin-panel/orders/ClientOrderPage";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  const { orderid } = await params;
  return <ClientOrderPage orderid={orderid} />;
}
