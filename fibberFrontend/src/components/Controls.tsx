import React, { ReactElement } from "react";

function Controls({ children }: { children: ReactElement[] }): ReactElement {
  return <div className="scene-controls-box">{children}</div>;
}

export default Controls;
