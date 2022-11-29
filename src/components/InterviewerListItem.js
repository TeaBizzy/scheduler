import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem (props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerListItemClasses = classNames("interviewers__item", {"interviewers__item--selected": selected})

  return (
    <li key={id} className={interviewerListItemClasses} onClick={() => {setInterviewer(id)}}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}