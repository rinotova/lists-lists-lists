"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function SignOutButton({ callbackUrl }: { callbackUrl: string }) {
  const signOutHandler = () => {
    void signOut({ callbackUrl });
  };
  return (
    <Button className="mx-auto w-80" onClick={signOutHandler} variant="outline">
      Sign out
    </Button>
  );
}

export default SignOutButton;
