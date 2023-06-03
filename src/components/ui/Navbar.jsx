import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../R_actions/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {name}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <ul className="navbar-nav ml-auto">
            <button
              className="nav-item nav-link btn d-flex justify-content-start  "
              onClick={handleLogout}
            >
              <i
                className="fas fa-sign-out-alt  btn btn-outline-info btn-sm "
                style={{ fontSize: ".85rem" }}
              >
                <span>Logout</span>
              </i>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
