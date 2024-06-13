import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({ product }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description.substring(0, 20) + " ..."}
                </Card.Text>
                <Card.Footer>
                    <h3>Price : {product.price}</h3>
                </Card.Footer>
                <Button variant="primary" >Details</Button>
                <Button variant='secondary'>Buy</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;