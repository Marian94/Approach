import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, FormLabel } from 'react-bootstrap';

const CreateUserForm = ({ isOpen, onRequestClose, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if(!name || !email || !phone) return alert('Todos los campos son obligatorios');
    axios.post('http://localhost:3001/', { name, email, phone })
    .then((res) => {   
        setUsers(res.data);
        setName('');
        setEmail('');
        setPhone('');
        onRequestClose();
    }).catch((err) => {     
        console.log(err);   
    });
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <div style={{padding:"20px"}}>
        <FormLabel>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </FormLabel>
        <br />
        <FormLabel>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormLabel>
        <br />
        <FormLabel>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormLabel>
        </div>
        <Modal.Footer>
        <Button variant="outline-primary"style={{marginTop:"10px"}} onClick={handleSubmit}>Guardar</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default CreateUserForm;