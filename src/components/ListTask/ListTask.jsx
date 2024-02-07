import "./listTask.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, updateTaskStatus } from "../redux/taskSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    dispatch(removeTask(id));
    toast("Task Removed", { icon: "❌" });
  };

  return (
    <div ref={drag} className="card">
      <div id="contentCard">
        <div className="contentCardItem">
          <x-small id="smallList">List</x-small>
          <button className="deleteIcon">
            <RiEdit2Fill />
          </button>
          <button
            className="deleteIcon"
            onClick={() => {
              handleRemove(task.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
        <div className="contentCardItem">
          <p className="taskName">{task.name}</p>
        </div>
        <div className="contentCardItem">
          <Link to="/list" className="addSubtask">
            <img src="https://pngimg.com/d/plus_PNG100.png" alt="view" />
            ADD SUBTASK
          </Link>
          <button id="userIcon">
            <FaCircleUser style={{ width: "2vh", height: "2vh" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ status, tasks }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    dispatch(updateTaskStatus({ id, status }));
    toast("Task Status Updated", { icon: "✅" });
  };

  const tasksToMap = tasks.filter((task) => task.status === status);

  return (
    <div ref={drop} className="section">
      <div className="header">
        {status}
        <div className="counter">{tasksToMap.length}</div>
      </div>
      {tasksToMap.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

const ListTask = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="table">
      <Section status="open" tasks={tasks} />
      <Section status="inprogress" tasks={tasks} />
      <Section status="review" tasks={tasks} />
      <Section status="closed" tasks={tasks} />
    </div>
  );
};

export default ListTask;
