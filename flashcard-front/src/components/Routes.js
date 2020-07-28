import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import CreateCardForm from "./CreateCardForm";
import Cards from "./Cards";
import Home from "./Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createcard" component={CreateCardForm} />
        <Route exact path="/viewcards" component={Cards} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
