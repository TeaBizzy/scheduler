import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay} = props;
  const isFull = spots < 1;
  const dayListItemClass = classNames('day-list__item', 
  {
    'day-list__item--selected': selected,
    'day-list__item--full': isFull
  });

  return (
    <li className={dayListItemClass} onClick={() => setDay(name)}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{spots} spots remaining</h3>
    </li>
  );
}