import React from "react";
import { Link } from "react-router-dom";
import { Button, ScreenCentered } from "../../components/styled";

export const Home = () => {
  return (
    <ScreenCentered data-testid="home">
      <Button as={Link} to="/welcome" className="block m-2">
        Start
      </Button>
    </ScreenCentered>
  );
};

export default Home