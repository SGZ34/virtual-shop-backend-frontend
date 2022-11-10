import alertify from "alertifyjs";
import React from "react";
import { useCart } from "../contexts";

export const Row = ({ product }) => {
  const { addToCart, substract, clearProduct } = useCart();

  const handleClear = ({ _id, name }) => {
    alertify.confirm(
      "Eliminar producto",
      `¿Deseas eliminar este producto: ${name}?`,
      function () {
        clearProduct(_id);
      },
      function () {
        return;
      }
    );
  };

  const subtotal = parseFloat((product.price * product.cantidad).toFixed(2));

  return (
    <tr>
      <td className="text-center">{product.name}</td>
      <td className="container-img-cart">
        <img
          className="img-cart-row"
          src={`http://localhost:5000${product.image}`}
          alt={product.description}
        />
      </td>
      <td className="text-center">{product.cantidad}</td>
      <td>{product.description.slice(0, 40)}...</td>
      <td> {product.category}</td>
      <td className="text-center">{product.price}</td>
      <td className="text-center"> {subtotal}</td>
      <td className="text-center">
        <button
          className="actions-cart-btn delete"
          onClick={() => {
            substract({ product, cantidad: 1 });
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <button
          className="actions-cart-btn add"
          onClick={() => addToCart({ product, cantidad: 1 })}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <button
          className="actions-cart-btn delete"
          onClick={() => handleClear(product)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
