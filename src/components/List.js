import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoMdHome } from "react-icons/io";
import logo from "../assets/logo.jpg";
import "./list.css";
import CreateTask from "./CreateTask";
import ListTask from "./ListTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function List() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <div className="container">
      <Toaster />
      <div className="sidebar">
        <div className="logoContainer">
          <img src={logo} alt="logo" width={20} height={25} />
          <p id="taskApp">Task-App</p>
        </div>
        <div className="menu">
          <input id="searchList" type="text" placeholder="Search" />
          <nav>
            <IoMdHome />
            <Link to="/">Home</Link>
            <hr color="#ecf2f6" />
          </nav>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="bodyContent">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <hr color="#ecf2f6" />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </div>
  );
}

export default List;
