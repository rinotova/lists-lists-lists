"use client";

import { ListChecks } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { env } from "~/env";

function SideBar() {
  const callbackUrl =
    process.env.NODE_ENV === "production"
      ? env.PROD_BASE_URL
      : env.LOCAL_BASE_URL;

  const signOutHandler = () => {
    void signOut({ callbackUrl });
  };

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ListChecks
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Lists</SheetTitle>
        </SheetHeader>
        <Button
          className="mx-auto w-80"
          onClick={signOutHandler}
          variant="outline"
        >
          Sign out
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
