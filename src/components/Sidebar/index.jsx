import React, { useState } from "react"
import SidebarSection from "./SidebarSection/"
import PropTypes from "prop-types"
import { Link, withPrefix } from "gatsby"
import classNames from "classnames"
import styles from "./styles.module.css"

const Sidebar = ({ className, closeCallback, isShown, links, title }) => {
  const [activeSection, setActiveSection] = useState(-1)

  const toggleActiveSection = index => {
    if (activeSection === index) return setActiveSection(-1)
    return setActiveSection(index)
  }

  return (
    <>
      <div
        className={classNames(className, styles.sidebar, {
          [styles.active]: isShown,
        })}
      >
        <div className={styles.content}>
          <div className={styles.title}>
            <Link to={withPrefix("")}>{title}</Link>
          </div>
          <div className={styles.links}>
            {links.map((linkData, i) => (
              <SidebarSection
                isActive={i === activeSection}
                key={`sidebarsection-${i}`}
                toggleSection={() => toggleActiveSection(i)}
                sectionLinks={linkData.pages}
                title={linkData.title}
              />
            ))}
          </div>
        </div>
      </div>
      {isShown && (
        <div className={styles.hiddenLayer} onClick={closeCallback}></div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  closeCallback: PropTypes.func,
  isShown: PropTypes.bool,
  links: PropTypes.array,
  title: PropTypes.string,
}

export default Sidebar
