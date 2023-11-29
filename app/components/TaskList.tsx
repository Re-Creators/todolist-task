import { use, useCallback, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import NewTaskModal from "./NewTaskModal";
import fetchClient from "../lib/fetchClient";
import { TaskList } from "../types";
import TaskItem from "./TaskItem";

function classNames(...classes: (false | string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [tasks, setTasks] = useState<TaskList>({
    All: [],
    Todo: [],
    Completed: [],
  });

  const getTasks = useCallback(async () => {
    const res = await fetchClient("/task", {
      method: "GET",
    });
    const { data } = await res.json();
    setTasks((prev) => {
      const Todo = data.filter((task: any) => !task.is_complete);
      const Completed = data.filter((task: any) => task.is_complete);
      return {
        ...prev,
        All: data,
        Todo,
        Completed,
      };
    });
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex justify-center mb-5">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
          <span className="ml-2">New Task</span>
        </button>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-500 p-1">
          {Object.keys(tasks).map((task) => (
            <Tab
              key={task}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {task}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(tasks).map((tasks, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3 w-[450px] lg:w-[600px]",
                "ring-white/60 ring-offset-2 ring-offset-blue-400"
              )}
            >
              <ul>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between py-2.5"
                  >
                    <TaskItem task={task} updateTasks={getTasks} />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <NewTaskModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        updateTasks={getTasks}
      />
    </div>
  );
}
