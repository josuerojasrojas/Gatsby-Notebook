const path = require(`path`)

const PUBLISH_PAGES = {
  // if no path is found then uses none
  mdPath: `${__dirname}/src/markdown`,
  sidebar: {
    mainTitle: "THE DOC",
    sidePages: [
      {
        title: "Some Title",
        pages: ["first.md", "second.md"],
      },
      {
        title:
          "A test md file umm this is also a long title for testing purposes of course. ",
        pages: ["test.md"],
      },
      {
        title: "Another Title",
        pages: ["third.md"],
      },
    ],
  },
}

exports.createPages = async ({ actions, graphql, reporter, ...other }) => {
  const { createPage } = actions

  const defaultTemplate = path.resolve(`src/templates/default/index.jsx`)

  const mdPath = PUBLISH_PAGES.mdPath || ""
  const sideBar = { ...PUBLISH_PAGES.sidebar }

  PUBLISH_PAGES.sidebar.sidePages.forEach(({ title, pages }, sidePageIndex) => {
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
  })
}
