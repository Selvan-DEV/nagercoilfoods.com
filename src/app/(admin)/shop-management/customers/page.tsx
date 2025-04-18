import React, { Suspense } from "react";
import SpinnerComponent from "@/components/site-components/page-loader/SpinnerComponent";
import CustomersContent from "@/components/admin-panel/customers-content/CustomersContent";

export default function CustomersPage() {
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <CustomersContent />
    </Suspense>
  );
}
