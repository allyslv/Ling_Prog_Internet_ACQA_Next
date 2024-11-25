"use client";

import { TasksProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import "../app/styles/globals.css";

export default function App() {
  return (
    <TasksProvider>
      <TaskList />
    </TasksProvider>
  );
}
