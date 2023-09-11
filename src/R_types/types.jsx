//los tipos de acciones aparecen en reduxDevTool/Actions
export const types = {
  authLogin: "[Auth] Login ",
  authStartLogin: "[Auth] Login ",

  authChecking: "[Auth] Checking ",
  authStartChecking: "[Auth] StartChecking",
  authCheckingFinish: "[Auth] authCheckingFinish",

  authRegister: "[Auth] Register ",
  authStartRegister: "[Auth] StartRegister ",

  authStartTokenRenew: "[Auth] StartTokenRenew ",

  authLogout: "[Auth] Logout ",

  authStartLoading: "[Auth] Start Loading",
  authFinishLoading: "[Auth] Finish Loading",

  authSetError: "[Auth] Set Error",
  authRemoveError: "[Auth] Remove Error",


  /************************ */
  uiOpenModal: "[MODAL] Open Modal",
  uiCloseModal: "[MODAL] Close Modal",

  eventStartAddNew: "[EVENT] Event Start Add New",
  eventAddNew: "[EVENT] Event Add New",
  eventSetActive: "[EVENT] Event Set Active",
  eventClearActivateEvent: "[EVENT]  Clear Activate Event",
  eventUpdated: "[EVENT] Event Updated",
  eventDeleted: "[EVENT] Event Deleted",
  eventLoaded: "[EVENT] Events Loaded",


};
