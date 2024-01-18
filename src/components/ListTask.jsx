import { useState, useEffect } from "react";
import "./listTask.css";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useDrag, useDrop } from "react-dnd";

const ListTask = ({ tasks = [], setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const fTodos = tasks.filter((task) => task.status === "todo");
      const fInProgress = tasks.filter((task) => task.status === "inprogress");
      const fReview = tasks.filter((task) => task.status === "review");
      const fClosed = tasks.filter((task) => task.status === "closed");

      setTodos(fTodos);
      setInProgress(fInProgress);
      setReview(fReview);
      setClosed(fClosed);
    }
  }, [tasks]);

  const statuses = ["todo", "inprogress", "review", "closed"];

  return (
    <div className="table">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          review={review}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTask;

const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  review,
  closed,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "inprogress";
    tasksToMap = inProgress;
  }
  if (status === "review") {
    text = "review";
    tasksToMap = review;
  }
  if (status === "closed") {
    text = "closed";
    tasksToMap = closed;
  }
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task Status Updated", { icon: "😲" });
      return mTasks;
    });
  };
  return (
    <div ref={drop} className="section">
      <Header text={text} count={tasksToMap.length} />
      {Array.isArray(tasksToMap) &&
        tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, count }) => {
  return (
    <div className="header">
      {text}
      <div className="counter">{count}</div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleRemove = (id) => {
    const ftasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(ftasks));
    setTasks(ftasks);
    toast("Task Removed", { icon: "💀" });
  };
  return (
    <div ref={drag} className="card">
      <x-small>List</x-small>
      <p>{task.name}</p>
      <button
        className="deleteIcon"
        onClick={() => {
          handleRemove(task.id);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
};
