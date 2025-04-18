"use Client";

import SignIn from "@/components/site-components/UserManagement/SignIn";
import React from "react";

export default function Login() {
  return (
    <div>
      <SignIn isModal={false} />
    </div>
  );
}
