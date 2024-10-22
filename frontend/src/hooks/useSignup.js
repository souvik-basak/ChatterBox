import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    userName,
    password,
    email,
    confirmedPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      email,
      confirmedPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          email,
          confirmedPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  userName,
  password,
  email,
  confirmedPassword,
  gender,
}) {
  if (
    !fullName ||
    !userName ||
    !password ||
    !email ||
    !confirmedPassword ||
    !gender
  ) {
    toast.error("All fields are required");
    return false;
  }
  if (password !== confirmedPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
