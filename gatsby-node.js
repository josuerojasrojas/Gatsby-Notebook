const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter, ...other }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/default.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              sideTitle
              sideSubTitle
              isPublish
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const sideBar = {}

  result.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
    const { isPublish, sideSubTitle, sideTitle } = node.frontmatter

    if (isPublish) {
      const sideBarSingleData = { sideSubTitle }

      if (sideBar[sideTitle]) sideBar[sideTitle].push(sideBarSingleData)
      else sideBar[sideTitle] = [sideBarSingleData]

      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: { sideBar },
      })
    }
  })
}
