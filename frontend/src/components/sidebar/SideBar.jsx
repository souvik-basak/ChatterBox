import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const SideBar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <div className="flex-grow overflow-y-auto">
        <Conversations />
      </div>
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};

export default SideBar;
