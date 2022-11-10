import { useState } from "react";
import { Link } from "react-router-dom";
import { generateStars } from "../helpers";

export const CardProduct = ({ product }) => {
  const haveStock = product.countInStock === 0;
  const [showStock, setShowStock] = useState(false);

  const handleMouseLeave = () => {
    setShowStock(false);
  };
  const handleMouseOver = () => {
    setShowStock(true);
  };
  return (
    <Link
      to={`/products/${product?._id}`}
      className="card-product"
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
    >
      {haveStock && (
        <div className={`container-not-stock ${showStock ? "show-stock" : ""}`}>
          <h3>Este producto no tiene stock</h3>
        </div>
      )}
      <img
        src={`http://localhost:5000${product.image}`}
        alt={`${product?.name}`}
      />
      <div className="content-card-product">
        <div className="section-card">
          <p>{product?.brand}</p>
        </div>

        <div className="section-card ">
          <p>{product.name}</p>
        </div>

        <div className="section-card ">
          <p>{product.category}</p>
        </div>

        <div className="section-card">
          <p className="product-description">
            {product?.description.slice(0, 50)}
          </p>
        </div>

        <div className="section-card">
          <div>
            <span className="">
              <strong>Precio: </strong> ${product?.price}
            </span>
          </div>
        </div>

        <div className="section-card">
          <h4>Calificación</h4>
          <p>
            <span>
              {generateStars(product?.rating)}
              {`(${product?.numReviews})`}
            </span>
          </p>
        </div>

        <div className="section-card">
          <h4>Opiniones</h4>
          <p></p>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn-buy-product">Ver más</button>
      </div>
    </Link>
  );
};
