const path = require(`path`)
// const defaultTemplate = require(`./src/templates/default/index.jsx`)

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions

  const defaultTemplate = path.resolve(
    __dirname,
    `src/templates/default/index.jsx`
  )

  const mdPath = themeOptions.pages.mdPath || ""
  const sideBar = { ...themeOptions.pages.sidebar }

  themeOptions.pages.sidebar.sidePages.forEach(
    ({ title, pages }, sidePageIndex) => {
      pages.forEach(async (src, singlePageIndex) => {
        const _src = path.resolve(mdPath, src)
        const result = await graphql(`
        {
        markdownRemark(fileAbsolutePath: {eq: "${_src}"}){
          html
          frontmatter {
            path
            sideSubTitle
          }
        }
      }`)

        if (result.errors) {
          reporter.panicOnBuild(`Error while running GraphQL query.`)
          return
        }

        const sideBarSingleData = { ...result.data.markdownRemark.frontmatter }
        sideBar.sidePages[sidePageIndex].pages[
          singlePageIndex
        ] = sideBarSingleData

        // TODO: Action createPage was called outside of its expected asynchronous lifecycle createPages in default-site-plugin.
        // Ensure that you return a Promise from createPages and are awaiting any asynchronous method invocations (like graphql or http requests).
        // For more info and debugging tips: see https://gatsby.dev/sync-action
        createPage({
          path: sideBarSingleData.path,
          component: defaultTemplate,
          context: { sideBar },
        })
      })
    }
  )
}
