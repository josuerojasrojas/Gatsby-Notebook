import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.css"
import classNames from "classnames"

// TODO: add constant file somewhere
const PLACEHOLDER = "Search"

// TODO: add github logo

const TopBar = ({ className, clickedMenu }) => {
  const [searchInput, setSearchInput] = useState("")

  return (
    <div className={classNames(className, styles.topBar)}>
      <div className={styles.menuButton} onClick={clickedMenu}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
      </div>
      <input
        className={styles.search}
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder={PLACEHOLDER}
      />
      <a
        className={styles.sourceText}
        href="https://github.com/josuerojasrojas/Gatsby-Notebook"
      >
        <div className={styles.gitlogo}></div>Source
      </a>
    </div>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  clickedMenu: PropTypes.func,
}

export default TopBar
