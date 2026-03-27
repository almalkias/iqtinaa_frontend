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
                {/* <div className="cart-item-quantity">

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

                </div> */}

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
            <div className="summary-header">
              <h3>ملخص الطلب</h3>
              <p>مراجعة سريعة للعناصر قبل إتمام الدفع</p>
            </div>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="row summary-item" key={item.id}>
                  <div className="summary-item-info">
                    <h4>{item.product.name}</h4>
                    <span>الكمية: {item.quantity}</span>
                  </div>

                  <h4>{Number(item.product.price) * item.quantity} ر.س</h4>
                </div>
              ))}
            </div>

            <div className="row summary-row">
              <h4>رسوم التوصيل</h4>
              <span className="delivery-badge">مجانا</span>
            </div>

            <hr />

            <form className="coupon-form">
              <input type="text" placeholder="كوبون الخصم" />
              <input type="submit" value="تطبيق" />
            </form>

            <div className="row total-row">
              <div>
                <h3>المجموع</h3>
                <p>شامل جميع العناصر في السلة</p>
              </div>
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
