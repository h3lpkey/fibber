import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import QuestPreview from "../components/QuestPreview"
import Layout from "../components/layout"
const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <div className="quests-preview-list">
      <StaticQuery
        query={graphql`
          {
            allStrapiQuest {
              nodes {
                questName
                scene {
                  id
                }
                id
                questImagePreview {
                  publicURL
                }
              }
            }
          }
        `}
        render={data =>
          data.allStrapiQuest.nodes.map(quest => (
            <QuestPreview key={quest.id} quest={quest} />
          ))
        }
      />
    </div>
  </Layout>
)

export default IndexPage
