import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { uiReducer } from "../Reducers/uiReducer";
import { authReducer } from "../Reducers/authReducer";
import { modalReducer } from "../Reducers/modalReducer";
import { calendarReducer } from "../Reducers/calendarReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//estos reducers aparecen en reduxDevTool/state y son el argumento de useSelector(state=>state.uno_de _estos_reducer)
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  modal: modalReducer,
  calendar: calendarReducer,
});

export const store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeEnhancers(applyMiddleware(thunk))
);
