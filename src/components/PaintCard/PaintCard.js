import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import shield_tick_left from '../../assets/images/chevron-left-2.svg';
import shield_tick_down from '../../assets/images/chevron-down-2.svg';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from "../contexts/AuthContext";
import { FavouritePaintContext } from "../contexts/FavouritePaintContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solid_heart } from '@fortawesome/free-solid-svg-icons';
import "./PaintCard.css";

function PaintCard({ paint }) {
  const [showDescription, setShowDescription] = useState(false);

  const { favouritePaints, addFavouritePaint, removeFavouritePaint } = useContext(FavouritePaintContext);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const paintDescription = paint.description || "لا يوجد وصف متاح لهذه اللوحة حالياً.";
  const paintSize =
    paint.width && paint.height
      ? `${paint.width}*${paint.height} انش`
      : "غير محدد";
  const paintDate = paint.date || "غير متوفر";

  // Compute this directly
  const isFavourite = favouritePaints.some(p => p.id === paint.id);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCartClick = (item, buyNow) => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
    } else {
      addToCart(item, buyNow);
    }
  };

  // Toggle the favorite item
  const toggleHeart = () => {
    if (isFavourite) {
      removeFavouritePaint(paint.id);
    } else {
      addFavouritePaint(paint); // Send the full object
    }
  };

  return (
    <div className='paint-card-container'>
      <div className="paint-image-container">
        {/* <Link to={`/paint-details/${paint.id}`} > */}
        <img id="paint-photo" src={paint.image} alt="" />
        {/* </Link> */}

        {!isFavourite ? (
          <FontAwesomeIcon
            icon={faHeart}
            className="heart-icon"
            onClick={toggleHeart}
          />
        ) : (
          <FontAwesomeIcon
            icon={solid_heart}
            className="heart-icon solid-heart"
            onClick={toggleHeart}
          />
        )}
      </div>

      <div className="paint-info">
        <div>
          <h3>{paint.name}</h3> {/* Use name instead of title */}
        </div>
        <div className="price">{paint.price} ريال</div>
      </div>

      <div className="paint-description" onClick={toggleDescription}>
        {showDescription ? (
          <>
            <div className="toggle-content">
              أقرا الوصف
              <img src={shield_tick_down} alt="" />
            </div>

            <div className="description">
              <p>{paintDescription}</p>
            </div>

            <div className="size">
              <p>حجم اللوحة</p>
              {paintSize}
            </div>

            <div className="date">
              <p>نشرت منذ</p>
              {paintDate}
            </div>
          </>
        ) : (
          <div className="toggle-content">
            أقرا الوصف
            <img src={shield_tick_left} alt="" />
          </div>
        )}
      </div>

      <div className="btns">
        <button onClick={() => handleAddToCartClick(paint.id, true)}>
          اشترِ الآن
        </button>
        <button onClick={() => handleAddToCartClick(paint.id, false)}>
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}

export default PaintCard;
