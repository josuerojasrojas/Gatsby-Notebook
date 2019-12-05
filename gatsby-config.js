const packageJson = require("./package.json")

module.exports = {
  pathPrefix: `${packageJson.homepage}`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/templates/default/index.jsx`),
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-mdx`,
  ],
}
