import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios, { Axios } from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days:[],
    appointments: {}
  });

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`)])
    .then((values) => {
      console.log(values[0].data);
      console.log(values[1].data);
      setState(prev => ({...prev, days: values[0].data, appointments: values[1].data}))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            value={state.day}
            onChange={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (

            <Appointment 
            key={appointment.id} 
            {...appointment}
            />
          )
        })}
        <Appointment time={'5pm'} />
      </section>
    </main>
  );
}
