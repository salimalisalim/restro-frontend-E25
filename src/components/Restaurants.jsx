import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

function Restaurants({restaurant}) {


  return (
    <Card>
      <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + restaurant.photograph} />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>
          {restaurant.address}
        </Card.Text>
        <Button as={Link} to={`/details/${restaurant._id}`} variant="dark">More Details</Button>
      </Card.Body>
    </Card>
  );
}

export default Restaurants;