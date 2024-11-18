import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUser';


function NavigateToHome() {
  return <Navigate to="/"/>;
}

export function PublicOutlet() {
  const user = useCurrentUser();
  return user? <NavigateToHome /> : <Outlet />;
}