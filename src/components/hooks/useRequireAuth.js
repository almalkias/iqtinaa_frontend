import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useRequireAuth = (isLoggedIn) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true, state: { from: location.pathname } });
        }
    }, [isLoggedIn, navigate, location.pathname]);
};

export default useRequireAuth;
