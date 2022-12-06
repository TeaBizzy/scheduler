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
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { time, interview, interviewers, bookInterview, id , deleteInterview} = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY );

  const save = function(name, interviewer) {
    transition(STATUS, true);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const onDelete = function() {
    transition(STATUS, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd")
        transition(CREATE);
        }} />}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === EDIT && <Form interviewers={interviewers} student={interview.student} interviewer={interview.interviewer.id} onSave={save} onCancel={() => back()}/>}
      {mode === STATUS && <Status />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete this appointment?"} onConfirm={() => onDelete()} onCancel={() => back()}/>}
      {mode === ERROR_SAVE && <Error message={"Saving was unsuccessful :("} onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message={"Deleting was unsuccessful :("} onClose={() => back()}/>}
    </article>
  );
}