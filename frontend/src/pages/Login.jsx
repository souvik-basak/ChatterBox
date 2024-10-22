import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {loading, login} = useLogin();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await login(userName,password);
  }
  return (
    <div className="flex flex-col item-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center ">
          Login
          <span className="text-blue-700"> ChatterBox</span>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full h-10"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/signup"
              className="hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
