// src/components/FoodItem.js
import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import defaultFoodImage from "../images/food.jpg";
import '../styles/productItem.css';

const FoodItem = ({ food }) => {
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = () => {
        setShowModal(true);
    };

    return (
        <Card className="h-100 shadow-sm rounded">
            <Card.Img variant="top" src={food.image || defaultFoodImage} alt={food.name} className="food-img" onError={(e) => { e.target.onerror = null; e.target.src = defaultFoodImage; }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{food.name}</Card.Title>
                <Card.Text className="text-muted text-center">{food.description.substring(0, 111) + " ..."}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                    <Button variant="primary" className="mr-2">
                        <Link to={{ pathname: `/food-details/${food.id}`, state: { food } }} className="text-white text-decoration-none">
                            View Details
                        </Link>
                    </Button>
                    <Button variant="success" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
            </Card.Body>

            <AddToCart showModal={showModal} setShowModal={setShowModal} food={food} />
        </Card>
    );
};

export default FoodItem;
