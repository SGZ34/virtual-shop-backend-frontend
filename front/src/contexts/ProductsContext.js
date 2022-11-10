import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("No existe un contexto de productos");
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    getData();
  }, []);

  const getProduct = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );

    if (!!data) {
      return data;
    }
  };

  const buyProducts = (productsToBuy) => {
    productsToBuy.forEach((p) => {
      setProducts(
        products.map((product) =>
          p._id === product._id
            ? { ...product, stock: product.stock - p.cantidad }
            : product
        )
      );
    });
  };
  return (
    <ProductsContext.Provider value={{ products, getProduct, buyProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
