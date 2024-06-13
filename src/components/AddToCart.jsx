import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, InputGroup, FormControl, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import '../styles/addToCart.css'; // Import custom CSS for additional styling

function AddToCart({ showModal, setShowModal, food }) {
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({});
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const results = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/get-all-options`);
                setData(results.data.data);
            } catch (err) {
                console.log(`Error occurred while fetching options from server`);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (optionListId, optionId, selectionType) => {
        setFormData((prevData) => {
            if (selectionType === 'SINGLE') {
                return { ...prevData, [optionListId]: optionId };
            } else {
                const selectedOptions = prevData[optionListId] || [];
                if (selectedOptions.includes(optionId)) {
                    return {
                        ...prevData,
                        [optionListId]: selectedOptions.filter((id) => id !== optionId),
                    };
                } else {
                    return {
                        ...prevData,
                        [optionListId]: [...selectedOptions, optionId],
                    };
                }
            }
        });
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = (event) => {
        event.preventDefault();
        // Check if all required options are selected
        const requiredOptionsSelected = data.every(optionList => {
            if (optionList.selection_type === 'SINGLE') {
                return formData[optionList.option_list_id] !== undefined;
            }
            return true;
        });

        if (!requiredOptionsSelected) {
            alert("Please select all required options.");
            return;
        }

        addToCart(formData, quantity, food.id);
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddToCart}>
                    {data.map((optionList) => (
                        <Form.Group key={optionList.option_list_id} as={Row} className="mb-3">
                            <Form.Label column sm={4}>{optionList.option_list}</Form.Label>
                            <Col sm={8}>
                                {optionList.options.map((option) => (
                                    <Card key={option.id} className="mb-2 p-2 option-card">
                                        <Form.Check
                                            type={optionList.selection_type === 'SINGLE' ? 'radio' : 'checkbox'}
                                            name={optionList.option_list}
                                            label={option.name}
                                            value={option.id}
                                            checked={
                                                optionList.selection_type === 'SINGLE'
                                                    ? formData[optionList.option_list_id] === option.id
                                                    : formData[optionList.option_list_id]?.includes(option.id)
                                            }
                                            onChange={() =>
                                                handleChange(optionList.option_list_id, option.id, optionList.selection_type)
                                            }
                                        />
                                        <span className="surcharge">+ ₹{option.surcharge}</span>
                                    </Card>
                                ))}
                            </Col>
                        </Form.Group>
                    ))}
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>Quantity</Form.Label>
                        <Col sm={8}>
                            <InputGroup>
                                <FormControl
                                    type="number"
                                    step={1}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min={1}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">Add to Cart</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddToCart;
