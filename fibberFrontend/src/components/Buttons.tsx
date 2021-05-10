import React, { ReactElement } from "react";

function Buttons({
  buttons,
  setSceneById
}: {
  buttons: any;
  setSceneById: (id: number) => void;
}): ReactElement {
  console.log("Buttons", buttons);
  return (
    <div className="scene-buttons">
      {buttons.map((button: any) => (
        <button
          key={button.Text}
          className="scene-buttons_button"
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
