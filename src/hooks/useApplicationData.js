import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({...prev, appointments})))
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

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments})))
  };

  return {state, setDay, bookInterview, deleteInterview}
}