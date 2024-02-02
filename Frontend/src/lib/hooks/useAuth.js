import { useSelector } from "react-redux";

function useAuth() {
  const { isAuthenticated, user, loading, initialized } = useSelector(
    (state) => state.auth
  );
  return { isAuthenticated, user, loading, initialized };
}

export default useAuth;
