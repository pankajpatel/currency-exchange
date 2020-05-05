import React from "react";
import loadable from "@loadable/component";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { SettingsProvider } from "./Contexts/Settings";
import Welcome from "./pages/Welcome/Welcome";

const Exchange = loadable(() => import("./pages/Exchange/Exchange"));
const Transactions = loadable(() =>
  import("./pages/Transactions/Transactions")
);
const Balance = loadable(() => import("./pages/Balance/Balance"));
const Settings = loadable(() => import("./pages/Settings/Settings"));

function App() {
  return (
    <SettingsProvider>
      <div className="bg-gray-200" data-testid="app">
        <div className="container min-h-screen p-2 box-border mx-auto relative text-center">
          <Router>
            <Switch>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/balance">
                <Balance />
              </Route>
              <Route path="/exchange">
                <Exchange />
              </Route>
              <Route path="/welcome">
                <Welcome />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
