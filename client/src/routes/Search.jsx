import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState(undefined);

  const handleSubmit = evt => {
    evt.preventDefault();
    Axios.get("http://127.0.0.1:5000/search", {
      params: {
        type,
        query
      }
    })
      .then(resp => {
        setResults(resp.data.content);
      })
      .catch(err => console.log(err));
  };

  return (
    <Container className="mb-3">
      <Row>
        <Col className="justify-content-md-center">
          <h2 className="my-3">Search</h2>
          <Form className="my-3" onSubmit={evt => handleSubmit(evt)}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Enter your query here..."
                  required
                  onChange={evt => setQuery(evt.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  onChange={evt => setType(evt.target.value)}
                  required
                >
                  <option value="">Choose type...</option>
                  <option value="events">Events</option>
                  <option value="speakers">Speakers</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Search</Button>
          </Form>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        {results ? (
          type === "events" ? (
            <>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>Speaker Name</th>
                  <th>Views</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map(el => (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.event}</td>
                    <td>{el.speaker_name}</td>
                    <td>{el.views}</td>
                    <td>
                      <Link to={`/events/${el.id}`}>View Event</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Speaker Name</th>
                  <th>Speaker Occupation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map(el => (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.speaker_name}</td>
                    <td>{el.speaker_occupation}</td>
                    <td>
                      <Link to={`/speakers/${el.id}`}>View Speaker</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )
        ) : (
          <></>
        )}
      </Table>
    </Container>
  );
};

export default Search;
