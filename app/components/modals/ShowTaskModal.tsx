import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Task } from "@/app/types";

interface Props {
  task: Task;
}

export default NiceModal.create(({ task }: Props) => {
  const modal = NiceModal.useModal();
  return (
    <Transition appear show={modal.visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => modal.hide()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mb-5">
                  <p className="font-semibold">Task Name</p>
                  <p>{task.name}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Task Description</p>
                  <p>{task.description}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Task Status</p>
                  <p>{task.is_complete ? "Completed" : "Incomplete"}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Task Priority</p>
                  <p>{task.position}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => modal.hide()}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});
