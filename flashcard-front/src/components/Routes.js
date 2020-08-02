import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import CreateCardForm from "./CreateCardForm";
import Study from "./Study";
import ChangeDeck from "./ChangeDeck";

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/" component={Study} />
        <Route exact path="/createcard" component={CreateCardForm} />
        <Route exact path="/changedeck" component={ChangeDeck} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
