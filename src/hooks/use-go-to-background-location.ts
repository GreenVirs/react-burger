import { useLocation, useNavigate } from 'react-router';
import { routeHome } from '../components/app-router/app-router';

export const useGoToBackgroundLocation = (fallback = routeHome) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return () => {
    navigate(state?.backgroundLocation || fallback);
  };
};
