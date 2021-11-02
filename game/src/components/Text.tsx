import React, { ReactElement } from "react";

function Text({ text }: { text: string }): ReactElement {
  return <p className="scene-text">{text}</p>;
}

export default Text;
