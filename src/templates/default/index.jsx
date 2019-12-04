import React, { useState } from "react"
import { graphql } from "gatsby"
import Sidebar from "src/components/Sidebar"
import styles from "./styles.module.css"

export default function Template({ data, pageContext }) {
  // TODO: setup for mobile view to trigger menu
  const [isSidebarShown, setIsSidebarShown] = useState(false)

  const { markdownRemark } = data
  const { html } = markdownRemark
  const { sideBar } = pageContext

  return (
    <div className={styles.container}>
      <Sidebar
        links={sideBar}
        isShown={isSidebarShown}
        title={"Sidebar Title"}
      />
      <div className={styles.mdContent}>
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
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
