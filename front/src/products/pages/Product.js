import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { useCart, useProducts } from "../../contexts";
import { generateStars } from "../../helpers";
import { setSuccess } from "../../store/slices";

export const Product = () => {
  const [product, setProduct] = useState({});
  const haveStock = product.countInStock > 0;

  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const dispatch = useDispatch();

  const add = (product) => {
    const result = addToCart({ product, cantidad: 1 });
    if (result)
      dispatch(setSuccess("Producto añadido correctamente al carrito"));
  };

  useEffect(() => {
    (async () => {
      const productGet = await getProduct(id);
      setProduct(productGet);
    })();
  }, [id, getProduct]);

  return (
    <div className="container-product">
      <div className="container-imgs-product">
        <img
          src={`http://localhost:5000${product?.image}`}
          alt={product?.description}
          className="product-img"
        />
      </div>
      <div className="container-text-product">
        <div className="section-text-product">
          <h4>Producto</h4>
          <p>{product?.name}</p>
        </div>

        <div className="section-text-product">
          <h4>Categoría</h4>
          <p>{product?.category}</p>
        </div>

        <div className="section-text-product section-price">
          <h4>Precio</h4>

          <p className="original-price">${product?.price}</p>
        </div>
        <div className="section-text-product">
          <h4>Descripción del producto</h4>
          <p>{product?.description}</p>
        </div>

        <div className="section-text-product">
          <h4>Calificación</h4>
          <p>
            {generateStars(product?.rating)}
            {`(${product?.numReviews})`}
          </p>
        </div>
        {haveStock ? (
          <button className="add-to-cart" onClick={() => add(product)}>
            Añadir al carrito
          </button>
        ) : (
          <div className="section-text-product text-not-stock">
            <h4>Este producto no tiene stock</h4>
            <Link className="go-to-products" to="/products">
              Ir a ver otros productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
