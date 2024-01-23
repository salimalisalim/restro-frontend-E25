import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRestaurant() {

    const [restaurant, setRestaurant] = useState({
      name:'',
      address:'',
      neighborhood:'',
      cuisine:'',
      photograph:''
    });

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          
          event.stopPropagation();
        }else{

          const formData = new FormData();
          formData.append("name", restaurant.name);
          formData.append("address", restaurant.address);
          formData.append("neighborhood", restaurant.neighborhood);
          formData.append("cuisine", restaurant.cuisine);
          formData.append("photograph", restaurant.photograph);

          try {

            const res = await instance.post('https://restroapp-backend-e25.onrender.com/api/v1/add',formData, {
              headers:{
                'Content-Type':'multipart/form-data',
              },
              withCredentials:true
            } );

            console.log("res----------->", res);

            if(!res.data.success){
              toast.error(res.data.message);
            }

            toast.success(res.data.message);

          await new Promise((resolve) => setTimeout(resolve, 2000));

          navigate('/');

            
          } catch (error) {
            toast.error(error.response.data.message);
          }

        }
        
        setValidated(true);

       
        
      };

      console.log(restaurant);

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={1000} />
        <Row>
            <Col className='mt-3'>
                <h5>Add Restaurant Details</h5>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Restaurant Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter restaurant name" required onKeyUp={(e) => setRestaurant({...restaurant, name:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Restaurant Address:</Form.Label>
        <Form.Control type="text" placeholder="Enter restaurant address" required onKeyUp={(e) => setRestaurant({...restaurant, address:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Neighborhood:</Form.Label>
        <Form.Control type="text" placeholder="Enter neighborhood " onKeyUp={(e) => setRestaurant({...restaurant, neighborhood:e.target.value})} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridState" >
          <Form.Label>Cuisine Type</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setRestaurant({...restaurant, cuisine:e.target.value})} required>
            <option>Indian</option>
            <option>Chinese</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Restaurant Photograph:</Form.Label>
        <Form.Control type="file" onChange={(e) => setRestaurant({...restaurant, photograph:e.target.files[0]})} />
      </Form.Group>
      <Button type="submit" className="mb-3 bg-dark border-0" variant="primary">Add Restaurant</Button>
    </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default AddRestaurant