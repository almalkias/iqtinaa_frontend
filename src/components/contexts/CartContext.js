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

  // ✅ ADD
  const addToCart = async (product, buyNow = false) => {
    setIsLoading(true);

    try {
      await apiClient.post('/cart/add/', {
        product: product,
        quantity: 1
      });

      // 🔥 نحدث الكارت من الباك
      fetchCart();

      if (buyNow) navigate('/cart');

    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ REMOVE ITEM بالكامل
  const removeFromCart = async (itemId) => {
    setIsLoading(true);

    try {
      await apiClient.delete(`/cart/${itemId}/delete/`);

      // 🔥 نحدث من الباك
      fetchCart();

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

  // ✅ UPDATE QUANTITY
  const updateCartItem = async (itemId, quantity) => {
    setIsLoading(true);

    try {
      await apiClient.patch(`/cart/${itemId}/update/`, {
        quantity
      });

      fetchCart();

    } catch (error) {
      console.error("Error updating item:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FETCH CART (مهم جدًا نخليه function مستقلة)
  const fetchCart = async () => {
    try {
      const response = await apiClient.get('/cart/');

      setCartItems(response.data.items || []);

    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error);
    }
  };

  // ✅ TOTAL PRICE
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.product.price) * item.quantity,
      0
    );
  };

  // ✅ TOTAL COUNT
  const totalQuantity = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // ✅ INIT
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
