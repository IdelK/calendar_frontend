import { types } from "../R_types/types";
import moment from "moment/moment";


const initialState = {
  /*I*/ activeEvent: null,

  /*II*/ events: [
    {
      id: new Date().getTime(),
      title: "cumple",
      start: moment().toDate(),
      end:   moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa", //esto es para marcar el evento por defecto en azul claro
      notes: "comprar pastel",
      user: {
        _id: "123",
        name: "John",
      },
    },
  ],
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        /*II*/ events: [
          ...state.events, //se toma SOLO el objeto event del parametro state
          action.payload,
        ],
      };

    case types.eventSetActive:
      return { 
        ...state,
        /*I*/ activeEvent: action.payload,  
      };

    case types.eventClearActivateEvent:
      return {
        ...state,
        /*I*/ activeEvent: null,
      };

    //el update se realiza sobre un evento seleccionado en el arraglos events
    case types.eventUpdated:
      return {
        ...state,
        /*II*/ events:
          //el event seleccionado se modifica
          //luego el id del event seleccionado se busca dentro del arreglo events
          //cdo se encuentra un match en el id entonces se reescribe el event dentro del arreglo events
          state.events.map(e =>
           ( e.id === action.payload.id) ? action.payload : e
          ),
        //map toma como argumento el evento tal como está, representado con e
        //si el id del evento e es === al id del evento que se modifica en el modal
        //regreso la info modificada  action.payload
        //si no regreso e,o sea,el evento  tal como esta
      };

    default:
      return state;
  }
};
