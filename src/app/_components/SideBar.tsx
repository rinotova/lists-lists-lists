import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SignOutButton from "./SignOutButton";
import { env } from "~/env";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import { ThemeToggleButton } from "./ThemeToggleButton";

async function SideBar() {
  const callbackUrl =
    process.env.NODE_ENV === "production"
      ? env.PROD_BASE_URL
      : env.LOCAL_BASE_URL;
  const session = await getServerAuthSession();

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <Avatar>
          <AvatarImage src={session?.user?.image as string | undefined} />
          <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start gap-4">
          <ThemeToggleButton />
          <SignOutButton callbackUrl={callbackUrl} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
