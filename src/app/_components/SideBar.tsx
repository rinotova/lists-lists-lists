import { ListChecks } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SignOutButton from "./SignOutButton";
import { env } from "~/env";

function SideBar() {
  const callbackUrl =
    process.env.NODE_ENV === "production"
      ? env.PROD_BASE_URL
      : env.LOCAL_BASE_URL;

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
        <SignOutButton callbackUrl={callbackUrl} />
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
