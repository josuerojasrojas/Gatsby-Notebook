# gatsby-theme-apollo-clone

Inspired by [Apollo docs](https://www.apollographql.com/docs/apollo-server/). A personal theme notebook using Gatsby.

This is my attempt to use Gatsby to make a personal notebooks (for secrets and such). Yes I can use google docs or something else, but there is something about making your own that makes it sweeter to use. Plus it gives me a chance to learn about Gatsby and practice react hooks.

## Usage

In your project root

```bash
yarn add gatsby gatsby-theme-apollo-clone
```

Then create a file `gatsby-config.js` and follow the example

```javascript
// this is mainly needed for the homepage to be publish
const packageJson = require("./package.json")

const PUBLISH_PAGES = {
  // important to tell where all the markdown is located
  mdPath: `${__dirname}/markdown`,
  // sidebar configuration
  sidebar: {
    mainTitle: "THE DOC",
    // title is the main title in the sidebar
    // the subtitle and path is taken by the md frontmatter
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

// finally export
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-apollo-clone`,
      options: {
        packageJson,
        pages: PUBLISH_PAGES,
        markdownSrc: "./markdown",
      },
    },
  ],
}
```

To start add script to package.json

```json
{
  "scripts": {
    "develop": "gatsby develop"
  }
}
```

and on command line

```bash
yarn develop
```
