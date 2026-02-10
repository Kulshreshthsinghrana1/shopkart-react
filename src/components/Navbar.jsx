import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ cart, search, setSearch }) {

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopKart
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link to="/cart" className="cart">
        🛒
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
