"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { getSession } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import TaskEditModal from "./components/modals/TaskEditlModal";
import ShowTaskModal from "./components/modals/ShowTaskModal";
import { Loading } from "./components/common/Loading";
import Head from "next/head";

NiceModal.register("task-edit-modal", TaskEditModal);
NiceModal.register("show-task-modal", ShowTaskModal);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/signin";
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <NiceModal.Provider>
      <main className="">
        <Head>
          <title>Todo App</title>
        </Head>
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center flex-grow mt-10">
          <div>
            <h1 className="text-2xl xl:text-4xl font-bold text-center">
              Welcome to your dashboard
            </h1>
            <p className="text-center">
              You can start managing your tasks now.
            </p>
          </div>
          <div className="mt-5">
            <TaskList />
          </div>
        </div>
      </main>
    </NiceModal.Provider>
  );
}
