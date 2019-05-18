import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import "./App.css";

import Counter from "./components/Counter";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/todo">todo</Link> <Link to="/counter">counter</Link>
        {/* <Route exact path="/" component={Todo} /> */}
        <Switch>
          <Route path="/todo" component={Todo} />
          <Route path="/counter" component={Counter} />
          <Redirect exact from="/" to="/todo" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
