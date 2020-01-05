import React, { useState, useEffect } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

const Speaker = props => {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [content, setContent] = useState(undefined);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:5000/speakers/${parseInt(id)}`)
      .then(resp => {
        setContent(resp.data.content);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <Container className="mb-3">
      <h2 className="my-3">Speaker Details</h2>
      {content ? (
        <>
          <Table striped bordered hover responsive>
            <tbody className="text-center">
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Occupation</td>
              </tr>
              <tr>
                <td>{content.speaker[0].id}</td>
                <td>{content.speaker[0].speaker_name}</td>
                <td>{content.speaker[0].speaker_occupation}</td>
              </tr>
            </tbody>
          </Table>
          <h4 className="my-4">Recent Talks</h4>
          <Table className="text-center" striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Event</th>
                <th>Title</th>
                <th>Views</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content.recent_events.map(el => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.event}</td>
                  <td>{el.title}</td>
                  <td>{el.views}</td>
                  <td>
                    <Link to={`/events/${el.id}`}>View Event</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default Speaker;
