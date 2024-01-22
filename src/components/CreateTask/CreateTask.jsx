import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./createTask.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";

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
    <div className="topBar">
      <div className="navBar">
        <Link to="/list">
          <div id="topList" className="navOption">
            <img
              id="firstListLogo"
              src="https://www.kindpng.com/picc/m/10-107754_buffering-quantum-dots-gold-nanoparticles-hd-png-download.png"
              alt="List"
            />
            List
          </div>
        </Link>
        <div className="navSeparator"></div>
        <Link to="/list">
          <div className="navOption">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8sg2J7ANgW5ZyFiH0A_B6jaGjXOkn-aIlcuuvRRvptKcH8G41f4rtYf-U75Qc6Ssd6W8&usqp=CAU"
              alt="List"
            />
            List
          </div>
        </Link>
        <div className="navSeparator"></div>

        <Link to="/list">
          <div id="board" className="navOption">
            <img
              src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-purple-icon-free-illustration-image_1331414.jpg"
              alt="Board"
            />
            Board
          </div>
        </Link>
        <div className="navSeparator"></div>

        <Link to="/list">
          <div className="navOption">
            <img src="https://pngimg.com/d/plus_PNG100.png" alt="view" />
            View
          </div>
        </Link>

        <Popup
          trigger={<button className="createButton">Create a list</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <form onSubmit={handleSubmit}>
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
              <div>
                <button onClick={() => close()}>close</button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default CreateTask;
