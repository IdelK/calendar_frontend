import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../R_actions/modalActions";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleFabOnClick = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleFabOnClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
