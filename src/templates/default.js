import React from "react"
import { graphql } from "gatsby"

export default function Template({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  // TODO: pageContext.sideBar to be used for sidebar component
  console.log("context", pageContext)

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`
