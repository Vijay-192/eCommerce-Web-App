import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginUser, resetState } from "../redux/userSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (success) {
      toast.success("Logged in successfully");
      navigate("/");
      dispatch(resetState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
  }, [success, error, navigate, dispatch]);

  return {
    formData,
    handleChange,
    submitHandler,
    loading,
  };
};
