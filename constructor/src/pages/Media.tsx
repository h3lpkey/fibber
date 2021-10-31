import {
  CustomerServiceOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Button, Card, Image, message, Space, Spin, Upload } from "antd";
import Meta from "antd/lib/card/Meta";
import Dragger from "antd/lib/upload/Dragger";
import API from "api/index";
import LayoutBase from "layouts/Base";
import { StateMedia } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderText, setMedia } from "store/actions";
import "./Media.sass";

const Media = (): ReactElement => {
  const Dispatch = useDispatch();
  const url = window.location.hostname;
  const { media, isLoading } = useSelector(
    (state: { media: StateMedia }) => state.media
  );

  const updateMedia = () => {
    API.media.getAllMedia().then((media) => {
      Dispatch(setMedia(media));
    });
  };

  useEffect(() => {
    Dispatch(setHeaderText("Ваши вложения"));
    updateMedia();
  }, []);

  const props = {
    name: "files",
    multiple: true,
    showUploadList: false,
    action: `http://${url}:1337/upload/`,
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        updateMedia();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (isLoading) {
    return (
      <LayoutBase>
        <div className="page page-media">
          <Space align="center">
            <Spin size="large" />
          </Space>
        </div>
      </LayoutBase>
    );
  }

  return (
    <LayoutBase>
      <div className="page page-media">
        <Dragger {...props} className="media-dnd">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <div className="media-gallery">
          {media.map((item) => {
            switch (item.mime) {
              case `image/jpeg`:
              case `image/png`:
              case `image/gif`:
                return (
                  <Card
                    style={{ width: 300 }}
                    cover={
                      <Image
                        className="media-item media-image"
                        src={`http://${url}:1337${item.url}`}
                      />
                    }
                    className="media-item"
                    actions={[
                      <DeleteOutlined
                        onClick={() => {
                          API.media.removeMediaById(item.id).then(() => {
                            updateMedia();
                          });
                        }}
                        key="setting"
                      />,
                    ]}
                  >
                    <Meta title={`${item.name}`} />
                  </Card>
                );
              case `audio/mpeg`:
                return (
                  <Card
                    style={{ width: 300 }}
                    className="media-item"
                    actions={[
                      <DeleteOutlined
                        onClick={() => {
                          API.media.removeMediaById(item.id).then(() => {
                            updateMedia();
                          });
                        }}
                        key="setting"
                      />,
                    ]}
                  >
                    <CustomerServiceOutlined />
                    <Meta title={`${item.name}`} />
                  </Card>
                );

              default:
                break;
            }
            return item.name;
          })}
        </div>
      </div>
    </LayoutBase>
  );
};

export default Media;
