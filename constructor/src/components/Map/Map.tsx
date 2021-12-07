import { PlusSquareOutlined, ToolOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import API from "api/index";
import CSS from "csstype";
import dagre from "dagre";
import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateQuests, StateScene, StateUI } from "models/store";
import { ReactElement, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  ControlButton,
  Controls,
  Edge,
  isNode,
  MiniMap,
  Node,
  Position,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setMedia, setQuest, setScene, setUIShowTooltips } from "store/actions";
import CustomNode from "./CustomNode";

interface TMapNode {
  id: string;
  type?: "input" | "default" | "output" | "selectorNode" | undefined;
  draggable: boolean;
  data: {
    label: string | ReactElement;
    property?: TScene | {};
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

const elements = [
  {
    id: "1",
    type: "input", // input node
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output", // output node
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 400;
const nodeHeight = 200;

const Map = (): ReactElement => {
  let params: { questId: string } = useParams();
  const Dispatch = useDispatch();
  const [questMap, setQuestMap] = useState<any>(elements);
  const [isLoading, setLoading] = useState<boolean>(true);
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
      nodes.push({
        id: sceneObj.id.toString(),
        type: `selectorNode`,
        data: {
          label: firstWords,
          property: sceneObj,
        },
        draggable: false,
        position: {
          x: 180 / 2 + Math.random() / 1000,
          y: 40 / 2,
        },
      });

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

  const getLayoutedElements = (elements: any, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el: any) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el: Node<any> | Connection | Edge<any>) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? Position.Left : Position.Top;
        el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
  };

  const layoutedElements = getLayoutedElements(questMap);
  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setQuestMap(layoutedElements);
    },
    [elements]
  );

  const onClickNode = (event: any, element: any) => {
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
          nodeTypes={nodeTypes}
        >
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
          </Controls>
        </ReactFlow>
      </>
    );
  }

  return <h2>Load</h2>;
};

export default Map;
