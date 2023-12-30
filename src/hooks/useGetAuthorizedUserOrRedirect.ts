import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const useGetAuthorizedUserOrRedirect = async (redirectPath?: string) => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    redirect(redirectPath ?? "/");
  }
};
