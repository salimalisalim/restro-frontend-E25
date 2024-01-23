import React, {useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Restaurants from './Restaurants'
import { getRestaurants } from '../redux/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import instance  from '../axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  // const [menu, setMenu] = useState(10);

  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants.data);

  // const [restaurant, setRestaurant] = useState({
  //   name:"Japan Sushi",
  //   location:"Bangalore",
  //   photograph:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  //   description:"This is the best restaurant in town"
  // });

  //Class based & Function 
  // Class >>> Stateful components
  //Fn >>>> Stateless components
  //State >>> 
  //Hooks >>> 
  //Life cycle events >>>>> componenentDidMount(), componentDidUpdate(), componentWillUnmount()
  //useEffect Hook --->


  useEffect(()=>{

    //Mount 
    // fetch('./restaurants.json')
    // .then((res) => res.json())
    // .then((data) => dispatch(getRestaurants(data.restaurants)));

    const getRestaurantsList = async()=>{

      try {
        const res = await instance.get('api/v1/restaurants');

        if(!res.data.success){
          toast.error(res.data.message);
        }

        dispatch(getRestaurants(res.data.restaurants))

      } catch (error) {
        toast.error(error.response.data.message);
      }

    }

    getRestaurantsList();

  }, [dispatch]);  //Dependancy array

  //  const restaurant = {
  //   name:"Japan Sushi",
  //   location:"Bangalore",
  //   photograph:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
  //   description:"This is the best restaurant in town"
  // }

  // const handleMenuIncrement = ()=>{
  //   setMenu(menu + 1);
  // }

  // const handleMenuDecrement = ()=>{
  //   setMenu(menu - 1);
  // }




  return (
    
    <Container >
      <ToastContainer position="top-center" autoClose={1000} />
        <Row>

            {restaurants && (
               restaurants.map((restaurant,index) => (
                <Col className='py-3' md={3} key={index}>
                  <Restaurants restaurant = {restaurant} />
                </Col>
               ))
            )}

        </Row>
    </Container>
    
  )
}

export default Home