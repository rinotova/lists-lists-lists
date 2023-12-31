import Link from "next/link";
import MaxWidthWrapperNavBar from "./MaxWidthWrapperNavBar";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { getServerAuthSession } from "~/server/auth";
import SideBar from "./SideBar";

async function Navbar() {
  const session = await getServerAuthSession();
  const user = session?.user;
  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-16 ">
      <header className="relative bg-white dark:bg-slate-700">
        <MaxWidthWrapperNavBar>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex h-16 items-center justify-between">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="flex flex-1 items-center justify-end space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <Link
                      href="/lists"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      My lists
                    </Link>
                  ) : null}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? (
                    <div className="ml-4 flow-root lg:ml-6">
                      <SideBar />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapperNavBar>
      </header>
    </nav>
  );
}

export default Navbar;
