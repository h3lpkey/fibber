import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import { Card, message, Tooltip } from "antd";
import API from "api";
import SceneForm from "components/SceneForm/SceneForm";
import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateGame, StateQuests, StateScene } from "models/store";
import { memo, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { setQuest, setScene } from "store/actions";
import "./CustomNode.sass";

export default memo(
  ({
    data,
    isConnectable,
  }: {
    data: { label: string; property: TScene; onChange: () => void };
    isConnectable: any;
  }) => {
    const Dispatch = useDispatch();
    const [showStatus, setShowStatus] = useState<boolean>(false);

    const { quest } = useSelector(
      (state: { quest: StateQuests }) => state.quest
    );
    const { scene } = useSelector((state: { scene: StateScene }) => state);
    const { game } = useSelector((state: { game: StateGame }) => state);

    const buttonLinked = (params: any) => {
      const sceneButton = quest.Scenes.find((scene) => {
        return scene.id.toString() === params.source;
      });
      const toScene = quest.Scenes.find((scene) => {
        return scene.id.toString() === params.target;
      });
      if (sceneButton && toScene) {
        const newSceneParams = sceneButton;
        // @ts-ignore: Unreachable code error
        newSceneParams.Buttons[params.sourceHandle].Scene = toScene.id;
        API.scene.updateScene(sceneButton.id, newSceneParams).then(() => {
          API.quest.getQuestById(quest.id).then((questData: TQuest) => {
            Dispatch(setQuest(questData));
            const updateScene = questData.Scenes.find(
              (newScene) => newScene.id.toString() === sceneButton.id.toString()
            );
            Dispatch(setScene(updateScene));
            message.success(`Save success`);
          });
        });
      }
    };

    const Handles = () => {
      if (data.property) {
        return (
          <>
            <Handle
              type="target"
              position={Position.Top}
              style={{ background: "#555", width: 30, height: 30, top: -15 }}
              isConnectable={isConnectable}
            />
            {data.property.ToScenes && (
              <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{
                  left: 0,
                  background: "#8b73fa",
                  width: 30,
                  height: 30,
                  bottom: -15,
                }}
                isConnectable={isConnectable}
              />
            )}
            {data.property.Buttons?.map((Button, index) => {
              if (Button.Text) {
                return (
                  <Handle
                    type="source"
                    position={Position.Bottom}
                    id={index.toString()}
                    key={index.toString()}
                    onConnect={(params) => buttonLinked(params)}
                    style={{
                      left: index * 100 + 100,
                      background: "#555",
                      width: 30,
                      height: 30,
                      bottom: -15,
                    }}
                    isConnectable={isConnectable}
                  >
                    <Tooltip title={Button.Text}>
                      <div className="btn-tooltip">
                        {Button.Text.substr(0, 7)}
                      </div>
                    </Tooltip>
                  </Handle>
                );
              }
            })}
          </>
        );
      } else {
        return (
          <Handle
            type="target"
            position={Position.Top}
            style={{ background: "#555", width: 30, height: 30, top: -15 }}
            isConnectable={isConnectable}
          />
        );
      }
    };

    return (
      <Card
        className="map-card"
        title={data.property.Text}
        extra={
          game.status === "stop" && showStatus ? (
            <EyeOutlined onClick={() => setShowStatus(!showStatus)} />
          ) : (
            <EyeInvisibleOutlined onClick={() => setShowStatus(!showStatus)} />
          )
        }
      >
        {showStatus && <SceneForm data={scene} />}
        <Handles />
      </Card>
    );
  }
);
