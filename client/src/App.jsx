import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Login} />
        <Route path="/chat/" Component={Chat} />
        <Route path="/profile" Component={Profile} />
        <Route path="/room" Component={Room} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
