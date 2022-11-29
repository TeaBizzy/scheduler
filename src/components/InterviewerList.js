import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;

  const parsedInterviewers = interviewers.map((interviewerItem) => {
    const id = interviewerItem.id;
    const isSelected = id === interviewer;
    return (<InterviewerListItem key={id} setInterviewer={() => setInterviewer(id)} selected={isSelected} {...interviewerItem} />);
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}