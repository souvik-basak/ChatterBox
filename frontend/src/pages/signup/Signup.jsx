import { Link } from "react-router-dom";
import GenderCheckBox from "../signup/GenderChoiceBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  const handleCheckBoxChange = (gender) => {
    setInput({ ...input, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500"> ChatterBox</span>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={input.fullName}
              required
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              value={input.userName}
              required
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={input.email}
              required
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={input.password}
              required
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={input.confirmedPassword}
              onChange={(e) =>
                setInput({ ...input, confirmedPassword: e.target.value })
              }
              className="input input-bordered w-full h-10"
            />
          </div>
          <div className="flex items-center justify-between">
            <GenderCheckBox
              onCheckboxChange={handleCheckBoxChange}
              selectedGender={input.gender}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              to={"/login"}
              className="hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
