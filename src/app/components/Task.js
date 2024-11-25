"use client";

import { useTasks } from "../context/TaskContext";
import "../styles/Task.css";

export default function Task({ task }) {
  const { markAsDone, removeTask } = useTasks();

  return (
    <li className="task">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => markAsDone(task.id)}
      />
      <span className={task.done ? "done" : ""}>{task.task}</span>
      <button onClick={() => removeTask(task.id)}>Remover</button>
    </li>
  );
}
