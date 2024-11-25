import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: "all",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, done: !task.done };
          } else {
            return task;
          }
        }),
      };
    case "CHANGE_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3001/tasks");
    const data = await response.json();

    dispatch({ type: "LOAD_TASKS", payload: data });
  };

  const addTask = async (text) => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: text }),
    });

    const newTask = await response.json();

    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const markAsDone = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "PATCH" });

    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const removeTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });

    dispatch({ type: "REMOVE_TASK", payload: id });
  };

  return (
    <TaskContext.Provider
      value={{ state, dispatch, fetchTasks, addTask, markAsDone, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
