import Search from "./Search";
import Logo from "./Logo";
import FoundResult from "./FoundResult";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <FoundResult />
    </nav>
  );
}
