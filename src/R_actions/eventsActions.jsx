import Swal from "sweetalert2";
import { types } from "../R_types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";

//RENDER THE MODAL INPUTS ON CALENDAR SCREEN & POST IT ON THE SERVER
//esta accion pinta el calendarScrenn cdo le das guardar al modal

export const eventStartAddNew =(event)=>{
  return async (dispatch,getState)=>{

    const {uid,name} = getState().auth;
    try {
      const resp =  await  fetchConToken('events',event, 'POST') 
      const body =  await resp.json(); 
      console.log("FTC",body);

      if(body.ok)
      {
        event.id = body.evento.id
        // event.start = body.evento.start
        // event.end = body.evento.end
        // event.notes = body.evento.notes
        // event.title = body.evento.title


        event.user = {

          _id:  uid,
           name: name
        }

        dispatch(eventAddNew(event))
      }
                    
    }
    catch (error) {
      console.log(error);
    }
}
}

 const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActivateEvent = (event) => ({
  type: types.eventClearActivateEvent,
});



//UPDATE
export const eventStartUpdated = (event) => {

 return async (dispatch) =>{

  try{
    const resp =  await fetchConToken(`events/${event.id}`,event, 'PUT');
    const body =  await resp.json();

    if(body.ok){
      dispatch(eventUpdated(event));
    }
    else{
      Swal.fire("error",body.msg,"error");
    }

  }
  catch(error){
console.log(error);
  }

 }
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});


//DELETE
export const eventStartDeleted = () => {

  return async (dispatch,getState) =>{
    const {id} = getState().calendar.activeEvent;
 
   try{
     const resp =  await fetchConToken(`events/${id}`,{}, 'DELETE');
     const body =  await resp.json();
 
     if(body.ok){
       dispatch(eventDeleted());
     }
     else{
       Swal.fire("error",body.msg,"error");
     }
 
   }
   catch(error){
 console.log(error);
   }
 
  }
 };



 const eventDeleted = () => ({
  type: types.eventDeleted,
});


//LOAD FROM SERVER
//esta accion pinta el calendarScreen cdo refrescas el navegador,hala la info del server
export const eventStarLoading = () => {

  return async (dispatch)=>{
    
    try {
      const resp =  await  fetchConToken('events') 
      const body =  await resp.json(); 
      console.log("refresh", body);

       const events = prepareEvents(body.eventos);
        dispatch(eventLoaded(events))
      }
    catch (error)
     {
      console.log(error);
     }
}
}
  
  const eventLoaded = (events) =>(
    {
      type: types.eventLoaded,
      payload: events
    }
  )
