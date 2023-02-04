import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/products/");
      setProducts(result.data);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} ({product.code})
        </li>
      ))}
    </ul>
  );
};

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8000/api/products/${match.params.id}/`
      );
      setProduct(result.data);
    };

    fetchData();
  }, [match.params.id]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Code: {product.code}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ProductList />
      <Route path="/products/:id" component={ProductDetail} />
    </div>
  );
};

export default App;
