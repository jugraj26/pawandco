import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// LocalStorage key
const CART_STORAGE_KEY = 'pawandco_cart_items';

export const CartProvider = ({ children }) => {
  // Initialize cart state from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to read cart from LocalStorage:', error);
      return [];
    }
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart items with LocalStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to LocalStorage:', error);
    }
  }, [cartItems]);

  // Show a temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add an item to the cart
  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        // Product already exists in cart -> increase quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd
        };
        return updated;
      } else {
        // Product is new to cart -> add it
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: qtyToAdd
          }
        ];
      }
    });

    triggerToast(`Added ${product.name} to cart! 🐾`);
  };

  // Update item quantity (e.g. from +/- buttons)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item entirely from the cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    triggerToast('Item removed from cart');
  };

  // Clear the whole cart (e.g. after successful order)
  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Computed values
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Delivery fee: Free if subtotal >= ₹999, else ₹99 (if cart has items)
  const deliveryFee = cartItems.length === 0 ? 0 : subtotal >= 999 ? 0 : 99;

  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        grandTotal,
        toastMessage
      }}
    >
      {children}
      {toastMessage && (
        <div className="toast-msg">
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
