import React, { useState } from "react";
import { Link } from "react-router-dom";
import VoiceOn from "../assets/icons/voice-on.svg";
import VoiceOff from "../assets/icons/voice-off.svg";
import More from "../assets/icons/dots.svg";
import { useDispatch, useSelector } from "react-redux";
import { setVolumeMute } from "store/actions";

function Header() {
  const dispatch = useDispatch();
  const { volumeMute } = useSelector((state: { settings: any }) => state.settings);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <header>
      <div className="header">
        <div className="buttons">
          <div
            className="button"
            onClick={() => {
              dispatch(setVolumeMute(!volumeMute))
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
                <Link to="/">Выход</Link>
              </li>
              <li className="menu-item">Начать заново</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
