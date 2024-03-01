import "./listTask.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { useDrag, useDrop } from "react-dnd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTask,
  updateTaskName,
  updateTaskStatus,
} from "../redux/taskSlice";
import Popup from "reactjs-popup";
import { ImCross } from "react-icons/im";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(task.name);

  // eslint-disable-next-line no-unused-vars
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

  const handleEdit = (e, close) => {
    e.preventDefault();
    if (editedName.length < 3) {
      toast.error("A task must have more than 3 characters");
      return;
    }

    dispatch(updateTaskName({ ...task, name: editedName }));
    toast.success("Task Updated");

    close();
  };

  return (
    <div ref={drag} className="card">
      <div id="contentCard">
        <div className="contentCardItem">
          <x-small id="smallList">List</x-small>
          <button className="editIcon"></button>
          <Popup
            trigger={
              <span
                className="editIcon"
                style={{ fontSize: "20px", padding: "0" }}
              >
                <RiEdit2Fill />
              </span>
            }
            modal
            nested
          >
            {(close) => (
              <div>
                <form className="modal" onSubmit={(e) => handleEdit(e, close)}>
                  <div>
                    <label
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        padding: "0.5rem",
                        left: "3rem",
                      }}
                    >
                      Edit List
                    </label>
                    <button
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "none",
                        border: 0,
                        padding: "0.5rem",
                        margin: 0,
                        cursor: "pointer",
                      }}
                      onClick={close}
                    >
                      <ImCross />
                    </button>
                  </div>
                  <textarea
                    id="popupInput"
                    type="text"
                    style={{
                      margin: "0.5rem",
                      height: "8rem",
                      width: "15rem",
                    }}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <button className="create" type="submit">
                    SAVE
                  </button>
                </form>
              </div>
            )}
          </Popup>
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

  // eslint-disable-next-line no-unused-vars
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
