"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SignInButton({ callbackBaseUrl }: { callbackBaseUrl: string }) {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
  let callbackUrl = `${callbackBaseUrl}/lists`;
  if (listId) {
    callbackUrl = `${callbackBaseUrl}/list/${listId}`;
  }
  const signInHandler = () => {
    void signIn("google", { callbackUrl });
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
