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

  const formatSpots = function() {
    switch (spots) {
      case 1:
        return `1 spot remaining`;
      case 0:
        return 'no spots remaining';
      default:
        return `${spots} spots remaining`;
    }
  };

  return (
    <li className={dayListItemClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}