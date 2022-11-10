import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setError, setSuccess } from "../store/slices";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("No existe un contexto del carrito");
  return context;
};

const inititialState = JSON.parse(localStorage.getItem("cart")) ?? [];
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(inititialState);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const { buyProducts, products } = useProducts();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalOfAll = 0;

    cart.forEach((p) => {
      totalOfAll += parseFloat(p.price * p.cantidad);
    });
    setTotal(parseFloat(totalOfAll.toFixed(2)));
  }, [cart]);

  const substract = ({ product, cantidad }) => {
    const validateProduct = cart.find((p) => p._id === product._id);

    if (validateProduct) {
      if (
        validateProduct.cantidad - cantidad === 0 ||
        validateProduct.cantidad - cantidad < 0
      ) {
        setCart(cart.filter((p) => p._id !== product._id));
        return;
      }
      setCart(
        cart.map((p) =>
          p._id === product._id ? { ...p, cantidad: p.cantidad - cantidad } : p
        )
      );
    }
  };

  const addToCart = ({ product, cantidad }) => {
    const validateProduct = cart.find((p) => p._id === product._id);
    const { countInStock } = products.find((p) => p._id === product._id);

    if (!validateProduct) {
      cantidad <= countInStock && setCart([...cart, { ...product, cantidad }]);
      dispatch(setSuccess("Producto añadido correctamente al carrito"));
      return;
    }

    if (validateProduct.cantidad + cantidad > countInStock) {
      dispatch(
        setError(
          `Ya no hay más stock disponible del producto ${validateProduct.name}`
        )
      );
      return;
    }

    setCart(
      cart.map((p) =>
        p._id === product._id ? { ...p, cantidad: p.cantidad + cantidad } : p
      )
    );
    return true;
  };

  const clearProduct = (id) => {
    const validateProduct = cart.find((p) => p._id === id);
    if (validateProduct) {
      setCart(cart.filter((p) => p._id !== id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const buy = ({ name, pay }) => {
    buyProducts(cart);
    clearCart();
    dispatch(
      setSuccess(
        `${name} gracias por tu compra ${
          pay > total
            ? `su devuelta es de $${parseFloat((pay - total).toFixed(2))}`
            : ``
        }`
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        elementsInCart: cart.length,
        clearCart,
        substract,
        clearProduct,
        total,
        buy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
