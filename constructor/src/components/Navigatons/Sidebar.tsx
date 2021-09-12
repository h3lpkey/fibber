import {
  CodeOutlined,
  DatabaseOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useHistory } from "react-router";

const Sidebar = (): JSX.Element => {
  const history = useHistory();
  return (
    <Menu mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item
        key="1"
        onClick={() => {
          history.push(`/quests`);
        }}
        icon={<PartitionOutlined />}
      >
        Конструктор
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          history.push(`/deploy`);
        }}
        icon={<CodeOutlined />}
      >
        Деплой
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          history.push(`/resourses`);
        }}
        icon={<DatabaseOutlined />}
      >
        Ресурсы
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
