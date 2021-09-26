import './App.css';
import myImage from './logo.png';
import { Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <header class="text-center mt-3">
        <Image src={myImage} width={80} />
        <h2>LSER Phase Equilibria Calculator</h2>
      </header>

      <Form>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form>
    </div>
  );
}

export default App;
