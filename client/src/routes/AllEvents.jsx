import React, { useState, useEffect } from "react";
import { Container, Table, Row, Button, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

const AllEvents = () => {
  const [pageNo, setPageNo] = useState(1);
  const [content, setContent] = useState(undefined);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/events", {
      params: {
        page_no: pageNo
      }
    }).then(resp => {
      setContent(resp.data.content);
      setTotalPages(resp.data.total_pages);
    });
  }, [pageNo]);

  return (
    <Container className="mb-3">
      <h2 className="my-3">Events</h2>
      {content ? (
        <>
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
              {content.map(el => (
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
          <Row className="justify-content-between">
            <p>Current Page: {pageNo}</p>
            <p>Total Pages: {totalPages}</p>
          </Row>

          <Row className="justify-content-between">
            {pageNo === 1 ? (
              <Button onClick={() => setPageNo(pageNo - 1)} disabled>
                Previous Page
              </Button>
            ) : (
              <Button onClick={() => setPageNo(pageNo - 1)}>
                Previous Page
              </Button>
            )}
            <Button onClick={() => setPageNo(pageNo + 1)}>Next Page</Button>
          </Row>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default AllEvents;
