import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  console.log(session);

  if (!session) {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default AuthPage;
