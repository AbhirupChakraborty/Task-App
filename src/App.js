import Login from "./components/Login/Login";
import List from "./components/List/List";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;
