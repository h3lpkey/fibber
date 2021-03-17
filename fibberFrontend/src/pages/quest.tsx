// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { Link } from "gatsby"
import SpaceInterface from "../model/quest"
import "../assets/main.sass"

interface QuestProps {
  pageContext: {
    space: SpaceInterface
  }
}

const Quest: React.FC<QuestProps> = ({ pageContext }) => {
  const space = pageContext.space
  return (
    <div className="space">
      <img
        className="space-background"
        src={`${space.background.childImageSharp.original.src}`}
        alt=""
      />
      <img
        className="space-person"
        src={`${space.person.childImageSharp.original.src}`}
        alt=""
      />
      <div className="space-controls-box">
        <p className="space-person-name">{space.person_name}</p>
        <p className="space-text">{space.text}</p>
        <div className="space-buttons">
          {space.buttons.map(button => (
            <Link
              to={`/${button.link}`}
              key={button.link}
              className="space-buttons_button"
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
