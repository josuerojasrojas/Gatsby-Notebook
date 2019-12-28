const path = require("path")

module.exports = themeOptions => {
  return {
    pathPrefix: `${themeOptions.packageJson.homepage}`,
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: themeOptions.markdownSrc,
          name: `markdown-pages`,
        },
      },
      {
        resolve: `gatsby-plugin-layout`,
        options: {
          component: require.resolve(`./src/templates/default/index.jsx`),
        },
      },
      {
        resolve: `gatsby-plugin-root-import`,
        options: {
          src: path.resolve(__dirname, "src"),
        },
      },
      `gatsby-transformer-remark`,
      `gatsby-plugin-mdx`,
    ],
  }
}
