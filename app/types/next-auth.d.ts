declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      name: boolean;
    };
  }
}
