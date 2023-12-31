import React from "react";

import { Icons } from "../_components/Icons";
import SignInButton from "../_components/SignInButton";
import { env } from "~/env";

function SignIn() {
  const callbackBaseUrl =
    process.env.NODE_ENV === "production"
      ? env.PROD_BASE_URL
      : env.LOCAL_BASE_URL;

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>
          </div>

          <div className="grid gap-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  login to create a list
                </span>
              </div>
            </div>

            <SignInButton callbackBaseUrl={callbackBaseUrl} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
