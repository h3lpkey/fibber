import { Descriptions, Space, Tag } from "antd";
import { StateGame, StateUI } from "models/store";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeGameTrigger } from "store/actions";
import "./Header.sass";

const Navbar = (): ReactElement => {
  const Dispatch = useDispatch();
  const header = useSelector((state: { ui: StateUI }) => state.ui.header);
  const game = useSelector((state: { game: StateGame }) => state.game);
  const removeTrigger = (trigger: string) => {
    Dispatch(removeGameTrigger(trigger));
  };

  const GameInfo = () => {
    return (
      <>
        {game.collectedTriggers.map((trigger, index) => {
          return (
            <Tag
              key={`${trigger}-${index}`}
              closable
              onClose={() => {
                removeTrigger(trigger);
              }}
            >
              {trigger}
            </Tag>
          );
        })}
      </>
    );
  };

  return (
    <Descriptions>
      <Descriptions.Item>{header.text}</Descriptions.Item>
      {game.status === "play" && (
        <Descriptions.Item label="Triggers">
          <GameInfo />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default Navbar;
