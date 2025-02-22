import { useDispatch } from "react-redux";
import { logout } from "../../../redux/app/actionFunctions";
import "./Logout.scss";

export function Logout() {
  const dispatch = useDispatch();
  return (
    <button
      className="logout-button"
      onClick={() => {
        dispatch(logout());
      }}
    >
      Salir
    </button>
  );
}
