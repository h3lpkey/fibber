import React, { useState } from "react";
import More from "../assets/icons/dots.svg";
import VoiceOff from "../assets/icons/voice-off.svg";
import VoiceOn from "../assets/icons/voice-on.svg";

const Header = () => {
  const [volumeMute, setVolumeMute] = useState(false);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <header>
      <div className="header">
        <div className="buttons">
          <div
            className="button"
            onClick={() => {
              setVolumeMute(!volumeMute);
              // dispatch(setVolumeMute(!volumeMute))
            }}>
            {volumeMute ? (
              <img className="icon" src={VoiceOn} alt="voice control" />
            ) : (
              <img className="icon" src={VoiceOff} alt="voice control" />
            )}
          </div>
          <div
            className={`button ${menuVisible ? "button-active" : ""}`}
            onClick={() => {
              setMenuVisible(!menuVisible);
            }}>
            <img className="icon" src={More} alt="game control" />
            <ul className={`menu-list ${menuVisible ? "menu-show" : ""}`}>
              <li className="menu-item">
                <p>Выход</p>
              </li>
              <li className="menu-item">Начать заново</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
