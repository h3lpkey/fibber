// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { Link } from "gatsby"
import SceneInterface from "../model/quest"
import "../assets/main.sass"

interface QuestProps {
  pageContext: {
    scene: SceneInterface
    questId: string
  }
}

const Quest: React.FC<QuestProps> = ({ pageContext }) => {
  const { questId, scene } = pageContext
  return (
    <div className="scene">
      <Link to="/">home</Link>
      <img
        className="scene-background"
        src={`${scene.background.childImageSharp.original.src}`}
        alt=""
      />
      <img
        className="scene-person"
        src={`${scene.person.childImageSharp.original.src}`}
        alt=""
      />
      <div className="scene-controls-box">
        <p className="scene-person-name">{scene.person_name}</p>
        <p className="scene-text">{scene.text}</p>
        <div className="scene-buttons">
          {scene.buttons.map(button => (
            <Link
              to={`/quest/${questId}/${button.link}`}
              key={button.text}
              className="scene-buttons_button"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quest