import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Welcome } from "./pages/Welcome/Welcome";
import { Exchange } from "./pages/Exchange/Exchange";
import { Transactions } from "./pages/Transactions/Transactions";
import { SettingsProvider } from "./Contexts/Settings";

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
