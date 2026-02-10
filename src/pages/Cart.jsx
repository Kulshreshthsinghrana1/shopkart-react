import "../styles/Cart.css";

function Cart({ cart, setCart }) {

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2 style={{ padding: "20px" }}>🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>₹ {item.price}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Subtotal</h3>
        <p>₹ {totalPrice.toFixed(2)}</p>
        <button className="checkout-btn">
          Proceed to Buy
        </button>
      </div>
    </div>
  );
}

export default Cart;
