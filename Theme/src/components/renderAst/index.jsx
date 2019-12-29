import React from "react"
import { H1, H2, H3, H4, H5, H6 } from "src/components/Headers"
import rehypeReact from "rehype-react"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  },
}).Compiler

export default renderAst
