import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import Task from "./Task";
import "../styles/TaskList.css";

export default function TaskList() {
  const { state, fetchTasks, addTask, dispatch } = useTasks();
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    console.log("Estado atualizado:", state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const add = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  const changeFilter = (filter) => {
    dispatch({ type: "CHANGE_FILTER", payload: filter });
  };

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "all") return true;
    if (state.filter === "done") return task.done;
    if (state.filter === "pending") return !task.done;
    return true;
  });

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="filter">
        <button onClick={() => changeFilter("all")}>Todas</button>
        <button onClick={() => changeFilter("done")}>Concluídas</button>
        <button onClick={() => changeFilter("pending")}>Pendentes</button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={add}>Adicionar Tarefa</button>
      </div>
      <ul className="tasks">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
