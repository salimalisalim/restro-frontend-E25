import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {userAuthSuccess} from "../redux/userAuth";
import { useDispatch } from 'react-redux';


function Login() {

    const [validated, setValidated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event)=>{

        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }else{

            setValidated(true);

            try {

                let res = await axios.post('https://restroapp-backend-e25.onrender.com/api/v1/login',{
                  email:userEmail,
                  password:userPassword
                }, {
                  withCredentials:true,
                });
            
                if(res.data.success){

                  if(res.data.isAuthenticated){

                    dispatch(userAuthSuccess({user:res.data.user, isAuthenticated:res.data.isAuthenticated, token:res.data.token}));
                    
                  toast.success(res.data.message);
        
                  await new Promise((resolve) => setTimeout(resolve, 2000));
        
                  navigate('/');

                  }else{
                    toast.error(res.data.message);
                  }
                }else{
                  toast.error(res.data.message);
                }
                
               } catch (error) {
                toast.error(error.message);
               }


        }

    }

    const handleUserEmail = (e)=>{
        setUserEmail(e.target.value);
    }

    const handleUserPassword= (e)=>{
        setUserPassword(e.target.value);
    }

  return (
    <Container>
    <ToastContainer position="top-center" autoClose={1000} />
      <Row>
          <Col className='mt-3'>
              <h5>Login</h5>
          </Col>
      </Row>
      <Row>
          <Col>
          <Form  noValidate validated={validated} onSubmit={handleSubmit}>
   
    <Form.Group className="mb-3" controlId="formGroupEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" placeholder="Enter your email" required onKeyUp={ handleUserEmail} />
      <Form.Control.Feedback type="invalid">Please enter your email!</Form.Control.Feedback>

    </Form.Group>
    <Form.Group className="mb-3" controlId="formGroupPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter a password" required onKeyUp={handleUserPassword} />
    </Form.Group>
    
    <Button type="submit" className="mb-3 bg-dark border-0" variant="primary">Login</Button>
  </Form>
          </Col>
      </Row>
  </Container>
  )
}

export default Login