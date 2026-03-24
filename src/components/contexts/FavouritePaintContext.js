import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../../api/client';
import { AuthContext } from './AuthContext';
import { useLoading } from '../contexts/LoadingContext';

export const FavouritePaintContext = createContext();

export const FavouritePaintProvider = ({ children }) => {
  const [favouritePaints, setFavouritePaints] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoading } = useLoading();

  // ✅ ADD (Optimistic UI)
  const addFavouritePaint = async (paint) => {

    // 🔥 Update immediately
    setFavouritePaints(prev => {
      if (prev.some(p => p.id === paint.id)) return prev;
      return [...prev, paint];
    });

    try {
      await apiClient.post(`/favourites/${paint.id}/`);
    } catch (error) {
      console.error('Error adding favorite paint:', error);

      // ❌ rollback
      setFavouritePaints(prev =>
        prev.filter(p => p.id !== paint.id)
      );
    }
  };

  // ✅ REMOVE (Optimistic UI)
  const removeFavouritePaint = async (paintId) => {

    const previous = [...favouritePaints];

    // 🔥 Update immediately
    setFavouritePaints(prev =>
      prev.filter(p => p.id !== paintId)
    );

    try {
      await apiClient.delete(`/favourites/${paintId}/`);
    } catch (error) {
      console.error('Error removing favorite paint:', error);

      // ❌ rollback
      setFavouritePaints(previous);
    }
  };

  // ✅ GET ALL (🔥 key change here)
  useEffect(() => {
    const fetchFavouritePaints = async () => {
      if (!isLoggedIn) return;

      setIsLoading(true);

      try {
        const response = await apiClient.get('/favourites/');

        // ✅ Use only the results array
        setFavouritePaints(response.data.results || []);

      } catch (error) {
        console.error('Error fetching favorite paints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavouritePaints();
  }, [isLoggedIn]);

  return (
    <FavouritePaintContext.Provider
      value={{
        favouritePaints,
        addFavouritePaint,
        removeFavouritePaint
      }}
    >
      {children}
    </FavouritePaintContext.Provider>
  );
};
