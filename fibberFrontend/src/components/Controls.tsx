import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

function Controls({ children }: { children: ReactElement[] }): ReactElement {
  const { Styles } = useSelector((state: { quest: any }) => state.quest.scene);
  const { BackgroundColors } = useSelector((state: { quest: any }) => state.quest.defaultStyles);

  const controlStyle = {
    color: "",
    backgroundColor: "",
    borderColor: ""
  };

  if (Styles) {
    controlStyle.backgroundColor = JSON.parse(Styles.Button.backgroundColor).hex;
    controlStyle.borderColor = JSON.parse(Styles.Button.borderColor).hex;
  } else {
    controlStyle.backgroundColor = JSON.parse(BackgroundColors.backgroundColor).hex;
    controlStyle.borderColor = JSON.parse(BackgroundColors.borderColor).hex;
  }

  return (
    <div className="scene-controls-box" style={controlStyle}>
      {children}
    </div>
  );
}

export default Controls;
