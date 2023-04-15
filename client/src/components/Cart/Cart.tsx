import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Contacts from "../Contact/Contacts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Cart.module.css";
import deleteLogo from "../../image/delete.png";
import { changeCountProduct, removeOrder } from "../../store/cart";

const Cart = () => {
  const { order } = useAppSelector((state) => state.cart);
  const { email, token } = useAppSelector((state) => state.auth);
  const [counts, setCounts] = useState(order.map((el) => el.count));
  const dispatch = useAppDispatch();
  const handleCountChange = (index: number, value: number, id: string) => {
    const newCounts = [...counts];
    newCounts[index] = value;
    setCounts(newCounts);
    dispatch(changeCountProduct({id: id, count: value}))
  };
  console.log(order)
const deleteProduct = (id: string)=>{
dispatch(removeOrder(id))
}

  return (
    <div className={style.cart_block}>
      <Header email={email} token={token} />
      {order.length < 1 ? (
        <div>
          <p>Your don't have products for order</p>
        </div>
      ) : (
        <div className={style.cart_container}>
          <h2>Your products for order:</h2>
          <table className={style.cart_table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Brand</th>
                <th>Title</th>
                <th>Count</th>
                <th>Price</th>
                <th>Total price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {order.map((el, index) => (
                <tr key={el.id} className={style.cart_row}>
                  <td>{index + 1}</td>
                  <td>{el.brand}</td>
                  <td>{el.title}</td>
                  <td>{el.price} $</td>
                  <td>
                     <section>
                    <button
                      onClick={() =>
                        handleCountChange(
                          index,
                          counts[index] <= 1 ? 1 : counts[index] - 1,
                          el.id
                        )
                      }
                    >
                      -
                    </button>
                    <p>{counts[index]}</p>
                    <button
                      onClick={() =>
                        handleCountChange(index, counts[index] + 1, el.id)
                      }
                    >
                      +
                    </button>
                    </section>
                  </td>
                  <td>{counts[index] * el.price} $</td>
                  <td onClick={()=>deleteProduct(el.id)}><img src={deleteLogo} alt="Basket for delete"/></td>
                </tr>
              ))}
              <tr>
                <td colSpan={6}></td>
                <td>
                  Total:{" "}
                  {order.reduce(
                    (acc: number, el: { price: number; }, index: number) => acc + counts[index] * el.price,
                    0
                  )} $
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div>
        <Contacts />
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
