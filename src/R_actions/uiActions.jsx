import { types } from "../R_types/types";

//*********************************//
export const setError = (err) => ({
  type: types.iuSetError,
  payload: err,
});

export const removeError = () => ({
  type: types.iuRemoveError,
});

//*********************************//
export const startLoading = () => ({
  type: types.uiStartLoading,
});
export const finishLoading = () => ({
  type: types.uiFinishLoading,
});



