import { type } from "os";

export type Task = {
  created_at: string;
  description: string;
  id: number;
  is_complete: boolean;
  name: string;
  position: number;
  user_id: number;
};

export type User = {
  email: string;
  id: number;
  username: string;
  name: string;
};

export type TaskList = {
  All: Task[];
  Todo: Task[];
  Completed: Task[];
};
