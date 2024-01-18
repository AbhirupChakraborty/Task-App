import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./createTask.css";
import toast from "react-hot-toast";

const CreateTask = ({ tasks = [], setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "open",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");
    setTasks((prev) => {
      const list = Array.isArray(prev) ? [...prev, task] : [task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "open",
    });
  };

  return (
    <form className="topBar" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="createButton" type="submit">
        Create List
      </button>
    </form>
  );
};

export default CreateTask;
