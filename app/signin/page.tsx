"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
      return;
    }

    setIsLoading(false);
    setIsError(true);
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 lg:p-10 bg-[#F0F4F3]">
      <main className="flex flex-row-reverse p-5 lg:p-0 lg:h-[600px] w-full xl:w-[80%] 2xl:w-[60%] text-center border rounded-lg bg-white shadow-md overflow-hidden">
        <div className="hidden lg:flex items-center justify-center p-10 bg-primary w-2/5">
          <div className="space-y-8">
            <h1 className="font-bold text-3xl text-white">Manage your tasks</h1>
            <p className="text-white">
              Let's get started by creating your account and start managing your
              tasks.
            </p>
            <div>
              <Link
                href="/signup"
                className="text-white rounded-full border-2 px-10 py-2 hover:bg-white hover:text-primary transition duration-200"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow p-5 lg:p-10">
          <div className="w-full  2xl:w-2/3">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                Sign In to Your Account
              </h1>
              <p className="mt-2 text-gray-400 text-sm">
                Empowering Productivity, One Task at a Time.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 items-center justify-center mt-8"
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <EnvelopeIcon className="w-7 h-7 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block ps-10 text-sm text-gray-900  border-2 border-gray-300 rounded-lg p-4 w-full  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <LockClosedIcon className="w-7 h-7 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="block ps-10 text-sm text-gray-900  border-2 border-gray-300 rounded-lg p-4 w-full  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Password"
                  required
                  name="password"
                />
              </div>
              {isError && <p className="text-red-500">Invalid credentials</p>}

              <button
                type="submit"
                className="bg-primary text-white hover:opacity-80 transition duration-200 px-4 py-3 rounded-lg w-full font-semibold mt-4 active:translate-y-0.5 active:shadow-md"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
