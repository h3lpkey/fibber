import { StateGame, StateUI } from "models/store";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import "./Header.sass";

const Navbar = (): ReactElement => {
  const header = useSelector((state: { ui: StateUI }) => state.ui.header);
  const game = useSelector((state: { game: StateGame }) => state.game);

  const GameInfo = () => {
    return <>Game triggers: {game.collectedTriggers}</>;
  };

  return (
    <h2>
      {header.text} {game.status === "play" && <GameInfo />}
    </h2>
  );
};

export default Navbar;
