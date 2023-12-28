import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const useGetAuthorizedUserOrRedirect = async () => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    redirect("/");
  }
};
