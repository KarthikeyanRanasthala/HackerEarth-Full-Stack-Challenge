import React, { useState, useEffect } from "react";
import { Container, Table, Row, Button, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";

const AllSpeakers = () => {
  const [pageNo, setPageNo] = useState(1);
  const [content, setContent] = useState(undefined);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/speakers", {
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
      <h2 className="my-3">Speakers</h2>
      {content ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Occupation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content.map(el => (
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

export default AllSpeakers;
