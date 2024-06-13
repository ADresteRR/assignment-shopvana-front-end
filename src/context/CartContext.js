import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [tempUserId, setTempUserId] = useState(null);

    const getTempUserId = async () => {
        try {


            let userId = sessionStorage.getItem('temporary_user_id');
            if (!userId) {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/get-user-id`);
                const userId = result.data.temporary_user_id;
                sessionStorage.setItem('temporary_user_id', userId);
            }
            userId = sessionStorage.getItem('temporary_user_id');
            setTempUserId(userId);
            return userId;



        } catch (err) {
            console.log(err);
        }
    }
    const getCartItems = async () => {
        try {
            const userId = await getTempUserId();
            const results = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/get-cart-items/${userId}`);
            setCartItems(results.data.cart_items);

        } catch (err) {
            console.log(`error while fetching cart items from server ${err}`);
        }
    }
    const addToCart = async (item, quanity, product_id) => {
        try {
            const userId = await getTempUserId();
            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders/add-to-cart`, {
                "product_id": product_id,
                "selected_options": item,
                "quantity": quanity,
                "temporary_user_id": userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await getCartItems();

        } catch (err) {
            console.log(`error in adding item into cart`)
        }
    };

    const removeFromCart = async (itemId) => {
        // TODO: logic to remove item from cart
        try {
            const userId = await getTempUserId();
            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders/remove-from-cart`, {
                "cart_item_id": itemId,
                "temporary_user_id": userId

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await getCartItems();
        } catch (err) {
            console.log(`error in removing item from cart`);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItems, tempUserId, getTempUserId, getCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
