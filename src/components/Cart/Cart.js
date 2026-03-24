import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import trash from "../../assets/images/trash.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import useRequireAuth from "../hooks/useRequireAuth";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateCartItem,
    getCartTotal
  } = useContext(CartContext);

  const { isLoggedIn } = useContext(AuthContext);

  useRequireAuth(isLoggedIn);


  return (
    <div className="cart">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
          <img src={title} alt="" />
        </Link>
      </div>

      <hr />

      <h3>السلة</h3>

      {cartItems.length > 0 ? (
        <div className="cart-container">

          {/* LEFT */}
          <div className="cart-item-details">
            {cartItems.map((item) => (
              <div className="box" key={item.id}>

                {/* INFO */}
                <div className="cart-item-info">
                  <Link to={`/paint-details/${item.product.id}`}>
                    <img src={item.product.image} alt="" />
                  </Link>

                  <div>
                    <h3>{item.product.name}</h3>
                    <div id="descrption">لوحة</div>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="cart-item-quantity">

                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    onClick={() =>
                      updateCartItem(item.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>

                </div>

                {/* PRICE */}
                <div className="cart-item-price">
                  <h3>{item.product.price} ر.س</h3>

                  <div className="icons">
                    <img
                      src={trash}
                      alt=""
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="cart-price-details">

            {cartItems.map((item) => (
              <div className="row" key={item.id}>
                <h3>
                  {item.product.name}
                  <span> {item.quantity}</span>
                  <span>X</span>
                </h3>

                <h3>
                  {Number(item.product.price) * item.quantity} ر.س
                </h3>
              </div>
            ))}

            <div className="row">
              <h3>رسوم التوصيل</h3>
              <div>مجانا</div>
            </div>

            <hr />

            <form>
              <input type="text" placeholder="كوبون الخصم" />
              <input type="submit" value="تطبيق" />
            </form>

            <div className="row">
              <h3>المجموع</h3>
              <h3>{getCartTotal()} ر.س</h3>
            </div>

            <Link to={'/payment'}>
              <button className="btn">الدفع</button>
            </Link>

          </div>

        </div>
      ) : (
        <div className="empty-cart">
          <h3>السلة فارغة</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
