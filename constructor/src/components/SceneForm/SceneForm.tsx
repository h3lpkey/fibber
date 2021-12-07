import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Switch,
} from "antd";
import API from "api";
import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateMedia, StateQuests, StateScene } from "models/store";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuest, setScene } from "store/actions";
import "./SceneForm.sass";

const SceneForm = () => {
  const Dispatch = useDispatch();
  const [form] = Form.useForm();
  const [allTrigerGetter, setAllTrigerGetter] = useState<string[]>([]);

  const { media } = useSelector((state: { media: StateMedia }) => state.media);
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);

  const { Option } = Select;

  useEffect(() => {
    const triggers: string[] = [];
    quest.Scenes.forEach((scene) => {
      scene.Buttons.forEach((button) => {
        if (button.TriggerSetter) {
          const btnTriggers = button.TriggerSetter.split(" ");
          btnTriggers.forEach((trig) => triggers.push(trig));
        }
      });
      scene.ToScenes?.forEach((localScene) => {
        if (localScene.TriggerSetter) {
          const sceneTriggers = localScene.TriggerSetter.split(" ");
          sceneTriggers.forEach((trig) => triggers.push(trig));
        }
      });
    });
    setAllTrigerGetter(triggers);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      Notification: scene.Notification,
      PersonPositionLeft: scene.PersonPositionLeft,
      PersonName: scene.PersonName,
      Text: scene.Text,
      Background: scene.Background ? scene.Background.id : "",
      Person: scene.Person ? scene.Person.id : "",
      Music: scene.Music ? scene.Music.id : "",
      ToScenes: scene.ToScenes?.map((toScene) => {
        if (toScene.ToScene) {
          return {
            ToScene: toScene.ToScene.id,
            TriggerSetter: toScene.TriggerSetter,
            TriggerGetter: toScene.TriggerGetter
              ? toScene.TriggerGetter.split(" ")
              : [],
            TriggerDelete: toScene.TriggerDelete
              ? toScene.TriggerDelete.split(" ")
              : [],
          };
        }
      }),
      Buttons: scene.Buttons.map((button) => {
        return {
          Text: button.Text,
          Scene: button.Scene?.id,
          TriggerSetter: button.TriggerSetter,
          TriggerGetter: button.TriggerGetter
            ? button.TriggerGetter.split(" ")
            : [],
          TriggerDelete: button.TriggerDelete
            ? button.TriggerDelete.split(" ")
            : [],
        };
      }),
    });
  }, [scene]);

  const initialValues = {
    Notification: scene.Notification,
    PersonPositionLeft: scene.PersonPositionLeft,
    PersonName: scene.PersonName,
    Text: scene.Text,
    Background: scene.Background ? scene.Background.id : "",
    Person: scene.Person ? scene.Person.id : "",
    Music: scene.Music ? scene.Music.id : "",
    ToScenes: scene.ToScenes?.map((toScene) => {
      if (toScene.ToScene) {
        return {
          ToScene: toScene.ToScene.id,
          TriggerSetter: toScene.TriggerSetter,
          TriggerGetter: toScene.TriggerGetter
            ? toScene.TriggerGetter.split(" ")
            : [],
          TriggerDelete: toScene.TriggerDelete
            ? toScene.TriggerDelete.split(" ")
            : [],
        };
      }
    }),
    Buttons: scene.Buttons.map((button) => {
      return {
        Text: button.Text,
        Scene: button.Scene?.id,
        TriggerSetter: button.TriggerSetter,
        TriggerGetter: button.TriggerGetter
          ? button.TriggerGetter.split(" ")
          : [],
        TriggerDelete: button.TriggerDelete
          ? button.TriggerDelete.split(" ")
          : [],
      };
    }),
  };

  const sceneModify = (changedValues: any, allValues: any) => {
    if (changedValues.Buttons) {
      allValues.Buttons.forEach((button: any, index: number) => {
        // Backend store info like string, Frontend work with array of strings
        if (button && Array.isArray(button.TriggerGetter)) {
          allValues.Buttons[index].TriggerGetter =
            button.TriggerGetter.join(" ");
        }
        if (button && Array.isArray(button.TriggerDelete)) {
          allValues.Buttons[index].TriggerDelete =
            button.TriggerDelete.join(" ");
        }
      });
      changedValues.Buttons = allValues.Buttons;
    }
    if (changedValues.ToScenes) {
      allValues.ToScenes.forEach((sceneLocal: any, index: number) => {
        // Backend store info like string, Frontend work with array of strings
        if (sceneLocal && Array.isArray(sceneLocal.TriggerGetter)) {
          allValues.ToScenes[index].TriggerGetter =
            sceneLocal.TriggerGetter.join(" ");
        }
        if (sceneLocal && Array.isArray(sceneLocal.TriggerDelete)) {
          allValues.ToScenes[index].TriggerDelete =
            sceneLocal.TriggerDelete.join(" ");
        }
      });
      changedValues.ToScenes = allValues.ToScenes;
    }

    API.scene.updateScene(scene.id, changedValues).then(() => {
      API.quest.getQuestById(quest.id).then((questData: TQuest) => {
        Dispatch(setQuest(questData));
        const updateScene = questData.Scenes.find(
          (newScene) => newScene.id.toString() === scene.id.toString()
        );
        Dispatch(setScene(updateScene));
      });
    });
  };

  return (
    <Form
      name="scene"
      className="scene-form"
      form={form}
      layout="vertical"
      onValuesChange={sceneModify}
      initialValues={initialValues}
    >
      <Form.Item>
        <Space>
          <Form.Item
            label="Person name"
            name="PersonName"
            style={{ margin: 0 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Person position left"
            name="PersonPositionLeft"
            valuePropName="checked"
            style={{ margin: 0 }}
          >
            <Switch />
          </Form.Item>
        </Space>
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
          <Option value={""}>Пусто</Option>
          {media.map((file) => {
            if (file.mime === "image/png" || file.mime === "image/jpeg") {
              return (
                <Option key={file.id} id={file.id} value={file.id}>
                  {file.name}
                </Option>
              );
            }
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Text" name="Text">
        <Input />
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
          <Option value={""}>Пусто</Option>
          {media.map((file) => {
            if (
              file.mime === "image/png" ||
              file.mime === "image/jpeg" ||
              file.mime === "image/gif"
            ) {
              return (
                <Option id={file.id} key={file.id} value={file.id}>
                  {file.name}
                </Option>
              );
            }
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Music" name="Music">
        <Select
          showSearch
          allowClear
          placeholder="Select music"
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
              return (
                <Option id={file.id} value={file.id}>
                  {file.name}
                </Option>
              );
            }
          })}
          <Option value="stopMusic">Stop music</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Notification" name="Notification">
        <Input />
      </Form.Item>
      <div className="toscene-block">
        <h3>ToScenes:</h3>

        <Form.List name="ToScenes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div id={key.toString()} className="toscene-block-item">
                  <Space align="baseline" key={key} direction="horizontal">
                    <Form.Item
                      {...restField}
                      name={[name, "ToScene"]}
                      label="To Scene"
                    >
                      <Select style={{ width: 150 }} allowClear>
                        {quest.Scenes.map((scene) => {
                          return (
                            <Option value={scene.id} key={scene.id}>
                              {scene.Text}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Space direction="vertical">
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerSetter"]}
                        label="Trigger Setter"
                        fieldKey={[fieldKey, "TriggerSetter"]}
                      >
                        <Input placeholder="TriggerSetter" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerGetter"]}
                        label="Trigger Getter"
                        fieldKey={[fieldKey, "TriggerGetter"]}
                      >
                        <Select mode="multiple" allowClear>
                          {allTrigerGetter.map((trigger) => {
                            if (trigger) {
                              return (
                                <Option value={trigger} key={trigger}>
                                  {trigger}
                                </Option>
                              );
                            }
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerDelete"]}
                        label="Trigger Delete"
                        fieldKey={[fieldKey, "TriggerDelete"]}
                      >
                        <Select mode="multiple" allowClear>
                          {allTrigerGetter.map((trigger) => {
                            if (trigger) {
                              return (
                                <Option value={trigger} key={trigger}>
                                  {trigger}
                                </Option>
                              );
                            }
                          })}
                        </Select>
                      </Form.Item>
                    </Space>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add to Scene
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <div className="tobutton-block">
        <h3>Buttons:</h3>
        <Form.List name="Buttons">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div id={key.toString()} className="tobutton-block-item">
                  <Space
                    align="baseline"
                    key={key}
                    direction="horizontal"
                    className="form-button-block"
                  >
                    <Space direction="vertical">
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
                        label="To Scene"
                      >
                        <Select allowClear>
                          {quest.Scenes.map((scene) => {
                            return (
                              <Option value={scene.id} key={scene.id}>
                                {scene.Text}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Space>
                    <Space direction="vertical">
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerSetter"]}
                        label="Trigger Setter"
                        fieldKey={[fieldKey, "TriggerSetter"]}
                      >
                        <Input placeholder="TriggerSetter" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerGetter"]}
                        label="Trigger Getter"
                        fieldKey={[fieldKey, "TriggerGetter"]}
                      >
                        <Select mode="multiple" allowClear>
                          {allTrigerGetter.map((trigger) => {
                            if (trigger) {
                              return (
                                <Option value={trigger} key={trigger}>
                                  {trigger}
                                </Option>
                              );
                            }
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "TriggerDelete"]}
                        label="Trigger Delete"
                        fieldKey={[fieldKey, "TriggerDelete"]}
                      >
                        <Select mode="multiple" allowClear>
                          {allTrigerGetter.map((trigger) => {
                            if (trigger) {
                              return (
                                <Option value={trigger} key={trigger}>
                                  {trigger}
                                </Option>
                              );
                            }
                          })}
                        </Select>
                      </Form.Item>
                    </Space>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                </div>
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
      </div>
      <Button
        onClick={() => {
          API.scene.deleteScene(scene.id).then(() => {
            API.quest.getQuestById(quest.id).then((data) => {
              Dispatch(setQuest(data));
            });
          });
        }}
      >
        Remove Scene
      </Button>
    </Form>
  );
};

export default SceneForm;
