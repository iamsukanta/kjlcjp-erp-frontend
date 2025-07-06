import UserMenu from "../dropdown/UserMenu";

const Topbar = () => {
  return (
    <header className="flex justify-end bg-white shadow px-6 py-4">
      <UserMenu />
    </header>
  );
};

export default Topbar;
