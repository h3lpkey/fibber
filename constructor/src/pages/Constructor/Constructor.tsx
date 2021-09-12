import { FlowAnalysisGraph } from "@ant-design/charts";
import { Space, Spin } from "antd";
import API from "api/index";
import Scene from "components/Scene/Scene";
import LayoutBase from "layouts/Base";
import { TQuest } from "models/quest";
import { StateQuests } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setHeaderText, setMedia, setQuest, setScene } from "store/actions";
import "./Constructor.sass";

interface TMapNode {
  id: string;
  value: {
    title: string;
  };
}

interface TMapEdge {
  source: string;
  target: string;
}

interface TMap {
  data: {
    nodes: TMapNode[];
    edges: TMapEdge[];
  };
}

const Constructor = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [questMap, setQuestMap] = useState<TMap>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);

  const questDataToMap = (questData: TQuest): TMap => {
    const nodes: TMapNode[] = [];
    const edges: TMapEdge[] = [];
    questData.Scenes.forEach((scene) => {
      nodes.push({
        id: scene.id.toString(),
        value: {
          title: scene.SceneName,
        },
      });

      scene.Buttons.map((button) => {
        edges.push({
          source: scene.id.toString(),
          target: button.Scene.id.toString(),
        });
      });
    });

    const config = {
      data: {
        nodes,
        edges,
      },
      height: 875,
      nodeCfg: {
        type: "rect",
        anchorPoints: [
          [0.5, 1],
          [0.5, 0],
        ],
        title: {
          style: {
            fill: "#000",
            fontSize: 12,
          },
        },
      },
      edgeCfg: {
        type: "polyline",
        endArrow: {
          fill: "#ccc",
        },
      },
      layout: {
        rankdir: "TB",
      },
    };

    return config;
  };

  useEffect(() => {
    if (quest.hasOwnProperty("Scenes")) {
      const questFormatData = questDataToMap(quest);
      setQuestMap(questFormatData);
    }
  }, [quest]);

  useEffect(() => {
    Dispatch(setHeaderText("Ваши квесты"));
    setLoading(true);
    if (params.questId) {
      API.quest
        .getQuestById(params.questId)
        .then((questData: TQuest) => {
          const questFormatData = questDataToMap(questData);
          setQuestMap(questFormatData);
          Dispatch(setHeaderText(`${questData.Name}`));
          Dispatch(setQuest(questData));
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
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
            <FlowAnalysisGraph
              {...questMap}
              onReady={(graph: any) => {
                graph.on("node:click", (evt: any) => {
                  const item = evt.item._cfg;
                  const scene = quest.Scenes.find(
                    (scene) => scene.id.toString() === item.id
                  );
                  Dispatch(setScene(scene));
                });
              }}
            />
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

export default Constructor;
