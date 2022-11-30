export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(i => i.name === day)
  if (filteredDays.length < 1) {
    return [];
  }

  const results = filteredDays[0].appointments.map(id => state.appointments[id])

  return results;
}