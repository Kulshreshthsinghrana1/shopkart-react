import { useState, useEffect } from "react";
import "../styles/Admin.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = () => {
    if (!title || !price) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        title,
        price,
      },
    ]);

    setTitle("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      <div className="admin-form">
        <input
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>₹ {p.price}</td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
