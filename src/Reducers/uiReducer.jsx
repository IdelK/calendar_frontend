import { types } from "../R_types/types";


const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.iuSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.iuRemoveError:
      return {
        ...state,
        msgError: null,
      };

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
