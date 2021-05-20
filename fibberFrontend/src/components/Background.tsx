import React, { ReactElement } from "react";

function Background({ background }: { background: any }): ReactElement {
  const url = process.env.REACT_APP_BACKEND_URL;
  return <img className="scene-background" src={`${url}${background.url}`} alt="" />;
}

export default Background;
