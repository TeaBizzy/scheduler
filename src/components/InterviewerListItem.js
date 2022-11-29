import React from "react";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem (props) {

  const { id, name, avatar } = props;

  return (
    <li key={id} className="interviewers__item" onClick={() => {setInterviewer(id)}}>
      <img
        className="interviews__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}