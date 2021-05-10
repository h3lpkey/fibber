import React, { ReactElement } from "react";

function Background({ background }: { background: any }): ReactElement {
  console.log("Background", background);
  return <img className="scene-background" src={`http://localhost:1337${background.url}`} alt="" />;
}

export default Background;
