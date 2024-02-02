import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loginNoUser,
} from "../auth/slice";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../server";

function useInitSession() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(loginStart());
    axios
      .post(
        serverUrl("/validate-session"),
        {},
        {
          withCredentials: true,
        }
      )
      .then((i) => {
        if (i.data.done) {
          dispatch(loginSuccess({ name: i.data.name, email: i.data.email }));
        } else dispatch(loginNoUser());
      })
      .catch(() => dispatch(loginFailure()));
  }, []);

  const logoutUser = () => {
    dispatch(logout());
  };

  return { isAuthenticated, user, loading, error, logoutUser };
}

export default useInitSession;
