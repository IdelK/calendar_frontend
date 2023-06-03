import { useDispatch } from "react-redux";
import { eventDeleted } from "../../R_actions/events";

export const DeleteEvent = () => {
  const dispatch = useDispatch();

  const handleFabOnClick = () => {
    dispatch(eventDeleted());
  };

  return (
    <button className="btn btn-danger  fab-danger" onClick={handleFabOnClick}>
      <i className="fas fa-trash "></i>
    </button>
  );
};
