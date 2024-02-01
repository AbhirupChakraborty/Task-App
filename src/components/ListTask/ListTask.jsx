import { useState, useEffect } from "react";
import "./listTask.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useDrag, useDrop } from "react-dnd";

const ListTask = ({ tasks = [], setTasks }) => {
  const [open, setOpen] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const fOpen = tasks.filter((task) => task.status === "open");
      const fInProgress = tasks.filter((task) => task.status === "inprogress");
      const fReview = tasks.filter((task) => task.status === "review");
      const fClosed = tasks.filter((task) => task.status === "closed");

      setOpen(fOpen);
      setInProgress(fInProgress);
      setReview(fReview);
      setClosed(fClosed);
    }
  }, [tasks]);

  const statuses = ["open", "inprogress", "review", "closed"];

  return (
    <div className="table">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          open={open}
          inProgress={inProgress}
          review={review}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTask;

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
      <div id="contentCard">
        <div className="contentCradItem">
          <x-small>List</x-small>
          <button
            className="deleteIcon"
            onClick={() => {
              handleRemove(task.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
        <div className="contentCradItem">
          <p className="taskName">{task.name}</p>
          <button id="userIcon">
            <FaCircleUser style={{ width: "2vh", height: "2vh" }} />
          </button>
        </div>
        <div className="contentCardItem">
          <Link to="/list" className="addSubtask">
            <img src="https://pngimg.com/d/plus_PNG100.png" alt="view" />
            ADD SUBTASK
          </Link>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  status,
  tasks,
  setTasks,
  open,
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

  let text = "open";
  let tasksToMap = open;

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
