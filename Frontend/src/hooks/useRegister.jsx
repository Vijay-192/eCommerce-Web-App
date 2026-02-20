import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { registerUser, resetState } from "../redux/userSlice";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // success / error effect
  useEffect(() => {
    if (success) {
      toast.success("Registered successfully");
      navigate("/verify");
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
