import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const { interviewers, onSave, onCancel } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  };

  const validate = function() {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setStudent(e.target.value)}
            value={student}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}