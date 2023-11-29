"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { getSession } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import TaskEditModal from "./components/modals/TaskEditlModal";
import ShowTaskModal from "./components/modals/ShowTaskModal";

NiceModal.register("task-edit-modal", TaskEditModal);
NiceModal.register("show-task-modal", ShowTaskModal);

export default function Home() {
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/signin";
      }
    });
  }, []);

  return (
    <NiceModal.Provider>
      <main className="">
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
