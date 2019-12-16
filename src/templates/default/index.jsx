import React, { useState } from "react"
import { graphql } from "gatsby"
import Sidebar from "src/components/Sidebar"
import TopBar from "src/components/TopBar"
import styles from "./styles.module.css"

export default function Template({ data, pageContext }) {
  // TODO: setup for mobile view to trigger menu
  const [isSidebarShown, setIsSidebarShown] = useState(false)

  const { markdownRemark } = data
  const { html } = markdownRemark
  const { sideBar } = pageContext
  const { mainTitle, sidePages } = sideBar

  return (
    <div className={styles.container}>
      <Sidebar
        closeCallback={() => setIsSidebarShown(false)}
        links={sidePages}
        isShown={isSidebarShown}
        title={mainTitle}
      />
      <div className={styles.mdContent}>
        <TopBar clickedMenu={() => setIsSidebarShown(true)} />
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
