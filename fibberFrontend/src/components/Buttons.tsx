import React, { ReactElement } from "react";

function Buttons({ buttons }: { buttons: any }): ReactElement {
  return (
    <div className="scene-buttons">
      {buttons.map((button: any) => (
        <button key={button.Text} className="scene-buttons_button">
          {button.Text}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
