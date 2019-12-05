import React, { useState } from "react"
import SidebarSection from "./SidebarSection/"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.css"

const Sidebar = ({ className, isShown, links, title }) => {
  const [activeSection, setActiveSection] = useState(-1)

  const toggleActiveSection = index => {
    if (activeSection === index) return setActiveSection(-1)
    return setActiveSection(index)
  }

  return (
    <div className={classNames(className, styles.sidebar)}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.links}>
          {Object.keys(links).map((sectionTitle, i) => (
            <SidebarSection
              isActive={i === activeSection}
              key={`sidebarsection-${i}`}
              toggleSection={() => toggleActiveSection(i)}
              sectionLinks={links[sectionTitle]}
              title={sectionTitle}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  isShown: PropTypes.bool,
  links: PropTypes.object,
  title: PropTypes.string,
}

export default Sidebar