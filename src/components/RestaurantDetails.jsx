import React from 'react' 
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function RestaurantDetails() {

  const restaurants = useSelector((state) => state.restaurants.data);


  const {id} = useParams();


  const restaurant = restaurants.find((rest) => rest._id === id);


  return (
    
    <Container >
       {restaurant && (
         <Row>
         <Col md={8} className='py-3'>
         <Card>
   <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + restaurant.photograph} />
   <Card.Body>
     <Card.Title>{restaurant.name}</Card.Title>
     <Card.Text>
       {restaurant.address}
     </Card.Text>
   </Card.Body>
 </Card>
         </Col>
         <Col md={4} className='py-3'>
             <h4>Cuisine Type: {restaurant.cuisine_type}</h4>
             <h5>Operating Hours:</h5>
             <ListGroup variant="flush">
        <ListGroup.Item>Monday: {restaurant?.operating_hours?.Monday ?? ''}</ListGroup.Item>
        <ListGroup.Item>Tuesday: {restaurant?.operating_hours?.Tuesday ?? ''}</ListGroup.Item>
        
      </ListGroup>
         </Col>
     </Row>
       )}
    </Container>

  )
}

export default RestaurantDetails