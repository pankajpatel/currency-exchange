import React from "react";
import { Link } from "react-router-dom";

export const Balance = () => {
  return (
    <>
      <h1>Balance</h1>
      <p>Please select your preferred Currency in settings.</p>
      <p>
        We have set it ourselves to EUR and credited your account some initial
        fund to play with the app
      </p>
      <p>
        <small>P.S. This fund can not be used to do any real purchase</small>
      </p>
      <Link to="/">Start</Link>
    </>
  );
};
