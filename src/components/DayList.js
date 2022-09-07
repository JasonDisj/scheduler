import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListArr = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        // setDay={props.setDay}
        setDay={() => props.onChange(day.name)} // reduce # of props
      />
    );
  });
  return <ul>{dayListArr}</ul>;
}
