import './App.css';
import myImage from './logo.png';
import { Image, Form, Container, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import CASNumberList from './utilities';
import 'bootstrap/dist/css/bootstrap.min.css';

const onSubmit = (data) => {
  console.log(data);
}

function App() {
  const CASList = CASNumberList();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      solvent: "0",
      solute: "0",
    },
  });

  return (
    <div>
      <header className="text-center mt-3">
        <Image src={myImage} width={80} />
        <h2>LSER Phase Equilibria Calculator</h2>
      </header>

      <div className="mx-5 mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="mt-3">
            <Form.Label>Select your solvent</Form.Label>
            <Form.Select {...register("solvent")}>
              {CASList.map((cas) => {
                return <option value={cas}>{cas}</option>
              })}
            </Form.Select>
          </Container>

          <Container className="mt-3">
            <Form.Label>Select your solute</Form.Label>
            <Form.Select {...register("solute")}>
              {CASList.map((cas) => {
                return <option value={cas}>{cas}</option>
              })}
            </Form.Select>
          </Container>

          <Container className="mt-3">
            <Col>
              <Row><Button id="button" variant="primary" size="lg" type="submit">Submit</Button></Row>
              <Row><Button id="button" variant="danger" size="lg">Reset</Button></Row>
            </Col>
          </Container>
        </Form>
      </div>
    </div>
  );
}

export default App;
