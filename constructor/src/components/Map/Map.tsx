import { PlusSquareOutlined, ToolOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import API from "api/index";
import CSS from "csstype";
import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateQuests, StateScene, StateUI } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  MiniMap,
  useStoreState,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setMedia, setQuest, setScene, setUIShowTooltips } from "store/actions";
import CustomNode from "./CustomNode";

interface TMapNode {
  id: string;
  type?: "input" | "default" | "output" | "selectorNode" | undefined;
  draggable?: boolean;
  data: {
    label: string | ReactElement;
    property: TScene;
  };
  position: {
    x: number;
    y: number;
  };
}

interface TMapEdge {
  id: string;
  source: string;
  sourceHandle?: string;
  target: string;
  label?: string;
  type?: string;
  labelStyle?: CSS.Properties;
  animated?: boolean;
}

const Map = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [questMap, setQuestMap] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [lastElement, setLastElement] = useState<any>();
  const [sceneId, setSceneId] = useState<number>(0);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);
  const { ui } = useSelector((state: { ui: StateUI }) => state);
  const nodeTypes = {
    selectorNode: CustomNode,
  };

  const questDataToMap = (questData: TQuest) => {
    const nodes: TMapNode[] = [];
    const edges: TMapEdge[] = [];
    questData.Scenes.forEach((sceneObj) => {
      const text = sceneObj.Text;
      const firstWords = `${text.substring(0, 30)}`;
      const newNode: TMapNode = {
        id: sceneObj.id.toString(),
        type: `selectorNode`,
        data: {
          label: firstWords,
          property: sceneObj,
        },
        position: {
          x: sceneObj?.x,
          y: sceneObj?.y,
        },
      };
      nodes.push(newNode);

      if (sceneObj.ToScenes) {
        sceneObj.ToScenes.forEach((ToSceneLocal) => {
          if (ToSceneLocal.ToScene && ToSceneLocal.ToScene.id) {
            edges.push({
              id: `${sceneObj.id.toString()}-${ToSceneLocal.ToScene.id.toString()}-${Math.random()}`,
              source: `${sceneObj.id.toString()}`,
              target: `${ToSceneLocal.ToScene.id.toString()}`,
            });
          }
        });
      }

      sceneObj.Buttons.map((button, index) => {
        if (button.Scene && button.Scene.id) {
          edges.push({
            id: `${sceneObj.id.toString()}-${button.Scene.id.toString()}-${Math.random()}`,
            source: `${sceneObj.id.toString()}`,
            sourceHandle: `${index}`,
            target: button.Scene.id.toString(),
          });
        }
      });
    });
    const map = [...nodes, ...edges];
    return map;
  };

  useEffect(() => {
    if (quest.hasOwnProperty("Scenes")) {
      setLoading(true);
      setQuestMap(questDataToMap(quest));
      setLoading(false);
    }
  }, [scene, quest]);

  useEffect(() => {
    setLoading(true);
    if (params.questId) {
      API.quest
        .getQuestById(params.questId)
        .then((questData: TQuest) => {
          setQuestMap(questDataToMap(questData));
          setLoading(false);
        })
        .catch((e) => {});
    }
    API.media.getAllMedia().then((media) => {
      Dispatch(setMedia(media));
    });
  }, []);

  useEffect(() => {
    setQuestMap((els: any) =>
      els.map((el: any) => {
        if (el.id === scene.id.toString()) {
          el.style = {
            ...el.style,
            border: "3px solid #8b73fa",
          };
        } else {
          el.style = { ...el.style };
        }

        return el;
      })
    );
  }, [sceneId, setQuestMap, setSceneId, scene]);

  const onClickNode = (event: any, element: any) => {
    setLastElement(element);
    const scene = quest.Scenes.find(
      (scene) => scene.id.toString() === element.id
    );
    if (scene) {
      setSceneId(scene?.id);
      Dispatch(setScene(scene));
    }
  };

  const addNode = () => {
    API.scene
      .createScene({
        Text: "new scene",
        x: lastElement.position.x,
        y: lastElement.position.y + 250,
      })
      .then((newScene) => {
        const scenes = quest.Scenes.concat(newScene);
        API.quest.updateQuest(quest.id, {
          ...quest,
          Scenes: scenes,
        });
        const newQuest = {
          ...quest,
          Scenes: scenes,
        };
        Dispatch(setQuest(newQuest));
        setQuestMap(questDataToMap(newQuest));
      });
  };

  const updateNodePositionToScene = (event: any, node: TMapNode | any) => {
    const sceneId = node.data.property?.id;
    console.log(event);
    API.scene.updateScene(sceneId, {
      x: event.xx2,
      y: event.y,
    });
    // .then(() => updateQuest());
  };

  const NodesDebugger = () => {
    const nodes = useStoreState((state) => state.nodes);

    // console.log("nodes", nodes[nodes.length - 1]);

    return null;
  };

  const savePosition = () => {
    console.log(questMap);
  };

  const updateQuest = () => {
    API.quest
      .getQuestById(params.questId)
      .then((questData: TQuest) => {
        setQuestMap(questDataToMap(questData));
        setLoading(false);
      })
      .catch((e) => {});
  };

  const toggleTooltips = () => {
    Dispatch(setUIShowTooltips(!ui.showTooltips));
  };

  if (isLoading) {
    return (
      <Space align="center">
        <Spin size="large" />
      </Space>
    );
  }

  if (quest) {
    return (
      <>
        <ReactFlow
          elements={questMap}
          onElementClick={onClickNode}
          onNodeDragStop={updateNodePositionToScene}
          nodeTypes={nodeTypes}
        >
          <NodesDebugger />
          <MiniMap
            nodeColor={(node: any) => {
              switch (node.type) {
                case "input":
                  return "red";
                case "default":
                  return "#8b73fa";
                case "output":
                  return "rgb(0,0,255)";
                default:
                  return "#8b73fa";
              }
            }}
            nodeStrokeWidth={3}
          />
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="#c3b9f1"
          />
          <Controls>
            <ControlButton onClick={() => addNode()}>
              <PlusSquareOutlined />
            </ControlButton>
            <ControlButton onClick={() => toggleTooltips()}>
              <ToolOutlined />
            </ControlButton>
            <ControlButton onClick={() => savePosition()}>
              <ToolOutlined />
            </ControlButton>
          </Controls>
        </ReactFlow>
      </>
    );
  }

  return <h2>Load</h2>;
};

export default Map;
