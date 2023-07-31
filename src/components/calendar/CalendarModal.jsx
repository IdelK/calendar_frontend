import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment/moment";
import Swal from "sweetalert2";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../R_actions/modalActions";
import {
  eventAddNew,
  eventClearActivateEvent,
  eventUpdated,
} from "../../R_actions/eventsActions";
import { useEffect } from "react";

//COMPONENTE
export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(final.toDate());
  const [titleValid, setTitleValid] = useState(false);

  const { modalOpen } = useSelector((state) => state.modal);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  /*FORM VALUES DECLARATIONS*/
  const [formValues, setFormValues] = useState(initialState);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
    else{
      setFormValues(initialState)
    }
  }, [activeEvent, setFormValues]);

  /*FORM VALUES HANDLES -1*/
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });

    //***validacion automatica mientras se escribe***//
    if (target.value.trim().length < 2) {
      setTitleValid(false);
    } else {
      setTitleValid(true);
    }
  };

  /*FORM VALUES HANDLES -2*/
  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  /*FORM VALUES HANDLES -3*/
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  /*FORM VALUES HANDLES -4*/
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire(
        "Error",
        "La hora y fecha fin debe ser menor que la inicial",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    setTitleValid(true);

    /**/
    if (activeEvent) {
      dispatch(eventUpdated({ ...formValues }));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "John",
          },
        })
      );
    }
  };
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActivateEvent());
    setFormValues(initialState);
  };

  //RETURN
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {(activeEvent) ? "Editar Evento" : "Nuevo evento" } </h1>
      <hr />

      <form onSubmit={handleOnSubmit} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora final</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />

        <div className="form-group mb-2">
          <label>Titulo y notas</label>

          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

//incilizacion de variables
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
const now = moment().minutes(0).seconds(0).add(1, "hours");
const final = now.clone().add(1, "hours");

const initialState = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: final.toDate(),
};
