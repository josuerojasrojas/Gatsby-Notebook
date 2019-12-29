import React, { useState } from "react"
import { graphql } from "gatsby"
import renderAst from "src/components/renderAst"
import Sidebar from "src/components/Sidebar"
import TopBar from "src/components/TopBar"
import styles from "./styles.module.css"

export default function Template({ data, pageContext, ...rest }) {
  const [isSidebarShown, setIsSidebarShown] = useState(false)

  const { markdownRemark } = data
  const { html, htmlAst } = markdownRemark
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
        {renderAst(htmlAst)}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`
