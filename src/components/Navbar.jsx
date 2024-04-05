import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="topnav">
      <ul>
        <Link to={"/"}>
          <h2 className="active">Startsida</h2>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
