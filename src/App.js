import React, { useState } from 'react';
import './App.css';
import myImage from './logo.png';
import { Image, Form, Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

import Utility from './Utility';

const myUtility = new Utility();


function App() {
  const CASList = myUtility.getCompoundNameList();
  const [showCard, setShowCard] = useState(false);
  const [logK, setLogK] = useState(false);

  const onSubmit = (data, errors) => {
    const result = myUtility.calculateLogK(data["solvent"], data["solute"]);
    setLogK(result);
    setShowCard(true);
  }

  const onCloseCard = () => {
    setShowCard(false);
  }

  const onReset = () => {
    reset({ solute: "", solvent: "" })
  }

  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: {
      solvent: "",
      solute: "",
    },
  });

  return (
    <div>
      <header className="text-center mt-3">
        <Image src={myImage} width={80} />
        <h2>LSER Phase Equilibria Calculator</h2>
      </header>

      {showCard &&
        <div id="resultNoti">
          <Card id="notificationCard">
            <Card.Body>
              <Card.Title>Result of the calculation</Card.Title>
              <Card.Text>
                Your logK is {logK}!
              </Card.Text>
              <Button variant="primary" onClick={onCloseCard}>Close</Button>
            </Card.Body>
          </Card>
        </div>
      }

      <div className="mx-5 mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="mt-3">
            <Form.Label>Select your solute</Form.Label>
            <Form.Select {...register("solute", { required: true })}>
              {CASList.map((cas) => {
                return <option value={cas}>{cas}</option>
              })}
            </Form.Select>
          </Container>

          {errors.solute && errors.solute.type === "required" &&
            <Container className="mt-3">
              <Alert variant="danger">
                Please choose the solute
              </Alert>
            </Container>
          }


          <Container className="mt-3">
            <Form.Label>Select your solvent</Form.Label>
            <Form.Select {...register("solvent", { required: true })}>
              {CASList.map((cas) => {
                return <option value={cas}>{cas}</option>
              })}
            </Form.Select>
          </Container>

          {errors.solvent && errors.solvent.type === "required" &&
            <Container className="mt-3">
              <Alert variant="danger">
                Please choose the solvent
              </Alert>
            </Container>
          }

          <Container className="mt-10">
            <Col>
              <Row><Button id="button" variant="primary" size="lg" type="submit">Submit</Button></Row>
              <Row><Button id="button" variant="danger" size="lg" onClick={onReset}>Reset</Button></Row>
            </Col>
          </Container>
        </Form>
      </div>
    </div>
  );
}

export default App;
