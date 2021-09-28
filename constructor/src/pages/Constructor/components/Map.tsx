import { FlowAnalysisGraph } from "@ant-design/charts";
import { Space, Spin } from "antd";
import API from "api/index";
import LayoutBase from "layouts/Base";
import { TQuest } from "models/quest";
import { StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setHeaderText, setMedia, setQuest, setScene } from "store/actions";

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

const Map = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [questMap, setQuestMap] = useState<TMap>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sceneId, setSceneId] = useState<number>(0);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);

  const questDataToMap = (questData: TQuest): TMap => {
    const nodes: TMapNode[] = [];
    const edges: TMapEdge[] = [];
    console.log("questData", questData);
    questData.Scenes.forEach((sceneObj) => {
      console.log("sceneObj", sceneObj);
      const text = sceneObj.Text;
      const words = text.split(" ");
      const firstWords = `${words[0]} ${words[1]} ${words[2]} ${words[3]} ${words[4]}`;
      nodes.push({
        id: sceneObj.id.toString(),
        value: {
          title: firstWords,
        },
      });

      sceneObj.Buttons.map((button) => {
        if (button.Scene.id) {
          edges.push({
            source: sceneObj.id.toString(),
            target: button.Scene.id.toString(),
          });
        }
      });
    });
    const config = {
      data: {
        nodes,
        edges,
      },
      height: 875,
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
      setLoading(true);
      setQuestMap(questDataToMap(quest));
      setLoading(false);
    }
  }, [scene]);

  useEffect(() => {
    setLoading(true);
    if (params.questId) {
      API.quest
        .getQuestById(params.questId)
        .then((questData: TQuest) => {
          setQuestMap(questDataToMap(questData));
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
      <Space align="center">
        <Spin size="large" />
      </Space>
    );
  }

  if (quest) {
    return (
      <FlowAnalysisGraph
        {...questMap}
        nodeCfg={{
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
          style: (node: any) => {
            return node.id === sceneId.toString()
              ? {
                  fill: "#91d5ff",
                  stroke: "#91d5ff",
                }
              : {};
          },
        }}
        onReady={(graph: any) => {
          graph.on("node:click", (evt: any) => {
            const item = evt.item._cfg;
            const scene = quest.Scenes.find(
              (scene) => scene.id.toString() === item.id
            );
            if (scene) {
              setSceneId(scene?.id);
              Dispatch(setScene(scene));
            }
          });
        }}
      />
    );
  }

  return <h2>Load</h2>;
};

export default Map;
