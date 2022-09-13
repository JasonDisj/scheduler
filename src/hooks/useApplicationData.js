import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }); // combined state

  const setDay = (day) => setState((prev) => ({ ...prev, day: day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (state, appointments) => {
    const filteredDay = state.days.find((day) => {
      return day.name === state.day;
    });
    let spots = 0;
    for (const id of filteredDay.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    const newDay = { ...filteredDay, spots };
    const days = [...state.days];
    const index = state.days.findIndex((day) => {
      return day.name === state.day;
    });
    days[index] = newDay;
    return days;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
