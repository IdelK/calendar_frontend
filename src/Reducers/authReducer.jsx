import { types } from "../R_types/types";

const initialState = {
  checking: true,
  uid: null,
  name: null, 
  
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authCheckingFinish:
      return {
        ...state,

        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    case types.authSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.authRemoveError:
      return {
        ...state,
        msgError: null,
      };

    // case types.authStartLoading:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case types.authFinishLoading:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    default:
      return state;
  }
};
