import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {PencilSquare} from "react-bootstrap-icons";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from './DeleteUser';
import instance from '../axios';

function Users() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    useEffect(()=>{

      const getAllUsers = async()=> {
            
        try {
            
          const res = await instance.get("/api/v1/users", {
            withCredentials:true,
          });
  
            setUsers(res.data.users);
  
        } catch (error) {
  
          toast.error(error.response.data.message);
  
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate('/login');
        
        }
  
    } 

    getAllUsers();

    
  },[navigate]);

    return (
        <Container>
          <ToastContainer position="top-center" autoClose={1000} />
            <Row>
                <Col className='mt-3'>
                    <h5>Users</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user,index) => (
             <tr key={index}>
             <td>{index + 1}</td>
             <td>{user.fullname}</td>
             <td>{user.email}</td> 
             <td>
              <Link to={`/user/${user._id}`}>
                <PencilSquare/>
              </Link>
             </td>
             <td>
              <DeleteUser id={user._id} users= {users} setUsers={setUsers}/>
             </td>
           </tr>
        ))}
      </tbody>
    </Table>
                </Col>
            </Row>
        </Container>

    )
}

export default Users