import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Card, Space, Spin } from "antd";
import API from "api/index";
import LayoutBase from "layouts/Base";
import { TQuest } from "models/quest";
import { StateQuests } from "models/store";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setHeaderText, setQuests } from "store/actions";
import "./Quests.sass";
const Quests = (): ReactElement => {
  const Dispatch = useDispatch();
  const { quests, isLoading } = useSelector(
    (state: { quest: StateQuests }) => state.quest
  );

  useEffect(() => {
    Dispatch(setHeaderText("Ваши квесты"));
    API.quest
      .getQuests()
      .then((quests: TQuest[]) => {
        Dispatch(setQuests(quests));
        Dispatch(setHeaderText(`Ваши квесты (${quests.length})`));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading) {
    return (
      <LayoutBase>
        <div className="page page-quests">
          <Space align="center">
            <Spin size="large" />
          </Space>
        </div>
      </LayoutBase>
    );
  }

  return (
    <LayoutBase>
      <div className="page page-quests">
        <Space direction="vertical">
          {quests.map((Quest) => {
            return (
              <Card
                key={Quest.id}
                title={Quest.Name}
                extra={
                  <Space>
                    <Link to={`/constructor/${Quest.id}`}>Открыть</Link>
                    <Link to={`/game/${Quest.id}`}>Играть</Link>
                  </Space>
                }
                className="quest"
              >
                <p>Сцен: {Quest.Scenes.length}</p>
                <p>
                  Глобальные стили:
                  {Quest.DefaultStyles ? (
                    <CheckSquareOutlined />
                  ) : (
                    <CloseSquareOutlined />
                  )}
                </p>
                <p>Дата создания: {Quest.created_at}</p>
                <p>Дата обновления: {Quest.updated_at}</p>
                <p>Дата публикации: {Quest.published_at}</p>
              </Card>
            );
          })}
        </Space>
      </div>
    </LayoutBase>
  );
};

export default Quests;
