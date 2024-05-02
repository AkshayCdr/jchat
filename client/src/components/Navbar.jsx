import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ username, isClicked }) {
  function logout() {
    console.log("loggin out....");
    //redirect to logout
    const response = fetch("http://localhost:5500/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: username }),
    });
  }
  if (username && isClicked) {
    return (
      <nav className="navbar">
        <ul>
          <li>hi {username}</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
