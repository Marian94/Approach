 import { useEffect, useState } from "react";
 import { Card, Container, Row, Col } from "react-bootstrap";
 import axios from "axios";
 
 

 function FakeCard({userId}) {
    const [card, setCard] = useState([])
    

    useEffect(() => {
          axios({
            method: "get",
            url: `https://randommer.io/api/Card`,
            headers: {
            "X-Api-Key": "f3b80c8d2c6a478e89445e919e625fff",
            },
          }).then((response) => {
           setCard(response.data);
          });
        
    }, []);

    useEffect(() => {
        axios.put(`http://localhost:3001/${userId}`, {cardInfo:card})
        .then((response) => {
            console.log({response});
            console.log(response.status);

        }).catch((error) => {
            console.log(error)
        })
    }, [card]);

   return (
    <Card style={{ backgroundColor:"gray", width:"auto"}}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{`FULL NAME`}<br/>{card?.fullName}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{`CARD NUMBER`}<br/>{card?.cardNumber}</Card.Subtitle>
        <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
        <Card.Subtitle className="mb-2 text-muted">{`CVV`}<br/>{card?.cvv}</Card.Subtitle>
       
        </Col>
        <Col md="auto">
        <Card.Subtitle className="mb-2 text-muted">{`PIN`}<br/>{card?.pin}</Card.Subtitle>
       
        </Col>
        <Col xs lg="3">
        <Card.Subtitle className="mb-2 text-muted">{`EXP`}<br/>{new Date(card?.date).getUTCMonth()}/ {new Date(card?.date).getUTCFullYear()}</Card.Subtitle>
       
        </Col>
      </Row>
      </Container>
      </Card.Body>
    </Card>
   )
 }

 export default FakeCard;