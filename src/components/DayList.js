import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const {days, day, setDay} = props;

  const dayComponents = days.map((element) => 
    <DayListItem
      key={element.id}
      name={element.name}
      spots={element.spots}
      selected={element.name === day}
      setDay={setDay}
    />
  );

  return (
    <ul>
      {dayComponents}
    </ul>
  );
}