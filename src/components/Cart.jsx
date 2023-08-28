import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );

  const increment = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculations" });
  };
  const decrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity === 1) {
      dispatch({ type: "delete", payload: id });
      dispatch({ type: "calculations" });
    } else dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculations" });
  };
  const deleteHandler = (id) => {
    dispatch({ type: "delete", payload: id });
    dispatch({ type: "calculations" });
  };

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              imgsrc={i.imgsrc}
              id={i.id}
              name={i.title}
              price={i.price}
              qty={i.quantity}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>Cart is Empty!</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: Rs.{subTotal}</h2>
        <h2>Shipping: Rs.{shipping}</h2>
        <h2>Tax: Rs.{tax}</h2>
        <h2>Total: Rs.{total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgsrc,
  id,
  title,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
}) => (
  <div className="cartItem">
    <img src={imgsrc} alt={title} />
    <article>
      <h3>{title}</h3>
      <p>Rs.{price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;
