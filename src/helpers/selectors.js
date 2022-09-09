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
