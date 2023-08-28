/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios.get("https://fakestoreapi.com/products").then((res) => {
        setData(res.data);
      });
    };
    fetch();
  }, []);

  const addToCartHandler = (option) => {
    dispatch({ type: "addToCart", payload: option });
    dispatch({ type: "calculations" });
    toast.success("Added to cart");
  };

  return (
    <div className="home">
      {data.map((product, index) => (
        <ProductCard
          key={index}
          id={product.id}
          title={product.category}
          imgsrc={product.image}
          price={Math.ceil(product.price)}
          handler={addToCartHandler}
        />
      ))}
      
    </div>
  );
};

const ProductCard = ({ id, title, imgsrc, price, handler }) => {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", bounce: 0.6 }}
    >
      <img src={imgsrc} alt={title} />
      <p>{title}</p>
      <h4>Rs.{price}</h4>
      <button
        onClick={() => handler({ id, title, imgsrc, price, quantity: 1 })}
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default Home;
