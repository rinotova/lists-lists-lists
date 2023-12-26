"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

function SignInButton({ callbackBaseUrl }: { callbackBaseUrl: string }) {
  const signInHandler = () => {
    void signIn("google", { callbackUrl: `${callbackBaseUrl}/lists` });
  };
  return (
    <Button
      className="bg-red-800 text-white hover:bg-red-700"
      onClick={signInHandler}
      variant="default"
    >
      Continue with Google
    </Button>
  );
}

export default SignInButton;
