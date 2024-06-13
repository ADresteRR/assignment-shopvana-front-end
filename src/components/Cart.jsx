// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import DefaultFoodImage from "../images/food.jpg"
import '../styles/cart.css';

const Cart = () => {
    const { tempUserId, getTempUserId, cartItems, getCartItems, removeFromCart } = useCart();
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [tips, setTips] = useState(0);

    useEffect(() => {
        const prefetchUserIdAndCartItems = async () => {
            await getCartItems();
            await getTempUserId();
        };
        prefetchUserIdAndCartItems();
    }, []);

    const calculateTotalAmount = (item) => {
        const itemPrice = parseFloat(item.price);
        const optionsTotal = item.options.reduce((total, option) => total + parseFloat(option.surcharge), 0);
        return (itemPrice + optionsTotal) * item.quantity;
    };

    const overallTotal = cartItems.reduce((total, item) => total + calculateTotalAmount(item), 0);
    const totalWithCharges = overallTotal + (isNaN(tax) ? 0 : parseFloat(tax)) + (isNaN(serviceFee) ? 0 : parseFloat(serviceFee)) + (isNaN(tips) ? 0 : parseFloat(tips));

    const handleRemove = async (event) => {
        removeFromCart(event.target.id);
    };

    const handleInputChange = (setter) => (event) => {
        const value = Math.max(0, parseFloat(event.target.value));
        setter(isNaN(value) ? 0 : value);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="mb-4 text-center">Shopping Cart</h2>
                    {cartItems.length === 0 ? (
                        <Card className="text-center shadow-sm rounded">
                            <Card.Body>
                                <Card.Title>Your cart is empty</Card.Title>
                                <Card.Text>Add some products to your cart.</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        cartItems.map((item, index) => (
                            <Card key={index} className="mb-3 shadow-sm rounded">
                                <Card.Body>
                                    <Row>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Card.Img variant="top" src={item.image || DefaultFoodImage} alt={item.product} className="cart-img" />
                                        </Col>
                                        <Col md={8}>
                                            <Card.Title className="text-center">{item.product}</Card.Title>
                                            <Card.Text className="text-center">
                                                <strong>Quantity: </strong>{item.quantity}
                                            </Card.Text>
                                            <Card.Text className="text-center">
                                                <strong>Price: </strong>₹{item.price}
                                            </Card.Text>
                                            <Card.Text className="text-center">
                                                <strong>Options:</strong>
                                                <ListGroup variant="flush">
                                                    {item.options.map((option, idx) => (
                                                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                                            {option.name}
                                                            <span className="text-success">+ ₹{parseFloat(option.surcharge).toFixed(2)}</span>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Card.Text>
                                            <Card.Text className="text-center">
                                                <strong>Total Amount: </strong>₹{calculateTotalAmount(item).toFixed(2)}
                                            </Card.Text>
                                            <div className="d-flex justify-content-center">
                                                <Button id={item.id} variant="danger" className="mr-2" onClick={handleRemove}>Remove</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    {cartItems.length > 0 && (
                        <>
                            <Card className="mt-3 shadow-sm rounded">
                                <Card.Body>
                                    <Form>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={4}>Tax</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    value={tax}
                                                    onChange={handleInputChange(setTax)}
                                                    min={0}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={4}>Service Fee</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    value={serviceFee}
                                                    onChange={handleInputChange(setServiceFee)}
                                                    min={0}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={4}>Tips</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control
                                                    type="number"
                                                    value={tips}
                                                    onChange={handleInputChange(setTips)}
                                                    min={0}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    <Card.Title className="text-center">Overall Total: ₹{totalWithCharges.toFixed(2)}</Card.Title>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
