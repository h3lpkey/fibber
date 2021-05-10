import React, { useState } from "react"
import { Link } from "react-router-dom";
import VoiceOn from "../assets/icons/voice-on.svg"
import VoiceOff from "../assets/icons/voice-off.svg"
import More from "../assets/icons/dots.svg"

function Header() {
  const [volume, setVolume] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <header>
      <div className="header">
        <div className="buttons">
          <div
            className="button"
            onClick={() => {
              setVolume(!volume)
            }}
          >
            {volume ? (
              <img className="icon" src={VoiceOn} alt="voice control" />
            ) : (
              <img className="icon" src={VoiceOff} alt="voice control" />
            )}
          </div>
          <div
            className={`button ${menuVisible ? "button-active" : ""}`}
            onClick={() => {
              setMenuVisible(!menuVisible)
            }}
          >
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
  )
}

export default Header
