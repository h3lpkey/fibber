/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiQuest {
        nodes {
          id
          scene {
            id
            sceneId
            text
            personName
            buttons {
              link
              text
            }
            background {
              childImageSharp {
                original {
                  src
                }
              }
            }
            person {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)
  data.allStrapiQuest.nodes.forEach(quest => {
    quest.scene.forEach(scene => {
      actions.createPage({
        path: `/quest/${quest.id}/${scene.sceneId}`,
        component: require.resolve(`./src/pages/quest.tsx`),
        context: { scene: scene, questId: quest.id },
      })
    })
  })
}
