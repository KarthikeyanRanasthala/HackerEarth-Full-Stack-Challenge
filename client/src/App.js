import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Event from "./routes/Event";
import Search from "./routes/Search";
import Speaker from "./routes/Speaker";
import AllSpeakers from "./routes/AllSpeakers";
import AllEvents from "./routes/AllEvents";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>TedEx Aggregator</Navbar.Brand>
        <Nav className="ml-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/events">
            Events
          </Link>
          <Link className="nav-link" to="/speakers">
            Speakers
          </Link>
          <Link className="nav-link" to="/search">
            Search
          </Link>
        </Nav>
      </Navbar>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={Search} />
      <Route exact path="/events" component={AllEvents} />
      <Route path="/events/:id" component={Event} />
      <Route exact path="/speakers" component={AllSpeakers} />
      <Route path="/speakers/:id" component={Speaker} />
    </>
  );
}

export default App;
