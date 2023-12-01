import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FakeCard from './FakeCard';
import axios from 'axios';


function UserCard({data, setUsers}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

const deleteUser = (id) => {
  axios.delete(`http://localhost:3001/${id}`)
  .then((res) => {
    setUsers(res.data);
  }).catch((err) => { 
    console.log(err);

  } );
};
const editUser = ({id, phone, email}) => { 
  setEmail(email);
  setPhone(phone);
  setEditMode(true);
  setCurrentUserId(id);
};
const saveUser = (id) => {
  axios.put(`http://localhost:3001/${id}`, {phone, email})
  .then((res) => {
    setUsers(res.data);
    setEditMode(false);
    setCurrentUserId(null);
  }).catch((err) => {
    console.log(err);
  
  });
};
 
  return (
    <>
    {data?.map((user) => (
    <Card  order="secondary" style={{ width: '70%', margin:"20px"}}>
      <Card.Body>
        <Container >
          <Row>
            <Col xs={6}>
              <Card.Title>{user?.name} {user?.middleName} {user?.fLastName} {user?.sLastName}</Card.Title>
              <Card.Text>
                {`ID: ${user.id}`}
              </Card.Text>
            </Col>
            <Col xs lg="2">
              <Card.Text>{user.status}</Card.Text>
            </Col>
            <Col xs lg="2">
              <Button disabled={editMode} variant="outline-danger" onClick={()=>deleteUser(user?.id)}>Borrar</Button> 
                <>
                {editMode && user.id === currentUserId ?
                  <Button variant="outline-primary"style={{marginTop:"10px"}} onClick={()=>saveUser(user?.id)}>Guardar</Button>
                : 
                  <Button variant="outline-primary"style={{marginTop:"10px"}} onClick={()=>editUser(user)} >Edit</Button>
                }
                </>
              </Col>
          </Row>
        </Container>
        <Container style={{padding:"20px"}}>
          <Row>
            <Col style={{borderRight: "0.5px solid gray"}}>
              <Card.Text>
                Mail <br/>
                <input type="text" value={currentUserId === user?.id? email:user?.email} onChange={(e)=>setEmail(e.target.value)} disabled={currentUserId === user?.id?false:true}/>
              </Card.Text>
              <Card.Text>
                Telefono <br/>
                <input type="text" value={currentUserId === user?.id? phone:user?.phone} onChange={(e)=>setPhone(e.target.value)} disabled={currentUserId === user?.id? false:true}/>
              </Card.Text>
              <Card.Text>
                FECHA DE NACIMIENTO <br/>
                {user?.birthday}
              </Card.Text>
              <Card.Text>
                ANALISTA ASIGNADO <br/>
                {user?.assignedAnalyst}
              </Card.Text>
            </Col>
            <Col  className="justify-content-md">
              <FakeCard userId={user.id}/>
            </Col>
          </Row>
        </Container>  
      </Card.Body>
    </Card>

))}
</>
  );
}

export default UserCard;