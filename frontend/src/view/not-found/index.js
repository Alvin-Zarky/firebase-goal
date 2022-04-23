import React from 'react';
import {Container, Row, Col} from "reactstrap";
import * as Images from "../../constant/image";
import "./not-found.scss";

export default function NotFound() {
  return (
    <>
    <Container className='bg-color' fluid>
      <Container>
        <Row>
          <Col xl="12" lg="12" md="12" sm="12" xs="12">
            <div className="erorr-bug">
              <img src={`${Images.error}`} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
    </>
  );
}
