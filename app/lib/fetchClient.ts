import { getSession } from "next-auth/react";
import { Backend_URL } from "./constants";

const fetchClient = async (endpoint: string, options: any) => {
  const session: any = await getSession();

  return fetch(Backend_URL + endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.token}` }),
    },
  });
};

export default fetchClient;
