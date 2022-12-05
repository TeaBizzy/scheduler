export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(i => i.name === day)
  if (filteredDays.length < 1) {
    return [];
  }

  const results = filteredDays[0].appointments.map(id => state.appointments[id])

  return results;
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(i => i.name === day)
  if (filteredDays.length < 1) {
    return [];
  }

  const results = filteredDays[0].interviewers.map(id => state.interviewers[id]);
  
  return results;
};

export function getInterview(state, interview) {

  if(!interview) return null;

  const student = interview.student;
  const interviewer = {...state.interviewers[interview.interviewer]};

  return {student, interviewer};
}