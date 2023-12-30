import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import { Icons } from "./_components/Icons";

function NotFound() {
  return (
    <MaxWidthWrapper>
      <div className="flex h-[calc(100vh-4rem)] flex-col  items-center justify-center gap-7">
        <Icons.logo className="h-20 w-20" />
        <p>We could not find that page.</p>
      </div>
    </MaxWidthWrapper>
  );
}

export default NotFound;
