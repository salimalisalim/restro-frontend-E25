import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import instance from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function DeleteUser({id, users, setUsers}) {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = async()=>{

        setShow(false);

       try {

        const res = await instance.delete(`/api/v1/user/${id}`, {
            withCredentials:true
        });

        if(res.data.success){
            toast.success(res.data.message);
            setUsers(users.filter((user) => user._id !== id));
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate('/users');
  
          }else{
            toast.error(res.data.message);
          }

        
       } catch (error) {
        toast.error(error.response.data.message);
       }



    }

    
  return (
    <>
    <ToastContainer position="top-center" autoClose={500} />

        <Trash onClick={handleShow}/>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete the user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
}

export default DeleteUser