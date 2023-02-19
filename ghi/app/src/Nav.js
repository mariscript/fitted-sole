import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={require("./images/hatshoe.png")} width="100" height="50" />{" "}
        </NavLink>
        <NavLink className="navbar-brand" to="/">
          Fitted Sole
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bins">
                Create a New Bin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoes">
                Shoes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoes/new">
                Add New Shoes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/locations">
                Create a New Location
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hats">
                Hats
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hats/new">
                Add New Hats
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
