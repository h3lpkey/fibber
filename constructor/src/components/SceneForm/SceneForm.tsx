import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  Switch,
} from "antd";
import API from "api";
import { TQuest } from "models/quest";
import { Tbutton, TScene } from "models/scene";
import { StateMedia, StateQuests, StateScene } from "models/store";
import React, { memo, useEffect, useState } from "react";
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

  const initialValues = {
    ToSceneId: data.ToSceneId,
    Notification: data.Notification,
    PersonPositionLeft: data.PersonPositionLeft,
    PersonName: data.PersonName,
    Text: data.Text,
    Background: data.Background ? data.Background.id : "",
    Person: data.Person ? data.Person.id : "",
    Music: data.Music ? data.Music.id : "",
    Buttons: data.Buttons.map((button) => {
      return {
        Text: button.Text,
        Scene: button.Scene?.id,
        GlobalTriggerNameSetter: button.GlobalTriggerNameSetter,
        GlobalTriggerNameGetter: button.GlobalTriggerNameGetter
          ? button.GlobalTriggerNameGetter.split(" ")
          : "",
      };
    }),
  };

  const sceneModify = (changedValues: any, allValues: any) => {
    console.log("changedValues", changedValues);
    console.log("all", allValues);

    if (changedValues.Buttons) {
      changedValues.Buttons = allValues.Buttons;
    }
    API.scene.updateScene(scene.id, changedValues).then(() => {
      API.quest
        .getQuestById(quest.id)
        .then((questData: TQuest) => {
          Dispatch(setQuest(questData));
          const updateScene = questData.Scenes.find(
            (newScene) => newScene.id.toString() === scene.id.toString()
          );
          Dispatch(setScene(updateScene));
          message.success(`Save success`);
        })
        .catch((e) => {
          console.log(e);
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
                <Option id={file.id} value={file.id}>
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
      <Form.Item label="To Scene" name="ToSceneId">
        <Select allowClear>
          {quest.Scenes.map((scene) => {
            return <Option value={scene.id}>{scene.Text}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.List name="Buttons">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div id={key.toString()}>
                <Divider />
                <Space align="baseline" key={key} direction="horizontal">
                  <Form.Item
                    {...restField}
                    name={[name, "Text"]}
                    label="Text"
                    fieldKey={[fieldKey, "Text"]}
                  >
                    <Input placeholder="Text" />
                  </Form.Item>
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
