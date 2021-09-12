import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
} from "antd";
import API from "api/index";
import dialogBackground from "assets/images/dialogBackground.svg";
import nameBubble from "assets/images/nameBubble.svg";
import { TQuest } from "models/quest";
import { Tbutton, TScene, TSceneStatus } from "models/scene";
import { StateMedia, StateQuests } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { setQuest, setScene } from "store/actions";
import "./Scene.sass";

const Scene = (): ReactElement => {
  const Dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [sceneStatus, setSceneStatus] = useState<TSceneStatus>("upgrade");
  const [isLoading, setLoading] = useState(true);
  const [allTrigerGetter, setAllTrigerGetter] = useState<string[]>([]);
  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();

  const { media } = useSelector((state: { media: StateMedia }) => state.media);
  const { quest, scene } = useSelector(
    (state: { quest: StateQuests }) => state.quest
  );

  console.log(`scene`, scene);

  useEffect(() => {
    setEditMode(false);
    const allTriger: string[] = [];
    quest.Scenes.forEach((scen) => {
      scen.Buttons.forEach((button) => {
        if (button.GlobalTriggerNameSetter) {
          allTriger.push(button.GlobalTriggerNameSetter);
        }
      });
    });
    setAllTrigerGetter(allTriger);
  }, [scene]);

  if (scene === undefined || scene.id === undefined) {
    return (
      <Space align="center">
        <Spin size="large" />
      </Space>
    );
  }

  const initialValues = {
    PersonName: scene.PersonName,
    SceneName: scene.SceneName,
    Text: scene.Text,
    Background: scene.Background ? scene.Background.id : "",
    Person: scene.Person ? scene.Person.id : "",
    Music: scene.Music ? scene.Music.id : "",
    Buttons: scene.Buttons.map((button) => {
      return {
        Text: button.Text,
        Scene: button.Scene.id,
        GlobalTriggerNameSetter: button.GlobalTriggerNameSetter,
        GlobalTriggerNameGetter: button.GlobalTriggerNameGetter,
      };
    }),
  };

  const ModeSwitcher = () => {
    return (
      <Space className="config-buttons">
        {editMode ? (
          <Button onClick={() => setEditMode(false)}>Preview</Button>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        <Button
          onClick={() => {
            setEditMode(true);
            setSceneStatus("new");
            form.setFieldsValue({
              PersonName: "",
              SceneName: `new scene`,
              Text: "",
              Background: "",
              Person: "",
              Music: "",
              Buttons: [],
            });
          }}
        >
          New scene
        </Button>
        <Button
          onClick={() => {
            setEditMode(true);
            setSceneStatus("new");
            form.setFieldsValue({
              PersonName: scene.PersonName,
              SceneName: scene.SceneName,
              Text: scene.Text,
              Background: scene.Background ? scene.Background.id : "",
              Person: scene.Person ? scene.Person.id : "",
              Music: scene.Music ? scene.Music.id : "",
              Buttons: scene.Buttons.map((button) => {
                return {
                  Text: button.Text,
                  Scene: button.Scene.id,
                  GlobalTriggerNameSetter: button.GlobalTriggerNameSetter,
                  GlobalTriggerNameGetter: button.GlobalTriggerNameGetter,
                };
              }),
            });
          }}
        >
          Copy scene
        </Button>
        <Button
          onClick={() => {
            API.scene.deleteScene(scene.id).then(() => {
              API.quest
                .getQuestById(quest.id)
                .then((questData: TQuest) => {
                  Dispatch(setQuest(questData));
                  message.success(`Remove success`);
                  setLoading(false);
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          }}
        >
          Remove Scene
        </Button>
      </Space>
    );
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setLoading(true);

    const buttons: Tbutton[] = [];

    values.Buttons.forEach((button: Tbutton) => {
      if (button.Scene) {
        buttons.push(button);
      }
    });

    const dataScene = {
      ...values,
      Buttons: buttons,
    };

    if (sceneStatus === "upgrade") {
      API.scene.updateScene(scene.id, dataScene).then(() => {
        setSceneStatus("upgrade");
        API.quest
          .getQuestById(quest.id)
          .then((questData: TQuest) => {
            Dispatch(setQuest(questData));
            const updateScene = questData.Scenes.find(
              (newScene) => newScene.id.toString() === scene.id.toString()
            );
            Dispatch(setScene(updateScene));
            message.success(`Save success`);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } else {
      API.scene.createScene(dataScene).then((data: TScene) => {
        const newQuestData = {
          ...quest,
          Scenes: [...quest.Scenes, data.id],
        };
        API.quest
          .updateQuest(quest.id, newQuestData)
          .then((questData: TQuest) => {
            Dispatch(setQuest(questData));
            const updateScene = questData.Scenes.find(
              (newScene) => newScene.id.toString() === scene.id.toString()
            );
            Dispatch(setScene(updateScene));
            message.success(`Save success`);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (editMode) {
    return (
      <div className="scene-form">
        <ModeSwitcher />
        <Form
          name="scene"
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item label="Scene name" name="SceneName">
            <Input />
          </Form.Item>
          <Form.Item label="Person name" name="PersonName">
            <Input />
          </Form.Item>
          <Form.Item label="Text" name="Text">
            <TextArea />
          </Form.Item>
          <Form.Item label="Background Image" name="Background">
            <Select
              showSearch
              placeholder="Select background"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA: any, optionB: any) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {media.map((file) => {
                if (file.mime === "image/png" || file.mime === "image/jpeg") {
                  return <Option value={file.id}>{file.name}</Option>;
                }
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Person Image" name="Person">
            <Select
              showSearch
              placeholder="Select background"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA: any, optionB: any) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {media.map((file) => {
                if (file.mime === "image/png" || file.mime === "image/jpeg") {
                  return <Option value={file.id}>{file.name}</Option>;
                }
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Music" name="Music">
            <Select
              showSearch
              placeholder="Select music"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA: any, optionB: any) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {media.map((file) => {
                if (file.mime === "audio/mpeg") {
                  return <Option value={file.id}>{file.name}</Option>;
                }
              })}
            </Select>
          </Form.Item>

          <Form.List name="Buttons">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <>
                    <Divider />
                    <Space align="baseline" key={key} direction="horizontal">
                      <Space direction="vertical" style={{ width: `400px` }}>
                        <Form.Item
                          {...restField}
                          name={[name, "Text"]}
                          label="Text"
                          fieldKey={[fieldKey, "Text"]}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Scene"]}
                          label="Scene name"
                          fieldKey={[fieldKey, "Scene"]}
                        >
                          <Select>
                            {quest.Scenes.map((scene) => {
                              return (
                                <Option value={scene.id}>
                                  {scene.SceneName}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Space>
                      <Space direction="vertical">
                        <Form.Item
                          {...restField}
                          name={[name, "GlobalTriggerNameSetter"]}
                          label="Trigger Setter"
                          fieldKey={[fieldKey, "GlobalTriggerNameSetter"]}
                        >
                          <Input placeholder="GlobalTriggerNameSetter" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "GlobalTriggerNameGetter"]}
                          label="Trigger Getter"
                          fieldKey={[fieldKey, "GlobalTriggerNameGetter"]}
                        >
                          <Select>
                            {allTrigerGetter.map((trigger) => {
                              return <Option value={trigger}>{trigger}</Option>;
                            })}
                          </Select>
                        </Form.Item>
                      </Space>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add button
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="scene">
        <ModeSwitcher />
        {scene.Background && (
          <div className="background">
            <img
              className="scene-background"
              src={`http://localhost:1337${scene.Background.url}`}
              alt="background"
            />
          </div>
        )}
        {scene.Person && (
          <div className="person">
            <img
              src={`http://localhost:1337${scene.Person.url}`}
              alt="person"
            />
          </div>
        )}
        <div className="controls-wrap">
          <p className="name name-right">
            {scene.PersonName}
            <span className="name-earth">_</span>
          </p>

          <div className="controls">
            <p className="dialog">{scene.Text}</p>
            <div className="buttons">
              {scene.Buttons.map((button: any) => (
                <button key={button.Text} className="button">
                  {button.Text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Scene;
