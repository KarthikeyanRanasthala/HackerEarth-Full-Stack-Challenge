import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Event = props => {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [content, setContent] = useState(undefined);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:5000/events/${parseInt(id)}`)
      .then(resp => {
        setContent(resp.data.content[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <Container className="mb-3">
      <h2 className="my-3">Event Details</h2>
      {content ? (
        <Table responsive bordered>
          <tbody className="text-center">
            <tr>
              <td>Name:</td>
              <td>{content.name}</td>
            </tr>
            <tr>
              <td>Event:</td>
              <td>{content.event}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{content.description}</td>
            </tr>
            <tr>
              <td>Published Date:</td>
              <td>{content.published_date}</td>
            </tr>
            <tr>
              <td>Speaker:</td>
              <td>
                <Link to={`/speakers/${content.speaker_id}`}>
                  {content.speaker_name}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Talk Link:</td>
              <td>
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  View Talk
                </a>
              </td>
            </tr>
            <tr>
              <td>Views:</td>
              <td>{content.views}</td>
            </tr>
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

export default Event;
