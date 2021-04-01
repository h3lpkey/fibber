import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Logo from "../assets/images/logo.svg"

const IndexPage = ({ data }) => (
  <Layout>
    <div className="page page-home">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <h1 className="title">Время охуительных историй</h1>
      <p className="description">
        Гарри услышал ее удаляющиеся шаги, а затем до него донесся звук
        плюхнувшейся на плиту сковородки. Он перевернулся на спину и попытался
        вспомнить, что же ему снилось.
      </p>
      <button
        className="button-default button-default-big"
        onClick={() => {
          const link = `quest/${data.allStrapiQuest.nodes[0].id}/${data.allStrapiQuest.nodes[0].scene[0].id}`
          window.location.href = link
        }}
      >
        Начать игру
      </button>
      <button className="button-default">Начать заново</button>
      <button className="button-default">Выйти из игры</button>
    </div>
  </Layout>
)
export const query = graphql`
  {
    allStrapiQuest {
      nodes {
        questName
        scene {
          id
        }
        id
      }
    }
  }
`
export default IndexPage
