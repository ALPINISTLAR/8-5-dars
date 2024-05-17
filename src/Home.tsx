import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // price ni string sifatida saqlash
  status: string; // rating ni string sifatida saqlash
  brand: string;
  // Qo'shimcha ma'lumotlar uchun kerakli xususiyatlar
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: "", // price ni string sifatida saqlash
    status: "", // rating ni string sifatida saqlash
    brand: ""
  });

  const getProducts = async () => {
    try {
      const res = await fetch('https://auth-rg69.onrender.com/api/products/all');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const createProduct = async () => {
    try {
      const res = await fetch('https://auth-rg69.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setProducts([...products, data]);
      setNewProduct({ id: "", name: "", description: "", price: "", status: "", brand: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="new-product">
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Product Description"
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Product Price"
        />
        <input
          type="text"
          value={newProduct.status}
          onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
          placeholder="Product Status"
        />
        <input
          type="text"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          placeholder="Product Brand"
        />
        <button onClick={createProduct}>Add Product</button>
      </div>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <Link key={product.id} to={`/blog/${product.id}`} style={{ textDecoration: 'none' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
