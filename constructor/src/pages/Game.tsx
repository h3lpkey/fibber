import { Space, Spin } from "antd";
import API from "api/index";
import GameScene from "components/GameScene/GameScene";
import Map from "components/Map/Map";
import LayoutBase from "layouts/Base";
import { TQuest } from "models/quest";
import { StateQuests } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setGamePlay, setHeaderText, setMedia, setQuest } from "store/actions";
import "./Game.sass";

const Game = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);

  useEffect(() => {
    Dispatch(setGamePlay());
    setLoading(true);
    if (params.questId) {
      API.quest.getQuestById(params.questId).then((questData: TQuest) => {
        Dispatch(setHeaderText(`${questData.Name}`));
        Dispatch(setQuest(questData));
        setLoading(false);
      });
    }
    API.media.getAllMedia().then((media) => {
      Dispatch(setMedia(media));
    });
  }, []);

  if (isLoading) {
    return (
      <LayoutBase>
        <div className="page page-scenes">
          <Space align="center">
            <Spin size="large" />
          </Space>
        </div>
      </LayoutBase>
    );
  }

  if (quest) {
    return (
      <LayoutBase>
        <div className="page page-game">
          <div className="page-map">
            <Map />
          </div>
          <div className="page-scenes">
            <GameScene />
          </div>
        </div>
      </LayoutBase>
    );
  }

  return <h2>Load</h2>;
};

export default Game;
