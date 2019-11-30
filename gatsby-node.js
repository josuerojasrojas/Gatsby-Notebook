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
    const sideBarSingleData = {
      sideSubTitle: node.frontmatter.sideSubTitle,
    }
    if (sideBar[node.frontmatter.sideTitle])
      sideBar[node.frontmatter.sideTitle].push(sideBarSingleData)
    else sideBar[node.frontmatter.sideTitle] = [sideBarSingleData]

    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: { sideBar },
    })
  })
}
