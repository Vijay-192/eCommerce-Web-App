import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token"); // optional
  };

  return { logout, loading, error };
};

export default useLogout;
   