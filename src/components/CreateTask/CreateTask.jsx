import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import "./createTask.css";
import { TbCircleDotted } from "react-icons/tb";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineAddBox } from "react-icons/md";
import { ImCross } from "react-icons/im";

const CreateTask = () => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "open",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setTask({
      id: "",
      name: "",
      status: "open",
    });
  }, []);

  const handleSubmit = (e, close) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");

    dispatch(addTask({ ...task, id: uuidv4() }));

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "open",
    });
    close();
  };

  return (
    <div className="topBar">
      <div className="navBar">
        <Link to="">
          <div id="list" className="navOption">
            <TbCircleDotted />
            List
          </div>
        </Link>
        <div className="navSeparator"></div>
        <Link to="">
          <div className="navOption">
            <CiCircleList />
            List
          </div>
        </Link>
        <div className="navSeparator"></div>

        <Link to="/list">
          <div id="board" className="navOption">
            <MdOutlineSpaceDashboard />
            Board
          </div>
        </Link>
        <div className="navSeparator"></div>

        <Link to="">
          <div className="navOption">
            <FaPlus />
            View
          </div>
        </Link>

        <div className="navOption">
          <Popup
            trigger={
              <span id="addBox" style={{ fontSize: "20px", padding: "0" }}>
                <MdOutlineAddBox />
              </span>
            }
            modal
            nested
          >
            {(close) => (
              <div>
                <form
                  className="modal"
                  onSubmit={(e) => handleSubmit(e, close)}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        padding: "0.5rem",
                        left: "3rem",
                      }}
                    >
                      Add List
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
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                  />
                  <button className="create" type="submit">
                    ADD
                  </button>
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
