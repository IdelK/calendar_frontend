import { types } from "../R_types/types";

const initialState = {
  modalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
