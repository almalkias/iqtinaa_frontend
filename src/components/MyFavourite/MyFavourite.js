import React, { useContext } from "react";
import { FavouritePaintContext } from "../contexts/FavouritePaintContext";
import PaintCard from "../PaintCard/PaintCard";
import "./MyFavourite.css";

function MyFavourite() {
  const { favouritePaints } = useContext(FavouritePaintContext);

  // Guard against non-array values
  const paints = Array.isArray(favouritePaints) ? favouritePaints : [];

  return (
    <div className='my-favourite'>

      {paints.length > 0 ? (
        <div className='paint-cards'>
          {paints.map((paint) => (
            <PaintCard key={paint.id} paint={paint} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>لا يوجد مفضلة</h3>
        </div>
      )}

    </div>
  );
}

export default MyFavourite;
