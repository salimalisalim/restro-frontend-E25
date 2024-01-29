import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Row , Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';



function Register() {
  const [validated, setValidated] = useState(false);
  const [fullname, setFullname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) =>{

    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
    }else{
      setValidated(true);
      try {

        let res = await instance.post('/api/v1/register', {
          fullname,
          email:userEmail,
          password:userPassword
        });
    
        if(res.data.success){
          toast.success(res.data.message);

          await new Promise((resolve) => setTimeout(resolve, 2000));

          navigate('/');

        }else{
          toast.error(res.data.message);
        }
        
       } catch (error) {
        toast.error(error.response.data.message);
       }
    
    }
    
  }

  const handleFullname = (e)=>{

     setFullname(e.target.value);

  }

  const handleUserEmail = (e)=>{
    setUserEmail(e.target.value);
  }

  const handleUserPassword = (e)=>{
    setUserPassword(e.target.value);
  }


  return (
    <Container>
      <ToastContainer position="top-center" autoClose={1000} />
        <Row>
            <Col className='mt-3'>
                <h5>Register</h5>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupFullname">
        <Form.Label>Full name:</Form.Label>
        <Form.Control type="text" placeholder="Enter your full name" required onKeyUp={handleFullname} />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter your fullname!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" required onKeyUp={ handleUserEmail} />
        <Form.Control.Feedback type="invalid">Please enter your email!</Form.Control.Feedback>

      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter a password" required onKeyUp={handleUserPassword} />
      </Form.Group>
      
      <Button type="submit" className="mb-3 bg-dark border-0" variant="primary">Register</Button>
    </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Register