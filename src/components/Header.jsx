import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

import logo from "../assets/logo.jpg";

const Header = () => {
  const {cartItems} = useSelector(state => state.cart);
  return (
    <nav>
      <img src={logo} alt="LOGO"/>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>
          <FiShoppingCart />
          <p>{cartItems.length}</p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
