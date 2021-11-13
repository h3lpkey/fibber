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

export default memo(({ data }: { data: TScene }) => {
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
      scene.ToScenes.forEach((localScene) => {
        if (localScene.TriggerSetter) {
          const sceneTriggers = localScene.TriggerSetter.split(" ");
          sceneTriggers.forEach((trig) => triggers.push(trig));
        }
      });
    });
    setAllTrigerGetter(triggers);
  }, []);

  const initialValues = {
    Notification: data.Notification,
    PersonPositionLeft: data.PersonPositionLeft,
    PersonName: data.PersonName,
    Text: data.Text,
    Background: data.Background ? data.Background.id : "",
    Person: data.Person ? data.Person.id : "",
    Music: data.Music ? data.Music.id : "",
    ToScenes: data.ToScenes.map((toScene) => {
      if (toScene.ToScene) {
        return {
          ToScene: toScene.ToScene.id,
          TriggerSetter: toScene.TriggerSetter,
          TriggerGetter: toScene.TriggerGetter
            ? toScene.TriggerGetter.split(" ")
            : [],
        };
      }
    }),
    Buttons: data.Buttons.map((button) => {
      return {
        Text: button.Text,
        Scene: button.Scene?.id,
        TriggerSetter: button.TriggerSetter,
        TriggerGetter: button.TriggerGetter
          ? button.TriggerGetter.split(" ")
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
      });
      changedValues.Buttons = allValues.Buttons;
    }
    // if (changedValues.ToScene) {
    //   allValues.ToScene.forEach((scene: any, index: number) => {
    //     // Backend store info like string, Frontend work with array of strings
    //     if (scene && Array.isArray(scene.TriggerGetter)) {
    //       allValues.ToScene[index].TriggerGetter =
    //         scene.TriggerGetter.join(" ");
    //     }
    //   });
    //   changedValues.ToScene = allValues.ToScene;
    // }
    API.scene.updateScene(scene.id, changedValues).then(() => {
      API.quest.getQuestById(quest.id).then((questData: TQuest) => {
        Dispatch(setQuest(questData));
        const updateScene = questData.Scenes.find(
          (newScene) => newScene.id.toString() === scene.id.toString()
        );
        Dispatch(setScene(updateScene));
        message.success(`Save success`);
      });
    });
  };

  return (
    <Form
      name="scene"
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
          allowClear
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
          allowClear
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
            if (
              file.mime === "image/png" ||
              file.mime === "image/jpeg" ||
              file.mime === "image/gif"
            ) {
              return (
                <Option id={file.id} value={file.id}>
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
      <Form.List name="ToScenes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div id={key.toString()}>
                To Scenes
                <Divider />
                <Space align="baseline" key={key} direction="horizontal">
                  <Form.Item
                    {...restField}
                    name={[name, "ToScene"]}
                    label="To Scene"
                  >
                    <Select style={{ width: 300 }} allowClear>
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

      <Form.List name="Buttons">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div id={key.toString()}>
                Buttons
                <Divider />
                <Space align="baseline" key={key} direction="horizontal">
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
      <Button
        onClick={() => {
          API.scene.deleteScene(data.id).then(() => {
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
});
