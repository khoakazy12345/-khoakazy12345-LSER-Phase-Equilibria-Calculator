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
  const [logK1in2, setLogK1in2] = useState(0);
  const [logK2in1, setLogK2in1] = useState(0);
  const [logK1in1, setLogK1in1] = useState(0);
  const [logK2in2, setLogK2in2] = useState(0);
  const [solvationFreeEnergy1in2, setSolvationFreeEnergy1in2] = useState(0);
  const [solvationFreeEnergy2in1, setSolvationFreeEnergy2in1] = useState(0);
  const [solvationFreeEnergy1in1, setSolvationFreeEnergy1in1] = useState(0);
  const [solvationFreeEnergy2in2, setSolvationFreeEnergy2in2] = useState(0);

  const onSubmit = (data) => {
    const log1in2 = myUtility.calculateLogK(data["solvent"], data["solute"]);
    const log2in1 = myUtility.calculateLogK(data["solute"], data["solvent"]);
    const log1in1 = myUtility.calculateLogK(data["solvent"], data["solvent"]);
    const log2in2 = myUtility.calculateLogK(data["solute"], data["solute"]);
    setLogK1in2(log1in2);
    setLogK2in1(log2in1);
    setLogK1in1(log1in1);
    setLogK2in2(log2in2);

    const freeEnergy1in2 = myUtility.calculateFreeEnergy(log1in2);
    const freeEnergy2in1 = myUtility.calculateFreeEnergy(log2in1);
    const freeEnergy1in1 = myUtility.calculateFreeEnergy(log1in1);
    const freeEnergy2in2 = myUtility.calculateFreeEnergy(log2in2);
    setSolvationFreeEnergy1in2(freeEnergy1in2);
    setSolvationFreeEnergy2in1(freeEnergy2in1);
    setSolvationFreeEnergy2in2(freeEnergy2in2);
    setSolvationFreeEnergy1in1(freeEnergy1in1);

    setShowCard(true);
  }

  const onCloseCard = () => {
    setShowCard(false);
    setLogK1in2(0);
  }

  const onReset = () => {
    reset({ solute: "", solvent: "" });
    setLogK1in2(0);
  }

  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      solvent: "",
      solute: "",
    },
  });

  const solvent = watch(["data", "solvent"]);
  const solute = watch(["data", "solute"]);

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
                Your logK for {solute} in {solvent} is {logK1in2}!
              </Card.Text>
              <Card.Text>
                Your logK for {solvent} in {solute} is {logK2in1}!
              </Card.Text>
              <Card.Text>
                Your logK for {solute} in {solute} is {logK2in2}!
              </Card.Text>
              <Card.Text>
                Your logK for {solvent} in {solvent} is {logK1in1}!
              </Card.Text>

              <Card.Text>
                Your free energy for {solute} in {solvent} is {solvationFreeEnergy1in2}!
              </Card.Text>
              <Card.Text>
                Your free energy for {solvent} in {solute} is {solvationFreeEnergy2in1}!
              </Card.Text>
              <Card.Text>
                Your free energy for {solute} in {solute} is {solvationFreeEnergy1in1}!
              </Card.Text>
              <Card.Text>
                Your free energy for {solvent} in {solvent} is {solvationFreeEnergy2in2}!
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

          <Container className="mt-5">
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
