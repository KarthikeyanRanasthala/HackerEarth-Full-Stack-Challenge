import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Spinner, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState(undefined);
  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/recent_events")
      .then(resp => {
        setEvents(resp.data.content);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Container className="mb-3">
      <h2 className="my-3">Recent Events</h2>
      {events ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Speaker</th>
              <th>Event</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(el => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>{el.speaker_name}</td>
                <td>{el.event}</td>
                <td>
                  <Link to={`/events/${el.id}`}>View Event</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default HomePage;
