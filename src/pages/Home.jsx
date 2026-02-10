import { useEffect, useState } from "react";
import "../styles/Home.css";

function Home({ cart, setCart, search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products">
      {filteredProducts.map(product => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>₹ {Math.round(product.price * 80)}</p>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
