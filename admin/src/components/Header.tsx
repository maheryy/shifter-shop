import { useLayoutContext } from "../hooks/context";

const Header = () => {
  const { toggleSidebar } = useLayoutContext();

  return (
    <header className="z-20 bg-slate-100">
      <h1>Header</h1>
      <button aria-label="Sidebar menu" onClick={toggleSidebar}>Toggle</button>
    </header>
  );
};

export default Header;
