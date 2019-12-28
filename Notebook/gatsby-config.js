const packageJson = require("./package.json")

const PUBLISH_PAGES = {
  // if no path is found then uses none
  mdPath: `${__dirname}/markdown`,
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

module.exports = {
  plugins: [
    {
      resolve: `Theme`,
      options: {
        packageJson,
        pages: PUBLISH_PAGES,
        markdownSrc: "./markdown",
      },
    },
  ],
}
