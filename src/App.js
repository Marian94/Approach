import axios from 'axios';
import {useState, useEffect} from 'react';
import UserCard from './components/UserCard';
import {Container, Row, Button} from 'react-bootstrap';
import CreateUserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [user, setUser]= useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => { 
    axios.get('http://localhost:3001/')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (
    <div className="App">
      <Container className="">
        <Button variant="success" className="mb-3" onClick={()=> setIsModalOpen(true)}>Crear Usuario</Button>
        <CreateUserForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          setUsers={setUser}
        />
      <Row  className="justify-content-md-center">
        <UserCard data={user} setUsers={setUser} />
      </Row>
      </Container>
    </div>
  );
}

export default App;
