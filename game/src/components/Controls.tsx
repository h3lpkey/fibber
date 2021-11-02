import React, { ReactElement } from "react";

function Controls({ children }: { children: ReactElement[] }): ReactElement {
  const controlStyle = {
    color: "",
    backgroundColor: "",
    borderColor: ""
  };

  // if (Styles) {
  //   controlStyle.backgroundColor = JSON.parse(Styles.Button.backgroundColor).hex;
  //   controlStyle.borderColor = JSON.parse(Styles.Button.borderColor).hex;
  // } else {
  //   controlStyle.backgroundColor = JSON.parse(BackgroundColors.backgroundColor).hex;
  //   controlStyle.borderColor = JSON.parse(BackgroundColors.borderColor).hex;
  // }

  return (
    <div className="scene-controls-box" style={controlStyle}>
      {children}
    </div>
  );
}

export default Controls;
