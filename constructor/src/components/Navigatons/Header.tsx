import { StateUI } from "models/store";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import "./Header.sass";

const Navbar = (): ReactElement => {
  const header = useSelector((state: { ui: StateUI }) => state.ui.header);
  return <h2>{header.text}</h2>;
};

export default Navbar;
