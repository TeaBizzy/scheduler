import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment(props) {

  const { time, interview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY )

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student} />}
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd")
        transition(CREATE);
        }} />}
      {mode === CREATE && <Form interviewers={[]} onSave={() => transition(STATUS)} onCancel={() => back()}/>}
      {mode === STATUS && <Status />}
    </article>
  );
}