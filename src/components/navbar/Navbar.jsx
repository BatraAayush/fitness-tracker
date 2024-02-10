import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          fontWeight: "bold",
        }
      : { fontWeight: "normal" };
  return (
    <div className="navbar">
      <strong>Fitness Tracker</strong>
      <div className="container-nav1">
        <span>
          <NavLink style={activeStyle} to="/">
            Dashboard
          </NavLink>
        </span>
        <span>
          <NavLink style={activeStyle} to="/exercises">
            Exercises
          </NavLink>
        </span>
        <span>
          <NavLink style={activeStyle} to="/food">
            Foods
          </NavLink>
        </span>
        <span>
          <NavLink style={activeStyle} to="/goal">
            Goals
          </NavLink>
        </span>
      </div>
    </div>
  );
};
