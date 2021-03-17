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
          space {
            id
            sceneName
            text
            person_name
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
    console.log("quest", quest)
    quest.space.forEach(space => {
      console.log("SPACE", space)
      actions.createPage({
        path: `/${space.sceneName}`,
        component: require.resolve(`./src/pages/quest.tsx`),
        context: { space: space },
      })
    })
  })
}
