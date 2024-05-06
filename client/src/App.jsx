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
      <Navbar
        username={userName}
        setUsername={setUsername}
        setIsClicked={setIsClicked}
        isClicked={isClicked}
      />
      <Routes>
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

        <Route path="/chat" element={<Chat username={userName} />} />
        <Route path="/profile" element={<Profile username={userName} />} />
        <Route path="/room" element={<Profile username={userName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
