import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { time, interview, interviewers, bookInterview, id , deleteInterview} = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY );

  const save = function(name, interviewer) {
    transition(STATUS);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(transition(SHOW));
  };

  const onDelete = function() {
    deleteInterview(id)
      .then(transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student} onDelete={() => transition(CONFIRM)} />}
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd")
        transition(CREATE);
        }} />}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === STATUS && <Status />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete this appointment?"} onConfirm={() => onDelete()} onCancel={back}/>}
    </article>
  );
}