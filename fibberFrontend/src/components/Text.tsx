import React, { ReactElement } from "react";

function Text({ text }: { text: any }): ReactElement {
  return <p className="scene-text">{text}</p>;
}

export default Text;
