import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar } from "../ui/Navbar"; 
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "../../components/calendar/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../R_actions/modal";
import { eventSetActive } from "../../R_actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEvent } from "../ui/DeleteEvent";

export const CalendarScreen = () => {
  //cdo se recarga el navegador conserve el estado(semana,dia,agenda) que estaba,de no ser asi,vuelve a mes.Se usa localStorage

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  /*1*/
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  /*2*/
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  /*3*/
  const onSelectedEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  /*3*/
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  /*4*/
  const onSelectSlot = () => {
    dispatch(eventSetActive());
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{event: CalendarEvent}}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectedEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />

      <CalendarModal />
      <AddNewFab />
      {activeEvent && <DeleteEvent />}
    </div>
  );
};

moment.locale("es");
const localizer = momentLocalizer(moment);
// const events = [
//   {
//     title: "cumple",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "fafafa",
//     notes: "comprar pastel",
//     user: {
//       _id: "123",
//       name: "John",
//     },
//   },
// ];
