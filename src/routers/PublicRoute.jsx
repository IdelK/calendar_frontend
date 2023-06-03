import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);

  return uid ? (
    //si usuario autenticado no deja navegar a login.si lo intenta por el Browser se redirecciona hacia la pagina Marvel
    <Navigate to="/" />
  ) : (
    children
  );
};

PublicRoute.propTypes = {
  children: PropTypes.array.isRequired,
};
