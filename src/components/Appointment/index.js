import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {

  const { time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ?
        <Show /> : 
        <Empty />
      }
    </article>
  );
}