import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './App.css';

interface Product {
  name: string;
  description: string;
  price: string | number;
  status: string | number;
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://auth-rg69.onrender.com/api/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>loading.....</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container product-container">
      <div className="product-detail">
        <div className="product-detail-inner">
          <h3>Name: {product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Status: {product.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
