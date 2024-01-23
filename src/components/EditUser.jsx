import React, { useEffect, useState} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';


function EditUser() {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname:'',
        email:''
    });

    const {id} = useParams('id');

    useEffect(()=>{

       const getUserDetails = async ()=>{

            try {

                const res = await instance.get(`/api/v1/user/${id}`,{
                    withCredentials:true
                });

                console.log(res);

                setUser({
                    fullname:res.data.user.fullname,
                    email:res.data.user.email
                });
                
            } catch (error) {
                toast.error(error.message);
            }

        }

        getUserDetails();

    },[id]);

    console.log(user);

    const handleSubmit = async (event) =>{

      event.preventDefault();

      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
    }else{
      setValidated(true);

      try {

        const res = await instance.put(`/api/v1/user/${id}`, {
          fullname:user.fullname,
          email:user.email
        }, {
          withCredentials:true
      });

        if(res.data.success){
          toast.success(res.data.message);

          await new Promise((resolve) => setTimeout(resolve, 2000));

          navigate('/users');

        }else{
          toast.error(res.data.message);
        }
        
      } catch (error) {
        toast.error(error.response.data.message);
      }

    }
  }

  

    console.log(user);
  return (
    <Container>
      <ToastContainer position="top-center" autoClose={1000} />
        <Row>
            <Col className='mt-3'>
                <h5>Update User</h5>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupFullname">
        <Form.Label>Full name:</Form.Label>
        <Form.Control type="text" placeholder="Enter your full name" defaultValue={user.fullname} required onKeyUp={(e) => setUser({...user, fullname:e.target.value})} />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter your fullname!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" defaultValue={user.email} required onKeyUp={(e) => setUser({...user, email:e.target.value})} />
        <Form.Control.Feedback type="invalid">Please enter your email!</Form.Control.Feedback>

      </Form.Group>
      
      
      <Button type="submit" className="mb-3 bg-dark border-0" variant="primary">Update</Button>
    </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default EditUser