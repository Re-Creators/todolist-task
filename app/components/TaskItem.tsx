import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import fetchClient from "../lib/fetchClient";
import NiceModal from "@ebay/nice-modal-react";

interface Props {
  task: {
    id: number;
    name: string;
    is_complete: boolean;
  };
  updateTasks: () => void;
}
const TaskItem = ({ task, updateTasks }: Props) => {
  const toggleComplete = async () => {
    try {
      await fetchClient(`/task/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_complete: !task.is_complete,
        }),
      });
      updateTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      await fetchClient(`/task/${task.id}`, {
        method: "DELETE",
      });
      updateTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-primary cursor-pointer"
            checked={task.is_complete}
            onChange={toggleComplete}
          />
          <p
            className={`cursor-pointer ml-2 ${
              task.is_complete ? "line-through" : ""
            } `}
            onClick={() => {
              NiceModal.show("show-task-modal", { task });
            }}
          >
            {task.name}
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="text-primary hover:border border-primary p-2"
            onClick={() => {
              NiceModal.show("task-edit-modal", { task, updateTasks });
            }}
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 ml-2 hover:border border-red-500 p-2"
            onClick={deleteTask}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
