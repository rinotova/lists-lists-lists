import MaxWidthWrapperNavBar from "./_components/MaxWidthWrapperNavBar";
import { getServerAuthSession } from "~/server/auth";
import { buttonVariants } from "./_components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <MaxWidthWrapperNavBar>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">Lists</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">Everything you need</h3>
            <div className="text-lg">
              Just create a new list and add items. Study topics,
              groceries...anything!
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">Features</h3>
            <div className="text-lg">
              <ul>
                <li>Create fun lists with emojies</li>
                <li>Share, edit and remove lists</li>
                <li>Accesible from anywhere</li>
                <li>No limits</li>
              </ul>
            </div>
          </div>
          {!session?.user && (
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <h3 className="text-2xl font-bold">Create an account</h3>
              <div className="text-lg">And start making lists!</div>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapperNavBar>
  );
}
