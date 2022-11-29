import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  const parsedInterviewers = interviewers.map((interviewer) => {
    const id = interviewer.id;
    const isSelected = id === value;
    return (<InterviewerListItem key={id} setInterviewer={() => onChange(id)} selected={isSelected} {...interviewer} />);
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}