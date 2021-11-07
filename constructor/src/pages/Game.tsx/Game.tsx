import { Space, Spin } from "antd";
import API from "api/index";
import Scene from "components/Scene/Scene";
import LayoutBase from "layouts/Base";
import { TQuest } from "models/quest";
import { StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setHeaderText, setMedia, setQuest, setScene } from "store/actions";
import Map from "../../components/Map/Map";
import "./Game.sass";

const Game = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);

  useEffect(() => {
    Dispatch(setHeaderText("Ваши квесты"));
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
        <div className="page page-constructor">
          <div className="page-map">
            <Map />
          </div>
          <div className="page-scenes">
            <Scene />
          </div>
        </div>
      </LayoutBase>
    );
  }

  return <h2>Load</h2>;
};

export default Game;
