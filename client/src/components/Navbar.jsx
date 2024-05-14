import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api.js";

export default function Navbar({
  username,
  setUsername,
  setIsClicked,
  isClicked,
}) {
  const navigate = useNavigate();
  async function logout() {
    console.log("loggin out....");
    //redirect to logout
    const response = await logoutApi();
    console.log(response);
    if (response.ok) {
      setUsername("");
      setIsClicked(true);
      navigate("/");
    } else {
      alert("authentication error");
      setUsername("");
      setIsClicked(true);
      navigate("/");
    }
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
