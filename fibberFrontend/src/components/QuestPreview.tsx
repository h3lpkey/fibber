import * as React from "react"
import { Link } from "gatsby"

const QuestPreview: React.FC<any> = ({ quest }) => {
  return (
    <>
      <Link to={`/quest/${quest.id}/1`} className="quest-preview">
        <img
          className="quest-preview-image"
          src={`${quest.questImagePreview.publicURL}`}
          alt=""
        />
        <h3 className="quest-preview-title">{quest.questName}</h3>
        <p className="quest-preview-play">play</p>
      </Link>
    </>
  )
}

export default QuestPreview
