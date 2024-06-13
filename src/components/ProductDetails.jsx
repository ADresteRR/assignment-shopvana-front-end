// src/components/FoodDetails.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DefaultFoodImage from "../images/food.jpg";
import AddToCart from './AddToCart';
import '../styles/foodDetails.css';
import defaultFoodImage from "../images/food.jpg"
const FoodDetails = ({ products }) => {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const food = products.find(f => f.id === parseInt(id));

    if (!food) {
        return <div>Food item not found.</div>;
    }

    const handleAddToCart = () => {
        setShowModal(true);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm rounded">
                        <Row noGutters>
                            <Col md={6}>
                                <Card.Img variant="top" src={food.image || DefaultFoodImage} alt={food.name} className="img-fluid food-img" onError={(e) => { e.target.onerror = null; e.target.src = defaultFoodImage; }} />
                            </Col>
                            <Col md={6}>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-center">{food.name}</Card.Title>
                                    <Card.Text className="text-muted text-center">{food.description}</Card.Text>
                                    <Card.Text className="text-center">
                                        <strong>Price: </strong>₹{food.price}
                                    </Card.Text>
                                    <div className="mt-auto d-flex justify-content-center">
                                        <Button variant="success" onClick={handleAddToCart} className="w-100">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <AddToCart showModal={showModal} setShowModal={setShowModal} food={food} />
        </Container>
    );
};

export default FoodDetails;
