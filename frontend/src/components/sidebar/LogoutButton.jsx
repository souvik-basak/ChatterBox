import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const {loading, logout} = useLogout()
  return (
    <div className="-mb-3 mt-1">
      <button>
        {!loading ? (
          <BiLogOut
            className="w-6 h-6 cursor-pointer text-white"
            onClick={logout}
          />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </button>
    </div>
  );
}

export default LogoutButton