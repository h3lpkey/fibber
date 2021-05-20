import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

function Buttons({
  buttons,
  setSceneById
}: {
  buttons: any;
  setSceneById: (id: number) => void;
}): ReactElement {
  const { Styles } = useSelector((state: { quest: any }) => state.quest.scene);
  const { Button } = useSelector((state: { quest: any }) => state.quest.defaultStyles);

  const buttonStyle = {
    color: "",
    backgroundColor: "",
    borderColor: ""
  };

  if (Styles) {
    buttonStyle.color = JSON.parse(Styles.Button.textColor).hex;
    buttonStyle.backgroundColor = JSON.parse(Styles.Button.backgroundColor).hex;
    buttonStyle.borderColor = JSON.parse(Styles.Button.borderColor).hex;
  } else {
    buttonStyle.color = JSON.parse(Button.textColor).hex;
    buttonStyle.backgroundColor = JSON.parse(Button.backgroundColor).hex;
    buttonStyle.borderColor = JSON.parse(Button.borderColor).hex;
  }

  return (
    <div className="scene-buttons">
      {buttons.map((button: any) => (
        <button
          key={button.Text}
          className="scene-buttons_button"
          style={buttonStyle}
          onClick={() => {
            setSceneById(button.Scene.id);
          }}>
          {button.Text}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
