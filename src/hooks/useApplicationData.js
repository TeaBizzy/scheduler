import { useState, useEffect } from "react";
import axios from "axios"; 

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`), axios.get(`/api/interviewers`)])
    .then((values) => {
      setState(prev => ({...prev, days: values[0].data, appointments: values[1].data, interviewers: values[2].data}))
    })
  }, []);

  const setDay = function(day) {
    setState(prev => ({...prev, day}))
  };

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState(prev => ({...prev, appointments, days}))
    })
  };

  const deleteInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({...prev, appointments, days}))
      })
  };

  const updateSpots = function(state, appointments) {

    const dayObj = state.days.find(day => day.name === state.day);

    let spots = 0;

    for ( const id of dayObj.appointments ) {
      const appointment = appointments[id];
      if(appointment.interview === null) {
        spots ++;
      }
    };
    
    const newDays = state.days.map(day => day.name === state.day ? {...dayObj, spots} : day)


    return newDays
  }

  return {state, setDay, bookInterview, deleteInterview}
}