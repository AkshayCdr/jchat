import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";

function App() {
  const [userName, setUsername] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  return (
    <BrowserRouter>
      <Navbar username={userName} isClicked={isClicked} />
      <Routes>
        {/* <Route path="/" exact Component={Login} /> */}
        {/* <Route
          path="/"
          exact
          render={() => <Login userName={userName} setUsername={setUsername} />}
        /> */}
        <Route
          path="/"
          exact
          element={
            <Login
              userName={userName}
              setUsername={setUsername}
              setIsClicked={setIsClicked}
            />
          }
        />

        <Route path="/chat/" Component={Chat} />
        <Route path="/profile" Component={Profile} />
        <Route path="/room" Component={Room} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
