import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.css"
import { Link } from "gatsby"
import classNames from "classnames"

const SidebarSection = ({ isActive, sectionLinks, title, toggleSection }) => {
  const [isCurrentView, setIsCurrentView] = useState(false)

  // probably should find another way to find if the link is the current one. but since the path is inside an object inside an array makes this more complicated.. i won't add a todo but something to think about
  useEffect(() => {
    let isThisView = false
    for (let { path } of sectionLinks) {
      if (window.location.pathname === path) {
        isThisView = path
        break
      }
    }
    setIsCurrentView(isThisView)
  }, [window.location.pathname, sectionLinks])

  return (
    <div
      className={classNames(styles.sidebarSection, {
        [styles.active]: isActive,
        [styles.isCurrentView]: isCurrentView,
      })}
    >
      <div className={styles.title} onClick={toggleSection}>
        <div className={styles.titleText}>{title}</div>
      </div>
      <div
        className={styles.links}
        style={{ height: isActive ? `${sectionLinks.length * 28}px` : "0px" }}
      >
        <ul>
          {sectionLinks.map(({ path, sideSubTitle }, i) => (
            <li
              className={classNames({
                [styles.activeLink]: path === isCurrentView,
              })}
              key={`sidebar-link-${i}`}
            >
              <Link to={path}>{sideSubTitle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

SidebarSection.propTypes = {
  isActive: PropTypes.bool,
  sectionLinks: PropTypes.array,
  title: PropTypes.string,
  toggleSection: PropTypes.func,
}

export default SidebarSection
