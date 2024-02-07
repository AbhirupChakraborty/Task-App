import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { SlHome } from "react-icons/sl";
import "./list.css";
import CreateTask from "../CreateTask/CreateTask";
import ListTask from "../ListTask/ListTask";
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
          <img
            src="https://app-cdn.clickup.com/clickup_color-new.6bdf034d4532f5506afbfd1908e3ea03.svg"
            alt="logo"
          />
        </div>
        <div className="menu">
          <input id="searchList" type="text" placeholder="Search" />
          <nav className="menuList">
            <SlHome />
            <label id="homeLabel">Home</label>
          </nav>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="bodyContent">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </div>
  );
}

export default List;
