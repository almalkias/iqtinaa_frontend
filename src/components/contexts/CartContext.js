import { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../../api/client";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from '../contexts/LoadingContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  // Add item
  const addToCart = async (productId, buyNow = false) => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.product.id === productId
    );

    if (isAlreadyInCart) {
      if (buyNow) navigate('/cart');
      return { status: "exists" };
    }

    setIsLoading(true);

    try {
      await apiClient.post('/cart/add/', {
        product: productId,
        quantity: 1
      });
      await fetchCart();
      if (buyNow) navigate('/cart');
      return { status: "added" };
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      return { status: "error" };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove the full item
  const removeFromCart = async (itemId) => {
    setIsLoading(true);

    try {
      await apiClient.delete(`/cart/${itemId}/delete/`);
      // Refresh the cart from the backend
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);

    try {
      await apiClient.delete("/cart/clear/");
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error);
      await fetchCart();
    } finally {
      setIsLoading(false);
    }
  };

  // Update quantity
  const updateCartItem = async (itemId, quantity) => {
    setIsLoading(true);

    try {
      await apiClient.patch(`/cart/${itemId}/update/`, {
        quantity
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating item:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the cart in a separate function
  const fetchCart = async () => {
    try {
      const response = await apiClient.get('/cart/');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error);
    }
  };

  // Total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.product.price) * item.quantity,
      0
    );
  };

  // Total count
  const totalQuantity = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // Initialize cart state
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetchCart().finally(() => setIsLoading(false));
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem,
        getCartTotal,
        totalQuantity,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
