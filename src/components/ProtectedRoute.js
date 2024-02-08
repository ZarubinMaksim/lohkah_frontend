// checked
import { Navigate } from "react-router-dom";
import { SING_IN_PAGE } from "../utils/constants";

const ProtectedRouteElement = ({ element: Component, ...props }) => (
  props.isLoggedIn ? <Component {...props} /> : <Navigate to={SING_IN_PAGE} replace />
);

export default ProtectedRouteElement;