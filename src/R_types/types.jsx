//los tipos de acciones aparecen en reduxDevTool/Actions
export const types = {
  login:   "[Auth] Login ",
  logout: "[Auth] Logout ",

  iuSetError:    "[UI] Set Error",
  iuRemoveError: "[UI] Remove Error",

  uiStartLoading:  "[UI] Start Loading",
  uiFinishLoading: "[UI] Finish Loading",

  uiOpenModal:  "[MODAL] Open Modal",
  uiCloseModal: "[MODAL] Close Modal",

  eventAddNew:            "[EVENT] Event Add New",
  eventSetActive:         "[EVENT] Event Set Active",
  eventClearActivateEvent:"[EVENT]  Clear Activate Event",
  eventUpdated:           "[EVENT] Event Updated",
  eventDeleted:           "[EVENT] Event Deleted",

};
