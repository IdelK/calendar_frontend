import { useDispatch } from "react-redux";
import { eventStartDeleted } from "../../R_actions/eventsActions";

export const DeleteEvent = () => {
  const dispatch = useDispatch();

  const handleFabOnClick = () => {
    dispatch(eventStartDeleted());
  };

  return (
    <button className="btn btn-danger  fab-danger" onClick={handleFabOnClick}>
      <i className="fas fa-trash "></i>
    </button>
  );
};
