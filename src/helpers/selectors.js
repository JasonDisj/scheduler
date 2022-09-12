export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  for (const randomDay of state.days) {
    if (randomDay.name === day) {
      randomDay.appointments.forEach((appointmentId) => {
        appointmentsForDay.push(state.appointments[appointmentId]);
      });
    }
  }
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    // return a student name and an interviewer obj
    ...interview,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  for (const randomDay of state.days) {
    if (randomDay.name === day) {
      randomDay.interviewers.forEach((interviewerId) => {
        interviewersForDay.push(state.interviewers[interviewerId]);
      });
    }
  }
  return interviewersForDay;
}
