import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const username = "no-user";
  function logout() {
    console.log("loggin out....");
    //redirect to logout
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li onClick={logout}>Logout</li>
        <li>{username}</li>
      </ul>
    </nav>
  );
}
