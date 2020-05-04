import React from "react";
import { Link } from "react-router-dom";
import { Button, ScreenCentered } from "../../components/styled";

export const Welcome = () => {
  return (
    <ScreenCentered>
      <header>
        <h1 className="text-4xl pb-2">Welcome to Currency Exchange</h1>
      </header>
      <section className="text-center p-2">
        <p>Please select your preferred Currency in settings.</p>
        <p>
          We have set it ourselves to EUR and credited your account some initial
          fund to play with the app
        </p>

        <small className="block italic">
          P.S. This fund can not be used to do any real purchase
        </small>
      </section>

      <Button as={Link} to="/exchange" className="m-2 inline-block">
        Exchange
      </Button>
    </ScreenCentered>
  );
};
